import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

const projectSchema = mongoose.Schema({
    name: { type: String, require: true },
    divisions: { type: String },
    description: { type: String},
    user: { type: ObjectId }
})

const Project = mongoose.model("project", projectSchema);

export default Project;