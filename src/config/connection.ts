import mongoose from 'mongoose';

const db = async (): Promise<typeof mongoose.connection> => {
    try {
        await mongoose.connect(
            process.env.MONGOD_URI || 'mongodb://localhost/social-network-DB',
        );
        console.log('MongoDB connected');
        return mongoose.connection;
    } catch (error) {
        console.log('MongoDB connection failed', error);
        throw new Error('MongoDB connection failed');
    }
};

export default db;