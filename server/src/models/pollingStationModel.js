import mongoose from 'mongoose';

export const PollingStationSchema = new mongoose.Schema({

    address: {
        type: String,
        required: true,
    },
    openTime: {
        type: Date,
        required: true,
    },
    closeTime: {
        type: Date,
        required: true,
    }
});