import MessageService from "../services/message.service.js"

const messageService = new MessageService()

export const sendMessage = async (req, res) => {
  let result = await messageService.sendMessage(req.params.email, req.params.message)
  res.status(202).send(result)
}