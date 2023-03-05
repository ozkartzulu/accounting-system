
import { MongoClient } from 'mongodb'

// Connection URL
const url = process.env.SERVER_URL;
const client = new MongoClient(url);
// Database Name
const dbName = process.env.DB_NAME;

export async function addExpense(data){
    try {
        await client.connect()
        const db = client.db(dbName);
        const collection = db.collection('egresos')
        const result = await collection.insertOne(data)
    } catch (error) {
        console.log(error)
    } 
}

export async function getExpenses() {
    let result = ''
    try {
        await client.connect()
        const db = client.db(dbName);
        const collection = db.collection('egresos')
        result = await collection.find({}).toArray()
    } catch (error) {
        console.log(error)
    }
    
  
    return result;
}