export interface IUserView{
  id: number
  username: string
  first_name: string
  last_name: string
}

export interface IUserLogin{
  username: string
  password: string
}

export interface IUserRegister{
  username: string
  password: string
  email: string
  first_name: string
  last_name: string
}


export interface IUserLoggedData{
  access: string
  refresh: string
}
