import mongoose from 'mongoose';

const departmentSchema = mongoose.Schema({
    name: { type: String, require: true },
})

const Department = mongoose.model("department", departmentSchema);

export default Department;