const express = require('express');
const meetingsRouter = express.Router();
const db = require('./db');

// GET /api/meetings - get an array of all meetings
meetingsRouter.get('/', (req, res, next) => {
    const meetingsArray = db.getAllFromDatabase('meetings');
    res.send(meetingsArray);
});

// POST /api/meetings - create a new meeting and save it to the database
meetingsRouter.post('/', (req, res, next) => {
    let newMeeting = db.createMeeting();
    try {
        newMeeting = db.addToDatabase('meetings', newMeeting);
        res.status(201).send(newMeeting);
    } catch(err) {
        err.status = 400;
        next(err);
    }
})

// DELETE /api/meetings - delete all meetings from the database
meetingsRouter.delete('/', (req, res, next) => {
    db.deleteAllFromDatabase('meetings');
    res.status(204).send();
});

module.exports = meetingsRouter;