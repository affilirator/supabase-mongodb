import { MongoClient } from 'mongodb';

const uri = import.meta.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function connectToDb() {
  try {
    await client.connect();
    return client.db('userdb');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

export async function createUser(userData: any) {
  const db = await connectToDb();
  const users = db.collection('users');
  return await users.insertOne(userData);
}