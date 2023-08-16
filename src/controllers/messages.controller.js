import MessageService from "../services/message.service.js"

const messageService = new MessageService()

export const sendMessage = async (req, res) => {
  try {
    let result = await messageService.sendMessage(req.params.email, req.params.message)
    res.status(202).send(result)
  } catch (error) {
    res.status(500).send({ status: 'Error', message: 'An error ocurred while trying to send message.', detail: error })
  }
}
