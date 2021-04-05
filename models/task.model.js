import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

const taskSchema = mongoose.Schema({
    title: { type: String, require: true },
    brief: { type: String, default: '' },
    guidelines: { type: String, require: true },
    time: { type: Number, require: true },
    categoryTask: { type: Array, require: true },
    taskUsers: { type: Array, require: true },
    halfTimeReport: { type: Boolean, default: false},
    projectName: { type: String },
    projectId: { type: ObjectId },
})

const Task = mongoose.model("task", taskSchema);

export default Task;