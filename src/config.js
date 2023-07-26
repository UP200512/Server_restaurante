import { config } from "dotenv"

config()
console.log (process.env.PORT)
export const PORT = process.env.PORT || 3001
export const SECRET= process.env.SECRET
export const DB_HOST = process.env.DB_HOST || 'localhost'
export const DB_PORT = process.env.DB_PORT || 3306
export const DB_DATABASE = process.env.DB_DATABASE 
export const DB_USER = process.env.DB_USER
export const DB_PASSWORD = process.env.DB_PASSWORD || ''