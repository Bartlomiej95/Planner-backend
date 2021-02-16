import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    try {
        const user = req.body;
        
        //validate

        if( user.password.length < 5 || user.password.length > 41){
            return res.status(401).json({ message: "Password should have 5 - 40 digitals"})
        }
        if( user.name.length < 3 || user.name.length > 21){
            return res.status(401).json({ message: "Name should be longer than 2 letters and less than 20"})
        }
        if( user.surname.length < 3 || user.surname.length > 51){
            return res.status(401).json({ message: "Surname should be longer than 2 letters and less than 50"})
        }
        if( user.password !== user.replayPassword ){
            console.log(user.password);
            console.log(user.replayPassword);
            return res.status(401).json({ message: "Enter the same password twice for verification" })
        }
        if( !user.email || !user.name || !user.surname || !user.password  || !user.replayPassword || !user.user_id){
            return res.status(401).json({ message: "Not all required fields have been entered"})
        }

        const existingUser = await User.findOne({ email: user.email, user_id: user.user_id })

        if(existingUser){
            return res.status(408).json({ message: "An account with this email and id user already exists." })
        }

        const passwordHash = await bcrypt.hash(user.password, 12);
    
        const newUser = new User({
            email: user.email,
            name: user.name,
            surname: user.surname,
            password: passwordHash,
            user_id: user.user_id,
            position: 'pracownik',
            is_admin: user.is_admin,
            projects: user.projects,
            tasks: user.tasks,
        })
        const savedUser = await newUser.save();

        //create a JWT token

        const token = jwt.sign({
            id: savedUser._id
        }, process.env.JWT_SECRET);

        res.cookie("token", token, { 
            httpOnly: true, 
            sameSite: process.env.NODE_ENV === "development" ? "lax" : process.env.NODE_ENV === "production"  && "none", 
            secure: process.env.NODE_ENV === "development" ? false : process.env.NODE_ENV === "production"  && true 
        }).send();

        res.status(201).json(savedUser);

    } catch (error) {
        res.status(409).json({ message: error.message})
    }
}

export const getUser = async (req, res) =>{
    try{
        console.log('jestem w getUser')
        const user = await User.find({ user: req.user });

        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}

// metoda post, wysyłasz kredki
export const loginUsers = async (req, res) => {
    
    try {
        const { email, user_id, password } = req.body;
      
        if( !email || !password){
            return res.status(401).json({ message: "Not all required fields have been entered" })
        }

        const searchExistingUser = await User.findOne({ email });

        if(!searchExistingUser){
            return res.status(401).json({ message: "User doesn't exist"});
        }

        const passwordCorrect = await bcrypt.compare(
            password,
            searchExistingUser.password
        )

        if(!passwordCorrect){
            return res.status(401).json({ message: "Invalid credentials"})
        }

        const token = jwt.sign({
            id: searchExistingUser._id,
            searchExistingUser
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === "development"
            ? "lax" : process.env.NODE_ENV === "production" && "none",
            secure: process.env.NODE_ENV === "development"
            ? false: process.env.NODE_ENV === "production" && true,
        }).send(searchExistingUser);

        console.log(token);
        console.log(searchExistingUser);


    } catch (error) {
        res.status(500).send({ message: error.message})
    }
}

export const logoutUsers = (req, res) => {
    try {
        res.cookie("token", "", {
            httpOnly: true,
            expires: new Date(0),
        })
        .send();
    } catch (error) {
        return res.json(null)
    }
}

export const fetchAllUsers = async (req, res) => {
    try{
        const users = await User.find();
        
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}