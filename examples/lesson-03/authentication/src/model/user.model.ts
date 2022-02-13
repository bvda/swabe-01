export interface User {
  name: FullName
  password: Crypto
  email: string
}

export interface FullName {
  first: string
  middle?: string
  last?: string
}

export interface Crypto {
  hash: string
  salt: string
}