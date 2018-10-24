const mongoose = require('mongoose')


const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    handle: {
        type: String,
        required: true,
        max: 40
    },
    country: {
        type: String
    },
    location: {
        type: String
    },
    birthdate: {
        type: String
    },
    social: {
        twitter: {
            type: String
        },
        facebook: {
            type: String
        }
    },
    genre: {
        type: String
    },
    heigth: {
        type: Schema.Types.Decimal128
    },
    currentweigth: {
        type: Schema.Types.Decimal128
    },
    desiredweigth: {
        type: Schema.Types.Decimal128
    },
    activity: {
        type: String
    },
    workoutinweek: {
        type: Number
    },
    workouttime: {
        type: Number
    },
    goal: {
        type: String
    },
    qty: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
})

module.exports = Profile = mongoose.model("profile", ProfileSchema);
