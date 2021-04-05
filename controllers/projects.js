import Project from '../models/project.model.js';
import Task from '../models/task.model.js';
import User from '../models/user.model.js';

export const createProject = async (req, res) => {
    const { name, customer, deadline, hours, projectValue, content, projectUsers, departments } = req.body;

    try {
        if(!name || !customer || !deadline || !hours || !projectValue){
            return res.status(401).json({ message: "Not all required fields have been entered"}) 
        }
        
        if( name.length < 3 && name.length > 200) {
            return res.status(401).json({ message: "Name of project should be longer than 2 letters and less than 200"})
        }
        
        if( content.length > 1000) {
            return res.status(401).json({ message: "Description should be shorter than 1000 characters"});
        }

        if( hours < 1 ) {
            return res.status(401).json({ message: "Project should take longer than 1 hour" })
        }

        if( projectValue < 0){
            return res.status(401).json({ message: "Estimated project value have to be positive" })
        }

        if( content.length < 0){
            return res.status(401).json({ message: "Please add a description of the project" })
        }

        if( projectUsers === []){
            return res.status(401).json({ message: "You have to choose someone to carry out the project" })
        }

        if( departments === []){
            return res.status(401).json({ message: "You have to choose departments responsbile for the project" })
        }

        const nowDate = new Date();
        const deadlineDate = new Date(deadline);
    
        if(deadlineDate.getTime() < nowDate.getTime()){
            return res.status(401).json({ message: "The deadline must be in the future" })
        }

        const searchedProject = await Project.findOne({ name: name});
        console.log(searchedProject);

        if (searchedProject) {
            return res.status(401).json({ message: "Project with this title already exist !"})
        }
        
        const newProject = new Project({
            name,
            customer,
            deadline,
            hours,
            projectValue,
            content,
            projectUsers,
            departments,

        });

        const savedProject = await newProject.save();
        
        console.log('utworzono projekt')
        res.status(201).json(savedProject);

        
    } catch (error) {
        res.status(404).json({ message: error.message});
    }

}
// homepage/user
export const fetchAllTasksAndProjectsForLoggedInUser = async (req, res) => {
    try{ 
        //pobieramy projekty wszystkie
        const projects = await Project.find();
        const tasks = await Task.find();
        const user = await User.find({ _id: req.user });
        const searchedId = user[0]._id;
        const amountAllProjects = projects.length;
        let projectsForLoggedUser = [];
        
        // musimy sprawdzic czy zmienna "projectUsers" zawiera id zalogowanego użytkownika
        for(let i = 0; i < amountAllProjects; i++){
            if(projects[i].projectUsers.includes(searchedId)){
                projectsForLoggedUser.push(projects[i]);
            }
        }
        
        res.status(200).json({ projectsForLoggedUser, user, projects, tasks });
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}

export const getDetailsProject = async (req, res) => {
    try {
        const name = req.params.name;
        console.log(name);
        const project = await Project.findOne({ name: name })
        console.log(project);
        res.status(200).json({ project });

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}