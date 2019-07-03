import Users from '../models/user'
import passport from 'passport'
import jsonwebtoken from 'jsonwebtoken'

import authConfig from '../config/authConfig'

export default {
    getUsers: (req, res) => {
        Users.find({}, (error, results) => {
            if (error) {
                res.send(error)
            }

            res.json(results)
        })
    },
    getUser: (req, res) => {
        Users.findById(req.params.id, (error, result) => {
            if (error) {
                res.send(error)
            }

            res.json(result)
        })
    },
    createUser: (req, res) => {
        Users.create(req.body, (error, result) => {
            if (error) {
                res.send(error)
            }

            res.json(result)
        })
    },
    updateUser: (req, res) => {
        Users.findOneAndUpdate({_id: req.params.id}, req.body, (error, result) => {
            if (error) {
                res.send(error)
            }

            res.json(result)
        })
    },
    deleteUser: (req, res) => {
        Users.remove({_id: req.params.id}, (error, result) => {
            if (error) {
                res.send(error)
            }

            res.json(result)
        })
    },
    loginUser: (req, res, next) => {
        passport.authenticate('login', (error, user, info) => {
            if (error) {
                next(error)
            }

            const body = {_id: user._id, username: user.username}
            const token = jsonwebtoken.sign({user: body}, authConfig.key)

            res.json({
                token
            })
        })(req, res, next)
    }
}