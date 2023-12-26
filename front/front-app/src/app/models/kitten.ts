import {IBreed} from "./breed";
import {IWool} from "./wool_type";
import {IUserView} from "./user";

export interface IKitten {
  id: number
  name: string
  breed: IBreed
  birth_date: string
  wool_type: IWool
  info: string
  photo: string
  owner: IUserView
}
