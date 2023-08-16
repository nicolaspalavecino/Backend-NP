import ticketModel from './models/tickets.model.js'

export default class TicketService {

  getUserTickets = async (user) => {
    try {
      let tickets = await ticketModel.find({ purchaser: user }).lean()
      return tickets
    } catch (error) {
      return `An error has occurred by consulting user database. Error detail: ${error}`
    }
  }
}