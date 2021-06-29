const express = require('express');
const workRouter = express.Router({mergeParams: true});
const db = require('./db');


// Extract :workId parameter for use in various routes
workRouter.param('workId', (req, res, next, id) => {
    const workId = id;
    const work = db.getFromDatabaseById('work', id);
    if (work) {
        req.work = work;
        req.workId = workId;
        next();
    } else {
        const err = new Error('This work id was not identified in the database');
        err.status = 404;
        next(err);
    }
});

// GET /api/minions/:minionId/work - Get an array of all work for the specified minion
workRouter.get('/', (req, res, next) => {
    const allMinionWork = db.getWorkByMinionId(req.minionId);
    res.status(200).send(allMinionWork);
});

// POST /api/minions/:minionId/work - Create new work object and save it to database
workRouter.post('/', (req, res, next) => {
    const workData = req.body;
    try {
        const work = db.addToDatabase('work', workData);
        res.status(201).send(work);
    } catch(err) {
        err.status = 400;
        next(err);
    }
});

// PUT /api/minions/:minionId/work/:workId - Update a single work object by Id
workRouter.put('/:workId', (req, res, next) => {
    const workData = req.body;
    try {
        const work = db.updateInstanceInDatabase('work', workData);
        res.status(200).send(work);
    } catch(err) {
        err.status = 400;
        next(err);
    }
});

// DELETE /api/minions/:minionId/work/:workId - Delete a single work object by Id
workRouter.delete('/:workId', (req, res, next) => {
    db.deleteFromDatabasebyId('work', req.workId);
    res.status(204).send();
});

module.exports = workRouter;