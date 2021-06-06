import Mongoose from "mongoose";
import mongoose from "mongoose";

const userSchema = new Mongoose.Schema({
	email: {type: String, required: true},
	passwordHash: {type: String, required: true}
}, {
	timestamps: true
});

const User = Mongoose.model('user', userSchema);

module.exports = User;