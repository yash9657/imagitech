import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL

interface MongooseConnection {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

// usually in express applications we directly connect to mongodb only once
// but in Next js we have to connect to mongodb on every server action or api request
// this is because Next.js runs in a serverless environment
// serverless functions are stateless and are created and destroyed on every request
// therefore to optimise our connections, we will cache them

let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
}

export const connectToDatabase = async () => {
    if (cached.conn) {
        return cached.conn;
    }
    if(!MONGODB_URL) {
        throw new Error('No MONGODB_URL');
    }

    cached.promise = cached.promise || mongoose.connect(MONGODB_URL, {
        dbName: 'imagitech',
        bufferCommands: false,
    });

    cached.conn = await cached.promise;
    return cached.conn;
}