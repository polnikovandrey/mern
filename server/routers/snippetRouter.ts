import express, {response, Router} from 'express';
import  {Snippet} from '../models/snippetModel';

const router: Router = express.Router();
router.post('/', (request, response) => {
    const { title, description, code } = request.body;              // deconstructing a body json object
    const newSnippet = new Snippet({
        title, description, code
    });
    newSnippet.save();
});
module.exports = router;