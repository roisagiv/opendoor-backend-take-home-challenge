import mongoose from 'mongoose';
import { logger } from "./winston";

const options: mongoose.ConnectionOptions = { keepAlive: 1 };

export async function connect(connectionString: string, debug: boolean = false) {
    const connectDB = async () =>
        mongoose.connect(
            connectionString,
            options
        );


    mongoose.set('debug', debug);
    mongoose.connection.on('connecting', () => logger.info('Connecting to MongoDb...'));
    mongoose.connection.on('open', () => logger.info('Connection to MongoDb opened'));
    mongoose.connection.on('connected', () => logger.info('Connected to MongoDb'));
    mongoose.connection.on('reconnected', () => logger.info('Reconnected to MongoDb'));
    mongoose.connection.on('disconnected', () => logger.error('Disconnected from MongoDb'));

    mongoose.connection.on('error', err => {
        logger.error(`MongoDb Error ${err}`);
        mongoose.disconnect();
    });


    try {
        await connectDB();
    } catch (err) {
        logger.error(`MongoDb first connection attempt failed ${err}`);
    }
} 
