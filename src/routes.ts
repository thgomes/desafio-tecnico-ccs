
import { Router } from 'express'
import SortedNumbersController from './controllers/sortedNumbersController'

const routes = Router()

routes.get('/', SortedNumbersController.index)

export default routes
