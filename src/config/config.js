import dotenv from 'dotenv'
import { Command } from 'commander'

// const program = new Command()

// program 
//   .option('-d', 'Variable para debug', false)
//   .option('-p <port>', 'Puerto del servidor', 8080)
//   .option('--mode <mode>', 'Modo de trabajo', 'develop')
// program.parse()

// console.log('Mode Options: ', program.opts().mode())

// const enviroment = program.opts().mode()

// dotenv.config({
//   path:enviroment==='production'?'./src/config.env.production':'./src/config/env.development'
// })

dotenv.config()

export default {
  port: process.env.PORT,
  db: process.env.MONGO_URL,
  adminEmail: process.env.ADMIN_EMAIL,
  adminPassword: process.env.ADMIN_PASSWORD,
  privateKey: process.env.PRIVATE_KEY,
  githubClientId: process.env.GITHUB_CLIENT_ID,
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
  githubCallbackUrl: process.env.GITHUB_CALLBACK_URL,
  gmailAccount: process.env.GMAIL_ACCOUNT,
  gmailAppPassword: process.env.GMAIL_APP_PASSWORD,
  // enviroment: enviroment
}