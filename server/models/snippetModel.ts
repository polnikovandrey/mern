import mongoose from 'mongoose';

const snippetSchema: mongoose.Schema = new mongoose.Schema({
    title: {type: String},
    description: {type: String},
    code: {type: String}
}, {
    timestamps: true
});

export const Snippet = mongoose.model('snippet', snippetSchema);