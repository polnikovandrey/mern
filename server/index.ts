import express from 'express';
import mongoose from 'mongoose';

// Setup express server
const app = express();
app.listen(5000, () => console.log('Server started on port 5000'));

// Note: the order of [use()] methods is significant.

// Run a function [express.json()] on any request (or a particular path if provided).
app.use(express.json());

// Setup routers
// use() method makes possible to separate and group different rest-services to a number of folders/files.
app.use('/snippet', require('./routers/snippetRouter'));

mongoose.connect('mongodb+srv://deepblue:3WINFZPNP410evdN@cluster0.j9utz.mongodb.net/mainDb?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true },
    error => {
        if (error) {
            console.error(error);
        } else {
            console.log('Connected to MongoDB');
        }
    });