import crypto from 'crypto' 
import util from 'util'

export const SALT_LENGTH = 32
export const ITERATIONS = 1000000
export const DIGEST = 'sha512'

export const pbkdf2 = util.promisify(crypto.pbkdf2)
export const randomBytes = util.promisify(crypto.randomBytes)