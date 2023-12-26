import {Injectable, Output} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {IKitten} from "../models/kitten";

import {BACKEND_HOST, BACKEND_URLS} from "../environments/environment";
import {IBreed} from "../models/breed";
import {IWool} from "../models/wool_type";
import {IUserView} from "../models/user";


@Injectable({
  providedIn: 'root',
})
export class KittenService {
  @Output() kittens: IKitten[] = []
  @Output() kitten: IKitten = {
    id: 0,
    name: '',
    breed: {id:0,name:''},
    birth_date: '',
    wool_type: {id:0, name: ''},
    info: '',
    photo: '',
    owner: {id:0, username: '', last_name: '', first_name:''}
  }

  state: 'list' | 'retrieve' | 'listMine' = 'list'

  constructor(private http: HttpClient) {
  }

  @Output() breeds: IBreed[] = []
  @Output() wools: IWool[] = []


  async deleteKitten(access: string | boolean){
    if (access == false){
      alert("Отказанно в доступе")
      return new Promise<boolean>(
        resolve => {resolve(false)}
      )
    }
    else{
      return new Promise<boolean>(
      (resolve, reject) => {
        const headers = new HttpHeaders()
          .set("Authorization", `${access}`)
        this.http.delete(`${BACKEND_URLS.kittens}${this.kitten.id}/`, {headers: headers}).subscribe({
          next: (v) => {
            resolve(true)},
          error: (e) => {if (e.status != 204){
            alert("Отказанно в доступе")
            resolve(false)
          }}
        })
      }
    )
    }

  }


  async createKitten(access: string | boolean, data: FormData){
    if (access == false){
      return new Promise<boolean>(
        resolve => {resolve(false)}
      )
    }
    else{
      return new Promise<boolean | number>(
      (resolve, reject) => {
        const headers = new HttpHeaders()
          .set("Authorization", `${access}`)
        this.http.post<IKitten>(`${BACKEND_URLS.kittens}`, data,{headers: headers}).subscribe({
          next: (v) => {
            resolve(v.id)},
          error: (e) => {
            console.error(e)
            if (e.status == 400){
              alert("Неверные данные")
              resolve(false)
            }
            else if (e.status == 403){
              resolve(false)
          }
            else if (e.status != 201){
              alert("Непредвиденная ошибка")
              resolve(false)
            }
          }
        })
      }
    )
    }

  }


  async updateKitten(access: string | boolean, data: FormData){
    if (access == false){
      return new Promise<boolean>(
        resolve => {resolve(false)}
      )
    }
    else{
      return new Promise<boolean>(
      (resolve, reject) => {
        const headers = new HttpHeaders()
          .set("Authorization", `${access}`)
        this.http.put<{
          id: number
          name: string
          breed: number | null
          birth_date: string
          wool_type: number | null
          info: string
          photo: string
          owner: number
      }>(`${BACKEND_URLS.kittens}${this.kitten.id}/`, data,{headers: headers}).subscribe({
          next: async (v) => {
            await this.loadCurrentKitten(v.id)
            resolve(true)},
          error: (e) => {
            console.error(e)
            if (e.status == 400){
              alert("Неверные данные")
              resolve(false)
            }
            else if (e.status == 403){
              resolve(false)
          }
            else if (e.status != 200){
              alert("Непредвиденная ошибка")
              resolve(false)
            }
          }
        })
      }
    )
    }

  }


  isMine(user_id: number): boolean{
    if (this.kitten.owner.id == user_id){
      return true
    }
    return false
  }


  async loadCurrentKitten(id: number){
    return new Promise(
      (resolve)=>{
          this.http.get<{
        id: number
        name: string
        breed: number | null
        birth_date: string
        wool_type: number | null
        info: string
        photo: string
        owner: number
      }>(`${BACKEND_URLS.kittens}${id}/`).subscribe({
        next: async (v) => {
          v.photo = `http://${BACKEND_HOST}${v.photo}`
          let breed: IBreed = {id: 0, name: ''}
          if (v.breed != null){
            breed = await this.getBreed(v.breed)
          }

          let wool: IWool = {id: 0, name: ''}
          if (v.wool_type != null){
            wool = await this.getWool(v.wool_type)
          }

          this.kitten.id = v.id
          this.kitten.name = v.name
          this.kitten.breed = breed
          this.kitten.birth_date = v.birth_date
          this.kitten.wool_type = wool
          this.kitten.info = v.info
          this.kitten.photo = v.photo
          this.kitten.owner = await this.getUser(v.owner)
          resolve(this.kitten)
        },
        error: (e) => {
          console.error(e)
        }
      })
      }
    )

  }

  loadAllKittens() {
    this.http.get<{
      id: number
      name: string
      breed: number | null
      birth_date: string
      wool_type: number | null
      info: string
      photo: string
      owner: number
    }[]>(`${BACKEND_URLS.kittens}`).subscribe({
      next: async (v) => {
        let kittens: IKitten[] = []
        for (let k of v) {
          k.photo = `http://${BACKEND_HOST}${k.photo}`
          let breed: IBreed = {id: 0, name: ''}
          if (k.breed != null){
            breed = await this.getBreed(k.breed)
          }

          let wool: IWool = {id: 0, name: ''}
          if (k.wool_type != null){
            wool = await this.getWool(k.wool_type)
          }

          kittens.push({
            id: k.id,
            name: k.name,
            breed: breed,
            birth_date: k.birth_date,
            wool_type: wool,
            info: k.info,
            photo: k.photo,
            owner: await this.getUser(k.owner)
          })
        }
        this.kittens = kittens
      },
      error: (e) => {
        console.error(e)
      }
    })
  }

  async loadMineKittens(access: string | boolean) {
    if (access == false){
      return false
    }
    const headers = new HttpHeaders()
      .set("Authorization", `${access}`)
    this.http.get<{
      id: number
      name: string
      breed: number | null
      birth_date: string
      wool_type: number | null
      info: string
      photo: string
      owner: number
    }[]>(`${BACKEND_URLS.myKittens}`, {headers: headers}).subscribe({
      next: async (v) => {
        let kittens = []
        for (let k of v) {
          k.photo = `http://${BACKEND_HOST}${k.photo}`
          let breed: IBreed = {id: 0, name: ''}
          if (k.breed != null){
            breed = await this.getBreed(k.breed)
          }

          let wool: IWool = {id: 0, name: ''}
          if (k.wool_type != null){
            wool = await this.getWool(k.wool_type)
          }

          kittens.push({
            id: k.id,
            name: k.name,
            breed: breed,
            birth_date: k.birth_date,
            wool_type: wool,
            info: k.info,
            photo: k.photo,
            owner: await this.getUser(k.owner)
          })
        }
        this.kittens = kittens
      },
      error: (e) => {
        console.error(e)
      }
    })
    return true
  }


  getBreed(id: number | null): Promise<IBreed>{
    return new Promise<IBreed>(
      (resolve, reject) => {
        this.http.get<IBreed>(`${BACKEND_URLS.breeds}${id}/`).subscribe({
          next: (v) => {
            resolve(v)
          },
          error: (e) => {
            console.error(e);
            resolve({id: 0, name: 'not found'})
          }
    })
      }
    )

  }

  getWools(): Promise<IWool[]>{
    return new Promise<IWool[]>(
      (resolve, reject) => {
        this.http.get<IWool[]>(`${BACKEND_URLS.wools}`).subscribe({
          next: (v) => {
            this.wools = v
            resolve(v)
          },
          error: (e) => {
            console.error(e)
            resolve([{id: 0, name: "not-found"}])
          }
        })
      }
    )
   }


   getBreeds(): Promise<IBreed[]>{
    return new Promise<IBreed[]>(
      (resolve, reject) => {
        this.http.get<IBreed[]>(`${BACKEND_URLS.breeds}`).subscribe({
          next: (v) => {
            this.breeds = v
            resolve(v)
          },
          error: (e) => {
            console.error(e)
            resolve([{id: 0, name: "not-found"}])
          }
        })
      }
    )
   }

   getWool(id: number | null): Promise<IWool> {
    return new Promise<IWool>(
      (resolve, reject) => {
        this.http.get<IWool>(`${BACKEND_URLS.wools}${id}/`).subscribe({
          next: (v) => {
            resolve(v)
          },
          error: (e) => {
            console.error(e);
            resolve({id: 0, name: "not-found"})
      }
     })
      }
    )

  }

  getUser(id: number): Promise<IUserView>{
    return new Promise<IUserView>(
      (resolve, reject) =>{
        this.http.get<IUserView>(`${BACKEND_URLS.user}${id}/`)
          .subscribe({
        next: (v) => {
          resolve(v)
        },
        error: (e) =>{
          console.error(e)
          resolve({id:0, username: 'NotFound', first_name: '', last_name: ''})
        }
      })
      }
    )
  }
}
