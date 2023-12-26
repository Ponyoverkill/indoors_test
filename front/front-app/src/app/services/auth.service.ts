import {EventEmitter, Injectable, Output} from '@angular/core';
import {IUserView, IUserLogin, IUserRegister, IUserLoggedData} from "../models/user";
import {HttpClient} from "@angular/common/http";
import {BACKEND_URLS} from "../environments/environment";
import {CookieService} from "ngx-cookie-service";
import { BehaviorSubject} from "rxjs";
import {jwtDecode} from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSource = new BehaviorSubject({
        id: 0,
        username: '',
        first_name: '',
        last_name: ''
      })
  user = this.userSource.asObservable()

  private loginRequiredSource = new BehaviorSubject(false)
  loginRequired = this.loginRequiredSource.asObservable()

  showLoginForm(flag: boolean){
    if (flag == true){
    }
    this.loginRequiredSource.next(flag)
  }

  private accessSource = new BehaviorSubject('')
  access = this.accessSource.asObservable()

  private isLoggedSource = new BehaviorSubject(false)
  isLogged = this.isLoggedSource.asObservable()

  @Output() loginSuccessEvent = new EventEmitter()
  @Output() logoutSuccessEvent = new EventEmitter()


  session: IUserLoggedData = {
    access: '',
    refresh: ''
  }


  constructor(private http: HttpClient,
              private cookie: CookieService) {
  }

  async initialize(){
    const refresh = localStorage.getItem("refresh")
    const access = this.cookie.get("access")

    if ((refresh != '' && refresh != null && access == '') || (access != '' && refresh != '' && refresh != null)){
      this.session = {refresh: refresh, access: access}
      const token_valid = await this.verifyToken()
      if (token_valid == false){
        const refresh_valid = await this.refresh()
        if (refresh_valid == false){
          this.isLoggedSource.next(false)
        }
        else {
          this.isLoggedSource.next(true)
          this.getMe()
        }
      }
      else{
        this.accessSource.next(this.session.access)
        this.isLoggedSource.next(true)
        this.getMe()
      }
    }
    else{
      this.isLoggedSource.next(false)
    }
  }


  async getAccess(){
    if (await this.verifyToken()){
      this.accessSource.next(this.session.access)
    }
    else if (!await this.refresh()){
      this.logoutUser()
    }
  }

  verifyToken(): Promise<boolean>{
    // console.log(this.session.access)
    return new Promise<boolean>(
      (resolve) => {
        this.http.post(`${BACKEND_URLS.verify}`, {token: this.session.access.slice(7)})
          .subscribe({
            next: (v) => {
              resolve(true)},
            error: (e) => {
              if (e.status != 200){
                resolve(false)
              }
             }
            }
          )
      }
    )
  }

  registerUser(user: IUserRegister): Promise<boolean>{
    return new Promise(
      (resolve,)=>{
        this.http.post<any>(`${BACKEND_URLS.register}`, user)
          .subscribe({
        next: ()=>{
          resolve(true)
        },
        error: (e)=>{
          if (e.status != 201){
            alert("Неверный формат данных!")
            resolve(false)
          }
        }
      })
      }
    )
  }

  refresh(): Promise<boolean>{
    return new Promise<boolean>(
      (resolve, reject) => {
        this.http.post<{access: string}>(`${BACKEND_URLS.refresh}`, {refresh: this.session.refresh})
      .subscribe({
        next: (r)=>{
          r.access = `Bearer ${r.access}`
          this.accessSource.next(r.access)
          this.session.access = r.access
          this.cookie.set('access', r.access, {path: '/'})
          this.getMe()
          resolve(true)
        },
        error: (e)=>{if (e.status != 200){
          this.logoutUser()
          resolve(false)
        }}
      })
      }
    )

  }

  getMe(){
    const id = jwtDecode<{user_id: number}>(this.session.access.slice(7)).user_id
    this.http.get<IUserView>(`${BACKEND_URLS.user}${id}/`).subscribe({
      next: (v) => {
        this.userSource.next(v);
      }
    })
  }

  loginUser(user: IUserLogin){
    return new Promise(
      (resolve)=> {
        this.http.post<IUserLoggedData>(`${BACKEND_URLS.login}`, user)
          .subscribe({
        next: (r) => {
          r.access = `Bearer ${r.access}`
          this.session=r;
          this.accessSource.next(r.access)
          this.cookie.set('access', this.session.access, {path: '/'})
          localStorage.setItem("refresh", this.session.refresh)
          this.isLoggedSource.next(true)
          resolve(true)
          this.getMe()
        },
        error: (e) => {
          if (e.status != 200){
            this.logoutUser()
            resolve(false)
            alert("Неверное имя пользователя или пароль!")
          };
       }
      })
      }
    )
  }

  logoutUser(){
    this.userSource.next({
      id: 0,
      username: '',
      last_name: '',
      first_name: ''
    })
    this.session.refresh = ''
    this.session.access = ''
    this.accessSource.next('')
    this.cookie.delete('access', '/')
    localStorage.removeItem("refresh")
    this.isLoggedSource.next(false)
  }


}
