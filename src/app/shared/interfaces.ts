export interface User {
  email: string
  password: string
  returnSecureToken?: boolean
}

export interface FirebaseAuthResponse {
  idToken: string
  expiresIn: string // время жизни токена который выдали\если дата исчерпала себя то удаляем сессию и требуем логин/3600-1hour
}

export class Post {
  id?: string
  title: string | any
  text: string | any
  author: string | any
  date: Date | any
}

export interface FbCreateResponse {
  name: string
}
