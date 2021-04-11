import mongoose from 'mongoose';

const rateSchema = mongoose.Schema({
    position: { type: String, require: true },
    rate: { type: Number, require: true },
})

const Rate = mongoose.model("rate", rateSchema);

export default Rate;