import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {KittenService} from "../../../../services/kitten.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../../services/auth.service";
import {IUserView} from "../../../../models/user";
import {ChatServiceService} from "../../../../services/chat-service.service";

@Component({
  selector: 'app-kitten-retrieve',
  templateUrl: './kitten-retrieve.component.html',
  styleUrl: './kitten-retrieve.component.scss'
})
export class KittenRetrieveComponent implements OnInit {

  @Output() loginRequiredEvent = new EventEmitter()
  @Output() scrollChatEvent = new EventEmitter()


  user: IUserView = {
    id: 0,
    username: '',
    first_name: '',
    last_name: ''

  }

  Logged = false
  access = ''

  constructor(public kittenService: KittenService,
              public auth: AuthService,
              private router: Router,
              public chat: ChatServiceService) {
  }


  async ngOnInit(): Promise<void> {
    this.auth.access.subscribe(a => this.access = a)
    this.auth.user.subscribe(u => this.user = u)
    this.auth.isLogged.subscribe(async is => {
      this.Logged = is
      if (is == false){
        await this.router.navigate([`/kitten/${this.router.url.slice(8)}`])
      }
    })
    const url = this.router.url.slice(8)
    let id = parseInt(url)
    await this.kittenService.loadCurrentKitten(id)
  }


  async delete(){
    await this.auth.getAccess()
    if (await this.kittenService.deleteKitten(this.access)){
      await this.router.navigate(["/mycats"])
    }
    else{
      this.auth.logoutUser()
      this.auth.showLoginForm(true)
      await this.router.navigate([`/kitten/${this.kittenService.kitten.id}`])
    }
  }

}
