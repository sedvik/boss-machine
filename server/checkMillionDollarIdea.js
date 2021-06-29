const checkMillionDollarIdea = (req, res, next) => {
    const numWeeks = req.body.numWeeks;
    const weeklyRevenue = req.body.weeklyRevenue;
    // Check that valid input was received for numWeeks and weeklyRevenue
    if (numWeeks === '' || weeklyRevenue === '') {
        res.status(400).send("numWeeks and weeklyRevenue must be supplied");
    } else if (isNaN(numWeeks) || isNaN(weeklyRevenue)) {
        res.status(400).send("numWeeks and weeklyRevenue must be valid numbers")
    } else if ( (Number(numWeeks) * Number(weeklyRevenue)) < 1000000) {
        res.status(400).send("Product of numWeeks and weeklyRevenue properties must be greater or equal to 1 million")
    } else {
        next();
    }
};

module.exports = checkMillionDollarIdea;
