import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;
const snippetSchema: mongoose.Schema = new mongoose.Schema({
    title: {type: String},
    description: {type: String},
    code: {type: String},
    user: {type: ObjectId, required: true}
}, {
    timestamps: true
});

export const Snippet = mongoose.model('snippet', snippetSchema);