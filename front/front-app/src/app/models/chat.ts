import {IUserView} from "./user";


export interface IMessage{
  user: {
    username: string,
    first_name: string,
    last_name: string
  },
  text: string
}


export interface IChat{
  pk: number,
  name: string,
  messages: IMessage[],
  first_user: IUserView,
  second_user: IUserView,
  last_message: IMessage

}
