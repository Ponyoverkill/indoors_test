import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IKitten} from "../../../../../models/kitten";


@Component({
  selector: 'app-kitten',
  templateUrl: './kitten.component.html',
  styleUrl: './kitten.component.scss'
})
export class KittenComponent {

  @Output() retrieveEvent = new EventEmitter<IKitten>()

  retrieve(kitty: IKitten){
    this.retrieveEvent.emit(kitty)
  }

  constructor() {
  }

  @Input() kitten: IKitten = {
    id: 0,
    name: '',
    breed: {id: 0, name: ''},
    birth_date: '',
    wool_type: {id: 0, name: ''},
    info: '',
    photo: '',
    owner: {id: 0, username: '', last_name: '', first_name: ''},
  }

}
