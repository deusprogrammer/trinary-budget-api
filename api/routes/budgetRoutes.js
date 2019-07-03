import budgetController from '../controllers/budgetController'
import express from 'express'

var router = express.Router()

router.route('/')
    .get(budgetController.getBudgets)
    .post(budgetController.createBudget)

router.route('/:id')
    .get(budgetController.getBudget)
    .put(budgetController.updateBudget)
    .delete(budgetController.deleteBudget)

export default router