import {Component, EventEmitter, Output} from '@angular/core';
import {IUserRegister} from "../../../../models/user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  @Output() registerEvent = new EventEmitter<IUserRegister>()
  @Output() cancelEvent = new EventEmitter()

  register(username: string, password: string, email: string, first_name: string, last_name: string){
    this.registerEvent.emit({
      username: username,
      password: password,
      email: email,
      first_name: first_name,
      last_name: last_name
    })
  }
  cancel(){
    this.cancelEvent.emit()
  }
}
