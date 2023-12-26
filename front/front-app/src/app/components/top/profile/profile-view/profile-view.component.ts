import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IUserView} from "../../../../models/user";

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrl: './profile-view.component.scss'
})
export class ProfileViewComponent {
  @Input() user: IUserView = {
    id: 0,
    username: '',
    first_name: '',
    last_name: ''
  }

  @Output() logoutEvent = new EventEmitter()

  logout(){
    // this.auth.logout()
    this.logoutEvent.emit()
  }
}
