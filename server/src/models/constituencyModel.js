import mongoose from 'mongoose';

export const ConstituencySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    minimumAge: {
        type: String,
        required: true,
    },
    votingSystem: {
        type: String,
        required: true,
    },
});