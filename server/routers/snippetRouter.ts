import express, {response, Router} from 'express';
import  {Snippet} from '../models/snippetModel';
import {Document} from "mongoose";

const router: Router = express.Router();
router.post('/', async (request, response) => {
    try {
        const { title, description, code } = request.body;              // deconstructing a body json object

        if (!description && !code) {
            return response.status(400).json({errorMessage: 'You need to enter at least a description or some code.'});
        }

        const newSnippet = new Snippet({
            title, description, code
        });

        const savedSnippet: Document = await newSnippet.save();

        response.json(savedSnippet);
    } catch(error) {
        response.status(500).send();
    }

});
module.exports = router;