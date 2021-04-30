import express from 'express';
import mongoose from 'mongoose';

// Setup express server
const app = express();
app.listen(5000, () => console.log('Server started on port 5000'));
app.get('/hello', (request, response) => {
    response.send('Hello!!!');
});