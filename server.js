import express from 'express'
import mongoose from 'mongoose'
import bodyparser from 'body-parser'
import cors from 'cors'
import passport from 'passport'

import budgetRoutes from './api/routes/budgetRoutes'
import userRoutes from './api/routes/userRoutes'
import {loginStrategy, jwtAuthStrategy} from './api/config/passportConfig'

let app = express()
let port = process.env.PORT || 8085

// Mongoose instance connection url connection
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/mpm-db?retryWrites=true')

passport.use('login', loginStrategy)
passport.use(jwtAuthStrategy)

app.use(bodyparser.json())
app.use(cors())
app.use(passport.initialize())

// Apply routes
app.use("/budgets", passport.authenticate("jwt", { session: false }), budgetRoutes)
app.use("/users", userRoutes)

app.listen(port)
console.log('budget RESTful API server started on: ' + port)