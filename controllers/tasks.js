import Task from "../models/task.model.js";


export const createNewTask = async (req, res) => {
const { title, brief, guidelines, time, categoryTask, taskUsers, halfTimeReport, projectId, projectName } = req.body;
console.log(req)
try {
    if(!title || !guidelines || !time ){
        console.log(title);
        console.log(guidelines);
        console.log(time);
        return res.status(401).json({ message: "Not all required fields have been entered"}) 
    }
    
    if(title.length < 3 && title.length > 100) {
        return res.status(401).json({ message: "Title of task should be longer than 2 letters and less than 100"})
    }

    if(guidelines.length < 3 && guidelines.length > 500) {
        return res.status(401).json({ message: "Guidelines of task should be longer than 2 letters and less than 500"})
    }

    if(time < 0) {
        return res.status(401).json({ message: "Time of task should be positive value"})
    }

    if(categoryTask === []){
        return res.status(401).json({ message: "Please select a task category"})
    }

    if(taskUsers === []){
        return res.status(401).json({ message: "Please select somoone to this task"})
    }

    const newTask = new Task({
        title,
        brief,
        guidelines,
        time,
        categoryTask,
        taskUsers,
        halfTimeReport,
        projectId, 
        projectName,
    });

    const savedTask = await newTask.save();
    console.log('utworzono nowe zadanie');
    res.status(201).json(savedTask);

    } catch (error) {
        res.status(401).json({ message: error.message})
    }
}