import dotenv from 'dotenv'
import { Command } from 'commander'

const program = new Command()

program 
  .option('-d', 'Debug variable', false)
  .option('-p, <port>', 'Port server', 8080)
  .option('--mode <mode>', 'Work mode', 'development')
program.parse()


console.log('Program options: ', program.opts())
console.log('Mode Option: ', program.opts().mode)

export const environment = program.opts().mode

dotenv.config({
  path : environment === "production" ? "./src/config/.env.production" : environment === "testing" ? "./src/config/.env.testing" : "./src/config/.env.development" 
})

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
  environment: environment
}