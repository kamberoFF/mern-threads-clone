import mongoose from 'mongoose';

let isConnected = false; // variable to check if the connection is established

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(!process.env.MONGODB_URL) {
        return console.log('MONGO_URL is missing');
    }

    if(isConnected) {
        console.log('=> using existing database connection');
        return;
    }

    try{
        await mongoose.connect(process.env.MONGODB_URL);
        isConnected = true;
        console.log('=> new database connection');
    }
    catch(err) {
        console.log('Error connecting to database: ', err);
    }
};