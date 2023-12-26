import {Component, Inject, Input, OnInit, Output} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {IUserLogin, IUserRegister, IUserView} from "../../../models/user";

type State = 'register'| 'login' | 'loggedView' | 'unLoggedView'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  // @Output() error: string = ''
  n = ['asd', 2]

  Logged = false
  user: IUserView = {
    id: 0,
    username: '',
    first_name: '',
    last_name: ''
  }

  state: State = 'unLoggedView'

  constructor(public auth: AuthService) {
  }

  // getUser(){
  //   // console.log(this.auth.getUser())
  //   return this.auth.getUser()
  // }

  setState(state: State){
    this.state = state
  }

  getState(){
      return this.state
    }

  // userLogged(){
  //   return this.auth.userLogged()
  // }

  // viewState(){
  //
  // }

  // loggedIn(){
  //
  //   this.state = 'loggedView'
  //   this.auth.loggedIn()
  // }
  //
  // loggedOut(){
  //   this.state = 'unLoggedView'
  //   this.auth.loggedOut()
  // }

  logoutUser(){
    this.auth.logoutUser()
    this.state = 'unLoggedView'
  }

  async loginUser(user: IUserLogin){
    await this.auth.loginUser(user)
    if (this.Logged == true){
      this.state = 'loggedView'
    }
    else{
      this.state = 'unLoggedView'
    }
  }

  async registerUser(user: IUserRegister){
    const result = await this.auth.registerUser(user)
    if (result == true){
      this.state = 'login'
    }
  }

  async ngOnInit(): Promise<void> {
    await this.auth.initialize()
    this.auth.isLogged.subscribe(logged => this.Logged = logged)
    this.auth.user.subscribe(user => this.user = user)
    this.auth.loginRequired.subscribe(r => {
      if (r == true){
        if (this.state != 'login'){
          alert("Необходимо авторизироваться")
        }
        this.state = 'login'
      }
      else{
        if (this.Logged == false){
          this.state = 'unLoggedView'
        }
        else{
          this.state = 'loggedView'
        }
      }
    })

    if (this.Logged == true){
      this.state = 'loggedView'
    }
    else{
      this.state = 'unLoggedView'
    }
  }
}
