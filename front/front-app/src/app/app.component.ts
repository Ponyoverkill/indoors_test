import {Component, OnInit} from '@angular/core';
// import { KittenService } from "./services/kitten.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{
  title = 'front-app';
  // constructor(private kittenService: KittenService) {
  // }

  // ngOnInit() {
  // }

  // ngOnInit(): void {
  //   this.kittenService.getAll().subscribe(kittens => {console.log(kittens)})
  // }
}
