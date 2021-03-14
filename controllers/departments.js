import Department from '../models/department.model.js';


//homepage/project/create

export const getDepartments = async (req, res) => {
    try {
        const department = await Department.find();
       return res.status(200).json(department);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}