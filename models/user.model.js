import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: { type: String, require: true, minLength: 2, maxLength: 20},
    surname: { type: String, require: true, minLength: 2, maxLength: 50},
    password: { type: String, require: true, minLength: 5, maxLength: 100 },
    replayPassword: { type: String, require: true, minLength: 5, maxLength: 100 },
    email: { type: String, require: true, unique: true },
    user_id: { type: Number, require: true, unique: true },
    position: { type: String, defualt: 'pracownik' },
    is_admin: { type: Boolean, default: false },
    projects: { type: [Number], default: [] },
    tasks: { type: [Number], default: [] },
})

const User = mongoose.model('User', userSchema);

export default User;