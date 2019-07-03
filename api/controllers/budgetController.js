import Budgets from '../models/budget'

export default {
    getBudgets: (req, res) => {
        console.log("GET BUDGETS")
        Budgets.find({owner: req.user._id}, (error, results) => {
            if (error) {
                res.send(error)
                return
            }

            res.json(results)
        })
    },
    getBudget: (req, res) => {
        console.log("GET BUDGET " + req.params.id)
        Budgets.findById(req.params.id, (error, result) => {
            if (error) {
                res.send(error)
                return
            }

            console.log("OWNER: " + result.owner + " === " + JSON.stringify(req.user._id))

            if (result.owner !== req.user._id) {
                res.sendStatus(403)
                return
            }

            res.json(result)
        })
    },
    createBudget: (req, res) => {
        console.log("CREATE BUDGET FOR USER: " + req.user._id)
        req.body.owner = req.user._id
        Budgets.create(req.body, (error, result) => {
            if (error) {
                res.send(error)
                return
            }

            res.json(result)
        })
    },
    deleteBudget: (req, res) => {
        console.log("DELETE BUDGET")
        Budgets.remove({_id: req.params.id}, (error, result) => {
            if (error) {
                res.send(error)
                return
            }

            if (result.owner !== req.user._id) {
                res.sendStatus(403)
                return
            }

            res.json(result)
        })
    },
    updateBudget: (req, res) => {
        console.log("UPDATE BUDGET " + req.params.id)
        Budgets.find({_id: req.params.id}, req.body, {new: true}, (error, result) => {
            if (error) {
                res.send(error)
                return
            }

            if (result.owner !== req.user._id) {
                res.sendStatus(403)
                return
            }

            result.save((error, saved) => {
                if (error) {
                    res.send(error)
                    return
                }

                res.json(saved)
            })
        })
    }
}