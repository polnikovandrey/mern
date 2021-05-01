import express, {response, Router} from 'express';
import  {Snippet} from '../models/snippetModel';
import {Document} from "mongoose";

const router: Router = express.Router();

router.get('/', async (request, response) => {
    try {
        const snippets = await Snippet.find();
        response.json(snippets);
    } catch (error) {
        response.status(500).send();
    }
});

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

router.put('/:id', async (request, response) => {
    try {
        const {title, description, code} = request.body;
        const snippetId = request.params.id;       // 608d76defd62c83f63313007
        if (!description && !code) {
            return response.status(400).json({errorMessage: 'You need to enter at least a description or some code.'});
        }
        if (!snippetId) {
            return response.status(400).json({errorMessage: 'Snippet id not provided.'})
        }
        const originalSnippet = await Snippet.findById(snippetId);
        if (!originalSnippet) {
            return response.status(400).json({errorMessage: `There is no snippet with id ${snippetId}`});
        }
        originalSnippet.title = title;
        originalSnippet.description = description;
        originalSnippet.code = code;
        const savedSnippet = await originalSnippet.save();
        response.json(savedSnippet);
    } catch(error) {
        response.status(500).send();
    }
});

// DELETE http://localhost:5000/snippet/608d76defd62c83f63313007
router.delete('/:id', async (request, response) => {
    try {
        const snippetId = request.params.id;       // 608d76defd62c83f63313007
        if (!snippetId) {
            return response.status(400).json({errorMessage: 'Snippet id not provided.'})
        }
        const existingSnippet = await Snippet.findById(snippetId);
        if (!existingSnippet) {
            return response.status(400).json({errorMessage: `There is no snippet with id ${snippetId}`});
        }
        await existingSnippet.deleteOne();
        response.json(existingSnippet);
    } catch(error) {
        response.status(500).send();
    }
});

module.exports = router;