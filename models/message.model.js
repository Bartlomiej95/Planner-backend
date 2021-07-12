import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

const messageSchema = mongoose.Schema({
    title: { type: String, require: true },
    recipient: { type: String, require: true},
    recipientId: { type: ObjectId, require: true},
    content: { type: String },
    sender: { type: String },
})

const Message = mongoose.model("project", messageSchema);

export default Message;