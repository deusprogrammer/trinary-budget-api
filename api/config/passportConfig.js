import localStrategy from 'passport-local/lib/strategy'
import jwtStrategy from 'passport-jwt/lib/strategy'
import extractJwt from 'passport-jwt/lib/extract_jwt'
import Users from '../models/user'

import authConfig from './authConfig'

export let loginStrategy = new localStrategy({
    usernameField: "username",
    passwordField: "password"
}, async (username, password, done) => {
    try {
        const user = await Users.findOne({username: username})

        if (!user) {
            return done(null, false, "User authentication failed")
        }

        const validate = user.isValidPassword(password)

        if (!validate) {
            return done(null, false, "User authentication failed")
        }

        return done(null, user, "User authentication successful")
    } catch (error) {
        done(error)
    }
})

export let jwtAuthStrategy = new jwtStrategy({
    secretOrKey: authConfig.key,
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken()
}, async (token, done) => {
    console.warn("TARGET: " + JSON.stringify(token));
    try {
        return done(null, token.user)
    } catch (error) {
        console.error(error);
        return done(error)
    }
})