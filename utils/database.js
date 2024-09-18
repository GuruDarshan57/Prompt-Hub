import mongoose from 'mongoose';

//To make sure we are not creating multiple connections
let isConnected = false;

//To connect to the database
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
        console.log("DB connection error" + error.message);
    }
}