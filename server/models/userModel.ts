import Mongoose from "mongoose";

const userSchema = new Mongoose.Schema({
	email: {type: String, required: true},
	passwordHash: {type: String, required: true}
}, {
	timestamps: true
});

export const User = Mongoose.model('user', userSchema);