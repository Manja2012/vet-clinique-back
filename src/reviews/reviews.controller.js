const Reviews = require('./review.model.js')

const getRewiews = async(rec, res) => {
    const result = await Reviews.find();
    res.json(result);
}

module.exports = getRewiews