import { generateProducts } from "../services/mock/products.mock.js"

export const generateMockProducts = (req, res) => {
  try {
    let mockProducts = generateProducts()
    res.status(201).json({ mockProducts })
  } catch (error) {
    res.status(500).json({ status: 'Error', message: 'An error ocurred while trying to execute mock products function', detail: error })
  }
}