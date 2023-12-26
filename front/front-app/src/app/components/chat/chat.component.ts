import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {IUserView} from "../../models/user";
import {ChatServiceService} from "../../services/chat-service.service";
import {BehaviorSubject, Observable} from "rxjs";


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit, AfterViewInit{

  @ViewChild('scrollMe') private myScrollContainer!: ElementRef

  scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch(err) {
        }
    }


  access = ''
  Logged = false

  user: IUserView = {
    id: 0 ,
    username: '',
    first_name: '',
    last_name: ''
  }

  constructor(public auth: AuthService,
              private router: Router,
              public chat: ChatServiceService) {
  }

  async ngOnInit(): Promise<void> {
    this.auth.access.subscribe(a => this.access = a)
    this.auth.user.subscribe(u => this.user = u)
    this.auth.isLogged.subscribe(async is => {
      this.Logged = is
      if (is == false){
        this.chat.leaveRoom()
      }
    })
  }

  ngAfterViewInit(): void {
    console.log("hereerere")
  }




}
