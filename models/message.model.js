import mongoose from 'mongoose';

const messageSchema = mongoose.Schema({
    title: { type: String, require: true },
    recipient: { type: Array, require: true},
    content: { type: String },
    sender: { type: String },
    rear: { type: Boolean },
})

const Message = mongoose.model("message", messageSchema);

export default Message;