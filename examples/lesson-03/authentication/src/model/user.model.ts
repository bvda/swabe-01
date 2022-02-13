export interface User {
  name: Name
  password: Password
  email: string
}

export interface Name {
  first: string
  middle?: string
  last?: string
}

export interface Password {
  hash: string
  salt: string
}