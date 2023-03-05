
import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);
// Database Name
const dbName = 'sistema-contable';

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