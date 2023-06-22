const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const celebritySchema = new Schema(
    {name: {
        type: String,
        unique: true
    },}
)


