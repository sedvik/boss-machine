const express = require('express');
const ideasRouter = express.Router();
const checkMillionDollarIdea = require('./checkMillionDollarIdea');
const db = require('./db');

// Extract :ideaId param and attach to request body
ideasRouter.param('ideaId', (req, res, next, id) => {
    let ideaId = id;
    const idea = db.getFromDatabaseById('ideas', ideaId);
    if (idea) {
        req.idea = idea;
        req.ideaId = ideaId;
        next();
    } else {
        const err = new Error('This idea id was not identified in the database');
        err.status = 404;
        next(err);
    }
});

// GET /api/ideas - returns an array of all ideas
ideasRouter.get('/', (req, res, next) => {
    const ideasArray = db.getAllFromDatabase('ideas');
    res.send(ideasArray);
});

// POST /api/ideas - creates a new idea and saves it to the database
ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const ideaData = req.body;
    try {
        const idea = db.addToDatabase('ideas', ideaData);
        res.status(201).send(idea)
    } catch(err) {
        err.status = 400;
        next(err);
    }
});

// GET /api/ideas/:ideaId - returns a signle idea by id
ideasRouter.get('/:ideaId', (req, res, next) => {
    res.send(req.idea);
});

// PUT /api/ideas/:ideaId - update a single idea by id
ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res, next) => {
    const ideaData = req.body;
    try {
        const idea = db.updateInstanceInDatabase('ideas', ideaData);
        res.status(200).send(idea);
    } catch(err) {
        err.status = 400;
        next(err);
    }
});

// DELETE /api/ideas/:ideaId - deletes a single idea by id
ideasRouter.delete('/:ideaId', (req, res, next) => {
    db.deleteFromDatabasebyId('ideas', req.ideaId);
    res.status(204).send();
})

module.exports = ideasRouter;