import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);
    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    }
    try {
        await mongoose.connect(process.env.Mongo_URL)

        isConnected = true;

        console.log('Connected To DB')
    } catch (error) {
        console.log("DB error" + error.message);
    }
}