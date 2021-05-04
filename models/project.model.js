import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

const projectSchema = mongoose.Schema({
    name: { type: String, require: true },
    customer: { type: String, require: true},
    deadline: { type: Date, require: true },
    hours: { type: Number, require: true },
    projectValue: { type: Number, require: true },
    content: { type: String },
    projectUsers: { type: Array },
    departments: { type: Array },
    assumptions: { type: String },
    scopeOfWork: { type: String, require: true },
    customerInfo: { type: String },
})

const Project = mongoose.model("project", projectSchema);

export default Project;