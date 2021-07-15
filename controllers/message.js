import Message from "../models/message.model.js";


export const showAllMessages = async (req, res) => {
    try {
        // chcemy pobrac maile, które jako odbiorcę będą miały maila użytkownika
        // interesują nas maile konkretnego użytkownika
        const messages = await Message.find({ recipient: req.body.user_email});
        
        res.status(200).json({ messages });

    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}

export const createNewMessage = async (req, res) => {
    const { title, recipient, content, sender  } = req.body;
    console.log(req);
    
    try {
        if( !title || !recipient || !sender){
            return res.status(201).json({ message: "Not all required fields have been entered"})
        }

        if( title.length > 200) {
            return res.status(201).json({ message: "Title can't be longer than 200 characters"})
        }
        
        const newMessage = new Message({
            title, 
            recipient,
            content,
            sender,
            read: true,
        });

        const savedMessage = await newMessage.save();
        console.log(savedMessage);

        res.status(201).json({ savedMessage });
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}