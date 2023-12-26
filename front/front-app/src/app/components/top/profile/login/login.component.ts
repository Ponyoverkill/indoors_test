import {Component, EventEmitter, Output} from '@angular/core';
import {AuthService} from "../../../../services/auth.service";
import {IUserLogin} from "../../../../models/user";




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor() {
  }

  @Output() cancelEvent = new EventEmitter()
  @Output() loginEvent = new EventEmitter<IUserLogin>()

  login(username: string, password: string){
    this.loginEvent.emit({username: username, password: password})
  }

  cancel(){
    this.cancelEvent.emit()
  }
}
