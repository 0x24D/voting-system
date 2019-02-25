import mongoose from 'mongoose';

export const CandidateSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    party:{
        name:{
            type: String,
            required: true,
        },
    },
});