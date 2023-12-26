import {Injectable, Output} from '@angular/core';
import {webSocket} from "rxjs/webSocket";
import {BACKEND_URLS} from "../environments/environment";
import {IUserView} from "../models/user";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {IChat, IMessage} from "../models/chat";


@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  request_id = new Date().getTime()

  @Output() state: 'open' | 'close' = 'close'

  subject: any = webSocket(`${BACKEND_URLS.chat}`)

  constructor(private http: HttpClient) {
  }


  clear(){
      this.chat = {
      pk: 0,
      name: '',
      first_user: this.from,
      second_user: this.to,
      messages: this.messages,
      last_message: {
        user: {
          username: '',
          last_name: '',
          first_name: ''
        },
        text: ''
      }
    }

    this.access = ''
    this.messages = []
    this.from = {
      id: 0,
      username: '',
      first_name: '',
      last_name: ''
    }

    this.to = {
      id: 0,
      username: '',
      first_name: '',
      last_name: ''
    }
  }





  access = ''
  messages: IMessage[] = []
  @Output() from: IUserView = {
    id: 0,
    username: '',
    first_name: '',
    last_name: ''
  }

  @Output() to: IUserView = {
    id: 0,
    username: '',
    first_name: '',
    last_name: ''
  }

  @Output() chat: IChat = {
    pk: 0,
    name: '',
    first_user: {
      id: 0,
      username: '',
      first_name: '',
      last_name: ''
    },
    second_user: {
      id: 0,
      username: '',
      first_name: '',
      last_name: ''
    },
    messages: this.messages,
    last_message: {
      user: {
        username: '',
        last_name: '',
        first_name: ''
      },
      text: ''
    },
  }

  sendMessage(message: string){
     this.subject.next({
            message: message,
            action: "create_message",
            request_id: this.request_id
        });
  }


  async getRoom(){
    return new Promise<boolean>(
      (resolve) =>{
        const headers = new HttpHeaders()
          .set("Authorization", `Bearer ${this.access}`)
        this.http.get<IChat>(`${BACKEND_URLS.getRoom}${this.to.id}/`, {headers: headers}).subscribe({
          next: (v) => {
            this.chat = v
            this.messages = v.messages
            resolve(true)
          },
          error: (e) => {
            console.error(e)
            resolve(false)}
        })
      }
    )

  }

  leaveRoom(){
    this.clear()
    this.state = 'close'
    this.subject.unsubscribe()
  }


  private reinitWebsocket(){
    this.subject = webSocket(`${BACKEND_URLS.chat}?token=${this.access}`)
    this.subject.subscribe( (v: any) => {
      if (v.action == 'create'){
        this.chat.messages.push({
          user: v.data.user,
          text: v.data.text
        })
      }
      if (v.action == 'retrieve'){
          this.chat = v.data
      }
    })

    this.subject.next(
          {
            pk: this.chat.pk,
            action: "join_room",
            request_id: this.request_id}
            )
    this.subject.next(
        {
          pk: this.chat.pk,
          action: "retrieve",
          request_id: this.request_id,
        }
    )
    this.subject.next(
        {
          pk: this.chat.pk,
          action: "subscribe_to_messages_in_room",
          request_id: this.request_id,
        }
    );
    this.subject.next(
        {
          pk: this.chat.pk,
          action: "subscribe_instance",
          request_id: this.request_id,
        }
    );
  }


  async initialize(user_from: Observable<IUserView>, user_to: IUserView, access: Observable<string>) {
    this.state = 'open'
    user_from.subscribe(v => {
      if (v.id != 0){
        this.from = v
      }
      else {
        this.leaveRoom()
      }
    })

    access.subscribe(v => {
      if (v != '') {
        this.access = v.slice(7)
      }
      else{
        this.access = ''
        this.leaveRoom()
      }
    })

    if (user_to.id != 0){
      this.to = user_to
    }
    else{
      this.leaveRoom()
    }

    if (await this.getRoom() == false){
      this.leaveRoom()
    }

    this.reinitWebsocket()

  }
}
