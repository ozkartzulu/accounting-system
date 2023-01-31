
import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);
// Database Name
const dbName = 'sistema-contable';

export async function getPartners() {
    // Use connect method to connect to the server
    let result = ''
    try {
        await client.connect()
        const db = client.db(dbName);
        const collection = db.collection('socios')
        result = await collection.find({}).toArray()
    } catch (error) {
        console.log(error)
    }
    
  
    return result;
}

export async function getPartner(ciSocio) {
    // Use connect method to connect to the server
    let result = ''
    try {
        await client.connect()
        const db = client.db(dbName);
        const collection = db.collection('socios')
        result = await collection.find({ci: ciSocio}).toArray()
    } catch (error) {
        console.log(error)
    }
    
  
    return result;
}

// Get all objects of gps to first level
export async function getAllGps(){
    let result = ''
    try {
        await client.connect()
        const db = client.db(dbName)
        const collection = db.collection('socios')
        result = await collection.aggregate([
            { $unwind : { path: "$gps", preserveNullAndEmptyArrays: true}},
            // { $project : {
            //     name: "$name",
            //     first_name: "$first_name",
            //     amount: "$gps.amount"
            // }},
            { $group: {
                _id: {name: "$name", first_name: "$first_name"},
                amount: { $sum: { $toDouble: "$gps.amount"}}
            }}
        ]).toArray()
    } catch (error) {
        console.log(error)
    }
    
    return result;
}

// Get all object weeks to first level
export async function getAllWeeks(){
    let result = ''
    try {
        await client.connect()
        const db = client.db(dbName)
        const collection = db.collection('socios')
        result = await collection.aggregate([
            { $unwind : { path: "$road_map", preserveNullAndEmptyArrays: true}},
            { $unwind : { path: "$road_map.weeks", preserveNullAndEmptyArrays: true}},
            // { $project : {
            //     name: "$name",
            //     first_name: "$first_name",
            //     fines_amount: "$road_map.fines.amount",
            //     insurance: "$road_map.weeks.insurance",
            //     saving: "$road_map.weeks.saving",
            //     sheets: "$road_map.weeks.sheets"
            // }},
            { $group: {
                _id: {name: "$name", first_name: "$first_name", ci: "$ci"},
                insurance: { $sum: "$road_map.weeks.insurance" },
                saving: { $sum: "$road_map.weeks.saving" },
                sheets: { $sum: "$road_map.weeks.sheets" }
            }}
        ]).toArray()
    } catch (error) {
        console.log(error)
    }
    
    return result;
}

// Get all object fines to first level
export async function getAllFines(){
    let result = ''
    try {
        await client.connect()
        const db = client.db(dbName)
        const collection = db.collection('socios')
        result = await collection.aggregate([
            { $unwind : { path: "$road_map", preserveNullAndEmptyArrays: true}},
            { $unwind : { path: "$road_map.fines", preserveNullAndEmptyArrays: true}},
            { $group: {
                _id: {name: "$name", first_name: "$first_name", ci: "$ci"},
                amount: { $sum: "$road_map.fines.amount" }
            }}
        ]).toArray()
    } catch (error) {
        console.log(error)
    }
    
    return result;
}

// Get all object withdrawn to first level
export async function getAllWithDrawn(){
    let result = ''
    try {
        await client.connect()
        const db = client.db(dbName)
        const collection = db.collection('socios')
        result = await collection.aggregate([
            { $unwind : { path: "$road_map", preserveNullAndEmptyArrays: true}},
            { $unwind : { path: "$road_map.withdrawn", preserveNullAndEmptyArrays: true}},
            { $group: {
                _id: {name: "$name", first_name: "$first_name", ci: "$ci"},
                amount: { $sum: "$road_map.withdrawn.amount" }
            }}
        ]).toArray()
    } catch (error) {
        console.log(error)
    }
    
    return result;
}

export async function addPartner(data){
    try {
        await client.connect()
        const db = client.db(dbName);
        const collection = db.collection('socios')
        const result = await collection.insertOne(data)
    } catch (error) {
        console.log(error)
    } 
}

// Add month in a partner
export async function addMonth(ciPartner, data){
    try {
        await client.connect()
        const db = client.db(dbName);
        const collection = db.collection('socios')
        const result = await collection.updateOne(
            {ci: ciPartner},
            {
                $push: {
                    "road_map": {id: data.id, insured: false, weeks: [], fines: [], withdrawn: []}
                }
            }
        )
        console.log(result)
    } catch (error) {
        console.log(error)
    } 
}

// Add object gps to a partner
export async function addGPS(ciPartner, data){
    try {
        await client.connect()
        const db = client.db(dbName);
        const collection = db.collection('socios')
        const result = await collection.updateOne(
            {ci: ciPartner},
            {
                $push: {
                    "gps": {id: data.id, date: data.date, amount: data.amount, check_book: data.check_book, receipt: data.receipt}
                }
            }
        )
        console.log(result)
    } catch (error) {
        console.log(error)
    } 
}

// Add a object of week in array of road_map
export async function addWeek(ciPartner, data){
    try {  
        await client.connect()
        const db = client.db(dbName);
        const collection = db.collection('socios')
        const result = await collection.updateOne(
            {ci: ciPartner, "road_map.id": data.month},
            {
                $push: {
                    "road_map.$.weeks": {id: data.week, insurance: data.insurance, saving: data.saving, sheets: data.sheets }
                }
            }
        )
        console.log(result)
    } catch (error) {
        console.log(error)
    } 
}

// Add fines to a partner
export async function addFines(ciPartner, data){
    try {  
        await client.connect()
        const db = client.db(dbName);
        const collection = db.collection('socios')
        const result = await collection.updateOne(
            {ci: ciPartner, "road_map.id": data.id_month},
            {
                $push: {
                    "road_map.$.fines": {id: data.id_fines, amount: data.amount, description: data.description, date: data.date }
                }
            }
        )
    } catch (error) {
        console.log(error)
    } 
}

// Add withdrawn to a partner
export async function addWithDrawn(ciPartner, data){
    try {  
        await client.connect()
        const db = client.db(dbName);
        const collection = db.collection('socios')
        console.log(data)
        const result = await collection.updateOne(
            {ci: ciPartner, "road_map.id": data.id_month},
            {
                $push: {
                    "road_map.$.withdrawn": {id: data.id_withdrawn, amount: data.amount, receipt: data.receipt, book: data.book, date: data.date }
                }
            }
        )
        console.log(result)
    } catch (error) {
        console.log(error)
    } 
} 

export async function updatePartner(data, ciSocio){
    try {
        await client.connect()
        const db = client.db(dbName);
        const collection = db.collection('socios')
        const result = await collection.updateOne({ci: ciSocio},{$set:data})
    } catch (error) {
        console.log(error)
    } 
}

// Change state of partner if is insured or not
export async function updateInsured(ciPartner, state, idMonth){
    try {  
        await client.connect()
        const db = client.db(dbName);
        const collection = db.collection('socios')
        const result = await collection.updateOne(
            {ci: ciPartner, "road_map.id": idMonth},
            {
                $set: {
                    "road_map.$.insured": state
                }
            }
        )
        console.log(result)
    } catch (error) {
        console.log(error)
    } 
}

export async function deletePartner(id){
    try {
        await client.connect()
        const db = client.db(dbName);
        const collection = db.collection('socios')
        const result = await collection.deleteOne({ci: id})
        console.log(result)
    } catch (error) {
        console.log(error)
    } 
}
