import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {KittenService} from "../../../../services/kitten.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-kitten-list',
  templateUrl: './kitten-list.component.html',
  styleUrl: './kitten-list.component.scss'
})
export class KittenListComponent implements OnInit{

  Logged = true
  access = ''


  constructor(public kittenService: KittenService,
              public auth: AuthService,
              private router: Router) {
  }

  async ngOnInit(): Promise<void> {

    this.auth.access.subscribe(t => this.access = t)
    this.auth.isLogged.subscribe(async is => {
      this.Logged = is
      if (is == false && this.router.url == '/mycats'){
        this.auth.showLoginForm(true)
        await this.router.navigate(['/'])

      }
      if (is == true && this.router.url == '/mycats'){
        await this.auth.getAccess()
        await this.kittenService.loadMineKittens(this.access)
      }
      if (is == false && this.router.url == '/'){
        if (this.kittenService.kittens.length == 0){
          this.kittenService.loadAllKittens()
        }
      }
    })

    if (this.router.url == '/mycats'){
      if (this.Logged != true){
        this.auth.showLoginForm(true)
        await this.router.navigate(['/'])
      }
      else {
        await this.auth.getAccess()
        const res = await this.kittenService.loadMineKittens(this.access)
        if (res == false){
          this.auth.showLoginForm(true)
          await this.router.navigate(['/'])
        }
      }
    }
    else{
      this.kittenService.loadAllKittens()
    }

  }

}
