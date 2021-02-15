import Project from '../models/project.model.js';
import User from '../models/user.model.js';

export const createProject = async (req, res) => {
    const { name, description, divisions } = req.body;

    try {
        if(!name || !description || !divisions){
            return res.status(401).json({ message: "Not all required fields have been entered"}) 
        }
        
        if( name.length < 3 && name.length > 200) {
            return res.status(401).json({ message: "Name of project should be longer than 2 letters and less than 200"})
        }
        
        if( description > 1000) {
            return res.status(401).json({ message: "Description should be shorter than 1000 characters"});
        }
        
        const newProject = new Project({
            name,
            description,
            divisions,
            user: req.user,
        });

        const savedProject = await newProject.save();
        
        
        res.status(201).json(savedProject);

        
    } catch (error) {
        res.status(404).json({ message: error.message});
    }

}
// homepage/user
export const getProjectsForLoggedInUser = async (req, res) => {
    try{
        console.log(req)
        const projects = await Project.find({ user: req.user });
        const user = await User.find({ _id: req.user })
        console.log(user);

        res.status(200).json({ projects, user } );
    } catch (error) {
        res.status(404).json({ message: error.message});
    }

}