const express = require('express');
const minionsRouter = express.Router();
const workRouter = require('./workRouter');
const db = require('./db');

// Extract :minionId parameter and attach to request body if valid

minionsRouter.param('minionId', (req, res, next, id) => {
    let minionId = id;
    const minion = db.getFromDatabaseById('minions', minionId);
    if (minion) {
        req.minion = minion;
        req.minionId = minionId;
        next();
    } else {
        const err = new Error('This minion id was not identified in the database');
        err.status = 404;
        next(err);
    }
});

// GET /api/minions - returns an array of minions
minionsRouter.get('/', (req, res, next) => {
    const minionsArray = db.getAllFromDatabase('minions');
    res.send(minionsArray);
});

// POST /api/minions - creates a new minion and saves it to the database
minionsRouter.post('/', (req, res, next) => {
    const minionData = req.body;
    try {
        const minion = db.addToDatabase('minions', minionData);
        res.status(201).send(minion)
    } catch(err) {
        err.status = 400;
        next(err);
    }
});

// GET /api/minions/:minionId - get a single minion by id.
minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion);
});

// PUT /api/minions/:minionId - updates a single minion by id.
minionsRouter.put('/:minionId', (req, res, next) => {
    const minionData = req.body;
    try {
        const minion = db.updateInstanceInDatabase('minions', minionData);
        res.status(200).send(minion);
    } catch(err) {
        err.status = 400;
        next(err);
    }
});

// DELETE /api/minions/:minionId - deletes a single minion by Id.
minionsRouter.delete('/:minionId', (req, res, next) => {
    const isDeleted = db.deleteFromDatabasebyId('minions', req.minionId);
    res.status(204).send();
});

// Mount work router at /api/minions/:minionId/work
minionsRouter.use('/:minionId/work', workRouter);

module.exports = minionsRouter;