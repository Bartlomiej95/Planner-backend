import User from '../models/user.model.js';
import bcrypt from 'bcrypt';

export const registerUser = async (req, res) => {
    try {
        const user = req.body;

        //validate

        if(!user.email || !user.name || !user.surname || !user.password || !user.replayPassword || !user.user_id){
            return res.status(400).json({ message: "Not all required fields have been entered"})
        }
        if( user.password.length < 5 || user.password.length > 41){
            return res.status(400).json({ message: "Password should have 5 - 40 digitals"})
        }
        if( user.name.length < 3 || user.name.length > 21){
            return res.status(400).json({ message: "Name should be longer than 2 letters and less than 20"})
        }
        if( user.surname.length < 3 || user.surname.length > 51){
            return res.status(400).json({ message: "Surname should be longer than 2 letters and less than 50"})
        }
        if( user.password !== user.replayPassword ){
            return res.status(400).json({ message: "Enter the same password twice for verification" })
        }

        const existingUser = await User.findOne({ email: user.email, user_id: user.user_id })

        if(existingUser){
            return res.status(400).json({ message: "An account with this email and id user already exists." })
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(user.password, salt);
        console.log(passwordHash);

        const newUser = new User({
            email: user.email,
            name: user.name,
            surname: user.surname,
            password: passwordHash,
            user_id: user.user_id,
            position: user.position,
            is_admin: user.is_admin,
            projects: user.projects,
            tasks: user.tasks,
        })
        const savedUser = await newUser.save();
        console.log(savedUser);

        res.json(savedUser);

    } catch (error) {
        res.status(409).json({ message: error.message})
    }
}

export const getUsers = async (req, res) =>{
    try{
        const users = await User.find();

        console.log(users);
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}