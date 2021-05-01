import Rate from '../models/rate.model.js';

export const changeRate = async (req, res) => {
    const { id, value } = req.body;
    try {
        let searchedRate = await Rate.findOneAndUpdate({ _id: id}, { rate: value });
        searchedRate = await Rate.findOne({ _id: id})
        res.status(200).json({ searchedRate });
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}