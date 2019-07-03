import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

let userSchema = mongoose.Schema({
    username: {
        type: String,
        required: "Username is required"
    },
    password: {
        type: String,
        required: "Password is required"
    }
})

userSchema.pre('save', async function(next) {
    this.password = await bcrypt.hash(this.password, 10)
    console.log(JSON.stringify(this))
    next()
})

userSchema.methods.isValidPassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.toJSON = function() {
    var obj = this.toObject()
    delete obj.password
    return obj
}

export default mongoose.model('user', userSchema)