import dotenv from 'dotenv'

dotenv.config()

export default {
  port: process.env.PORT,
  db: process.env.MONGO_URL,
  adminEmail: process.env.ADMIN_EMAIL,
  adminPassword: process.env.ADMIN_PASSWORD,
  privateKey: process.env.PRIVATE_KEY,
  githubClientId: process.env.GITHUB_CLIENT_ID,
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
  githubCallbackUrl: process.env.GITHUB_CALLBACK_URL
}