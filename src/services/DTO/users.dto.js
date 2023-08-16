export default class userDTO {
  constructor(user) {
    this.name = `${user.first_name} ${user.last_name}`
    this.age = user.age
    this.email = user.email
    this.role = user.role
    this.cartId = user.cartId
    this.documents = user.documents
  }
}