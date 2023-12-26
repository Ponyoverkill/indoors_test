import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {IKitten} from "../models/kitten";
import {AuthService} from "./auth.service";
import {HttpClient} from "@angular/common/http";
import {BACKEND_HOST, BACKEND_URLS} from "../environments/environment";
import {IUserView} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private auth: AuthService, private http: HttpClient) { }

  getList(): IKitten[]{
    let kittens_query: IKitten[]
    this.http.get<IKitten[]>(BACKEND_URLS.kittens).subscribe(kittens => {
      kittens_query = kittens
      for (let k of kittens_query){
        k.photo = `${BACKEND_HOST}${k.photo}`
      }
    })
    return kittens_query
  }


  getCurrentKitten(id: number): IKitten{
    let kitten: IKitten
    this.http.get<IKitten>(`${BACKEND_URLS.kittens}${id}/`).subscribe(k => {kitten = k})
    return kitten
  }

  getUser(id:number): IUserView{
    let user: IUserView
    this.http.get<IUserView>(`${BACKEND_URLS.user}${id}`).subscribe(u => {user = u})
    return user
  }

  // createKitten(kitten: IKitten){
  //   const user: IUser = this.auth.currentUser()
  //   return this.http.post<IKitten>()
  // }
}
