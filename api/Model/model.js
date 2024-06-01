const mongoose = require('mongoose');

// Define the schema for a to-do list item
const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
});

// Create a model from the schema
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
