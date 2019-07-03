import mongoose from 'mongoose'

let budgetSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: "Owner is required"
    },
    name: {
        type: String,
        required: "Name is required"
    },
    bills: [
        {
            name: {
                type: String,
                required: "Bill name is required"
            },
            amount: {
                type: Number,
                required: "Amount is required"
            },
            payoff: {
                type: Number
            },
            dayOfMonth: {
                type: Number,
                required: "Day of month is required"
            }
        }
    ],
    payDays: [
        {
            name: {
                type: String,
                required: "Pay day source name is required"
            },
            examplePayDay: {
                type: Date,
                required: "Example pay day is required"
            },
            amount: {
                type: Number,
                required: "Pay day amount is required"
            }
        }
    ] 
})

export default mongoose.model('budget', budgetSchema)