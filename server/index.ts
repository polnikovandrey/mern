import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Setup express server
const app = express();
app.listen(5000, () => console.log('Server started on port 5000'));

// Note: the order of [use()] methods is significant.

// Run a function [express.json()] on any request (or a particular path if provided).
app.use(express.json());

// Setup routers
// use() method makes possible to separate and group different rest-services to a number of folders/files.
app.use('/snippet', require('./routers/snippetRouter'));

mongoose.connect(process.env.MDB_CONNECT_STRING || '',
    { useNewUrlParser: true, useUnifiedTopology: true },
    error => {
        if (error) {
            console.error(error);
        } else {
            console.log('Connected to MongoDB');
        }
    });