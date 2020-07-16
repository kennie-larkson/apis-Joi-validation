function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).max(20).required()
    };

    return Joi.validate(genre, schema);
}


module.exports = {
    validateGenre
};