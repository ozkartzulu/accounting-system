
import { MongoClient } from 'mongodb'
import {generateKey} from '~/utils/helpers'

// Connection URL
const url = process.env.SERVER_URL;
const client = new MongoClient(url);
// Database Name
const dbName = process.env.DB_NAME;


// Add object air
export async function addRent(data){
    try {
        await client.connect()
        const db = client.db(dbName);
        const collection = db.collection('rent')
        const result = await collection.insertOne(data)
        console.log(result)
    } catch (error) {
        console.log(error)
    } 
}

// Add object hanging minute
export async function addHanging(data){
    try {
        await client.connect()
        const db = client.db(dbName);
        const collection = db.collection('hangings')
        const result = await collection.insertOne(data)
        console.log(result)
    } catch (error) {
        console.log(error)
    } 
}

// Add object hanging minutes in south side
export async function addHangingSouth(data){
    try {
        await client.connect()
        const db = client.db(dbName);
        const collection = db.collection('hangings-south')
        const result = await collection.insertOne(data)
        console.log(result)
    } catch (error) {
        console.log(error)
    } 
}

// Get all objects of air
export async function getAllRent(){
    let result = ''
    try {
        await client.connect()
        const db = client.db(dbName)
        const collection = db.collection('rent')
        result = await collection.find({}).toArray()
    } catch (error) {
        console.log(error)
    }
    
    return result;
}

// Get all object weeks to first level
export async function getAllIncome(){
    let result = ''
    try {
        await client.connect()
        const db = client.db(dbName)
        const collection = db.collection('socios')
        result = await collection.aggregate([
            { $unwind : { path: "$road_map", preserveNullAndEmptyArrays: true}},
            { $unwind : { path: "$road_map.weeks", preserveNullAndEmptyArrays: true}},
            { $group: {
                _id: {name: "$name", change_name: "$change_name", pro_accident: "$pro_accident", pro_furniture: "$pro_furniture"},
                sheets: { $sum: "$road_map.weeks.sheets" }
            }}
        ]).toArray()
    } catch (error) {
        console.log(error)
    }
    
    return result;
}

// Get all hanging
export async function getAllHanging(){
    let result = ''
    try {
        await client.connect()
        const db = client.db(dbName)
        const collection = db.collection('hangings')
        result = await collection.find({}).toArray()
    } catch (error) {
        console.log(error)
    }
    
    return result;
}

// Get all hanging of south
export async function getAllHangingSouth(){
    let result = ''
    try {
        await client.connect()
        const db = client.db(dbName)
        const collection = db.collection('hangings-south')
        result = await collection.find({}).toArray()
    } catch (error) {
        console.log(error)
    }
    
    return result;
}