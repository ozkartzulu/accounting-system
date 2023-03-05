
import { MongoClient } from 'mongodb'
import {generateKey} from '~/utils/helpers'

// Connection URL
const url = process.env.SERVER_URL;
const client = new MongoClient(url);
// Database Name
const dbName = process.env.DB_NAME;


// Add object air
export async function addUser(data){
    try {
        await client.connect()
        const db = client.db(dbName);
        const collection = db.collection('users')
        const result = await collection.insertOne(data)
        console.log(result)
    } catch (error) {
        console.log(error)
    } 
}

// Get all objects of air
export async function getUser(user){
    let result = ''
    try {
        await client.connect()
        const db = client.db(dbName)
        const collection = db.collection('users')
        result = await collection.find({username: user}).toArray()
    } catch (error) {
        console.log(error)
    }
    
    return result;
}