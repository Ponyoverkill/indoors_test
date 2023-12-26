import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "../../../../services/auth.service";
import {KittenService} from "../../../../services/kitten.service";
import {Router} from "@angular/router";
import {IUserView} from "../../../../models/user";


@Component({
  selector: 'app-kitten-form',
  templateUrl: './kitten-form.component.html',
  styleUrl: './kitten-form.component.scss'
})
export class KittenFormComponent implements OnInit {

  @Output() loginRequiredEvent = new EventEmitter()

  Logged = false
  access = ''
  user: IUserView = {
    id: 0,
    username: '',
    first_name: '',
    last_name: ''
  }

  formData = new FormData()

  @Output() state: 'create' | 'edit' = 'create'


  constructor(public auth: AuthService,
              public kittenService: KittenService,
              public router: Router) {
  }

  async ngOnInit(): Promise<void> {
    this.auth.access.subscribe(a => this.access = a)
    this.auth.user.subscribe(u => this.user = u)
    this.auth.isLogged.subscribe(async is => {
      this.Logged = is
      if (is == false){
        if (this.router.url == '/create'){
          await this.router.navigate(['/'])
        }
        else if (this.router.url.slice(6) != '0'){
          await this.router.navigate([`/kitten/${this.router.url.slice(6)}`])
        }
      }
    })

    await this.kittenService.getWools()
    await this.kittenService.getBreeds()

    if (this.Logged == false){
      this.auth.showLoginForm(true)
      await this.router.navigate(['/'])
    }

    if (this.Logged == true){
      const url = this.router.url
      if (this.router.url == '/create'){
        this.state = 'create'
      }
      else{
        this.state = 'edit'
        let id = parseInt(url.slice(6))
        await this.kittenService.loadCurrentKitten(id)
        if (!this.kittenService.isMine(this.user.id)){
          await this.router.navigate([`/kitten/${this.kittenService.kitten.id}`])
        }
      }
    }

  }

  uploadFile(event: any) {
    const file: File = event.target.files ? event.target.files[0] : null;
    this.formData.append('photo', file)
  }

  parseDate(date: string){
    let dates = date.split('/')
    console.log(dates)
    let y = dates[2]
    let d = dates[1]
    let m = dates[0]
    while (y.length < 4){
      y = '0'+ y
    }
    if (m.length == 1){
      m = '0'+ m
    }
    if (d.length == 1){
      d = '0' + d
    }
    return `${y}-${m}-${d}`
  }

  async onSubmit(name: string, info: string, birth_date: string, breed: string, wool_type: string) {
    await this.auth.getAccess()
    if (birth_date != ''){
      birth_date = this.parseDate(birth_date)
    }
    if (this.state == 'create'){
      this.formData.append('name', name)
      this.formData.append('info', info)
      this.formData.append('birth_date', birth_date)
      this.formData.append('breed', breed)
      this.formData.append('wool_type', wool_type)
      let resp = await this.kittenService.createKitten(this.access, this.formData)
      if (typeof resp === "number" ){
        await this.router.navigate([`/kitten/${resp}`])
      }
      else{
        await this.router.navigate(['/create'])
      }
    }
    else{
      if (name != '') this.formData.append('name', name)
      if (info != '') this.formData.append('info', info)
      if (birth_date != '') this.formData.append('birth_date', birth_date)
      if (breed != '') this.formData.append('breed', breed)
      if (wool_type != '') this.formData.append('wool_type', wool_type)
      let resp = await this.kittenService.updateKitten(this.access, this.formData)
      if (resp == true){
        await this.router.navigate([`/mycats/${this.kittenService.kitten.id}`])
      }
      else{
        if (this.Logged == true){
          await this.router.navigate([`/edit/${this.kittenService.kitten.id}`])
        }
        else{
          await this.router.navigate([`/kitten/${this.kittenService.kitten.id}`])
        }
      }
    }
  }

}
