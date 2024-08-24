import dotenv from "dotenv"

dotenv.config()

export default {
    baseUrl: process.env.BASE_URL || 'http://localhost',
    port: process.env.PORT || 3000,
    environment: process.env.NODE_ENV || 'development',
    development: process.env.NODE_ENV === 'development',
    production: process.env.NODE_ENV === 'production'
}