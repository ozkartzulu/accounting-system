
import { MongoClient } from 'mongodb'
import {generateKey} from '~/utils/helpers'

// Connection URL
const url = process.env.SERVER_URL;
const client = new MongoClient(url);
// Database Name
const dbName = process.env.DB_NAME;

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

// Get all objects of gps
export async function getAllGps(){
    let result = ''
    try {
        await client.connect()
        const db = client.db(dbName)
        const collection = db.collection('gps')
        result = await collection.find({}).toArray()
    } catch (error) {
        console.log(error)
    }
    
    return result;
}

// Get all objects of air
export async function getAllAir(){
    let result = ''
    try {
        await client.connect()
        const db = client.db(dbName)
        const collection = db.collection('air')
        result = await collection.find({}).toArray()
    } catch (error) {
        console.log(error)
    }
    
    return result;
}

// Get all objects of pro deport
export async function getAllDeport(){
    let result = ''
    try {
        await client.connect()
        const db = client.db(dbName)
        const collection = db.collection('pro-deport')
        result = await collection.find({}).toArray()
    } catch (error) {
        console.log(error)
    }
    
    return result;
}

// Get all partners that have change name registered
export async function getChangeName(){
    let result = ''
    try {
        await client.connect()
        const db = client.db(dbName)
        const collection = db.collection('socios')
        result = await collection.find({
            'change_name.amount': { $gt: 0 }
        }).toArray()
    } catch (error) {
        console.log(error)
    }
    
    return result;
}

// Get all partners that have pro accident registered
export async function getProAccident(){
    let result = ''
    try {
        await client.connect()
        const db = client.db(dbName)
        const collection = db.collection('socios')
        result = await collection.find({
            'pro_accident.amount': { $gt: 0 }
        }).toArray()
    } catch (error) {
        console.log(error)
    }
    
    return result;
}

// Get all partners that have pro furniture registered
export async function getProFurniture(){
    let result = ''
    try {
        await client.connect()
        const db = client.db(dbName)
        const collection = db.collection('socios')
        result = await collection.find({
            'pro_furniture.amount': { $gt: 0 }
        }).toArray()
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

export async function addPointer(data){
    try {
        await client.connect()
        const db = client.db(dbName);
        const collection = db.collection('pointer')
        const result = await collection.insertOne(data)
    } catch (error) {
        console.log(error)
    } 
}

export async function setPointer(number){
    try {
        await client.connect()
        const db = client.db(dbName);
        const collection = db.collection('pointer')
        const result = await collection.updateOne(
            {},
            {
                $set: {
                    "number": number
                }
            }
            
        )
    } catch (error) {
        console.log(error)
    } 
}

export async function setPointerPartner(ciPartner, number){
    try {
        await client.connect()
        const db = client.db(dbName);
        const collection = db.collection('socios')
        const result = await collection.updateOne(
            {ci: ciPartner},
            {
                $set: {
                    "pointer": number
                }
            }
            
        )
    } catch (error) {
        console.log(error)
    } 
}

export async function getPointer() {
    // Use connect method to connect to the server
    let result = ''
    try {
        await client.connect()
        const db = client.db(dbName);
        const collection = db.collection('pointer')
        result = await collection.find({}).toArray()
    } catch (error) {
        console.log(error)
    }
    
  
    return result;
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
                    "road_map": {id: data.id, month: data.month, year: data.year, insured: false, state_insurance: false, state_saving: false, weeks: [], fines: [], withdrawn: [], help: []}
                }
            }
        )
        console.log(result)
    } catch (error) {
        console.log(error)
    } 
}

// Add month in a partner
export async function addBasket(ciPartner, data){
    try {
        await client.connect()
        const db = client.db(dbName);
        const collection = db.collection('socios')
        const result = await collection.updateOne(
            {ci: ciPartner},
            {
                $push: {
                    "basket": {id: data.id, year: data.year, state_saving: false, list_basket: [], withdrawn: []}
                }
            }
        )
        console.log(result)
    } catch (error) {
        console.log(error)
    } 
}

// Add a item into basket list for a partner
export async function addBasketSaving(ciPartner, data){
    try {  
        await client.connect()
        const db = client.db(dbName);
        const collection = db.collection('socios')
        const result = await collection.updateOne(
            {ci: ciPartner, "basket.id": data.basket_id},
            {
                $push: {
                    "basket.$.list_basket": {id: data.id, month: data.month, saving: data.saving, book: data.book, receipt: data.receipt, date: data.date }
                }
            }
        )
        console.log(result)
    } catch (error) {
        console.log(error)
    } 
}

// Add a item into basket list for a partner
export async function addBasketWithdrawn(ciPartner, data){
    try {  
        await client.connect()
        const db = client.db(dbName);
        const collection = db.collection('socios')
        const result = await collection.updateOne(
            {ci: ciPartner, "basket.id": data.basket_id},
            {
                $push: {
                    "basket.$.withdrawn": {id: data.id, amount: data.amount, book: data.book, receipt: data.receipt, date: data.date }
                }
            }
        )
        console.log(result)
    } catch (error) {
        console.log(error)
    } 
}

// Add object gps
export async function addGPS(data){
    try {
        await client.connect()
        const db = client.db(dbName);
        const collection = db.collection('gps')
        const result = await collection.insertOne(data)
        console.log(result)
    } catch (error) {
        console.log(error)
    } 
}

// Add object air
export async function addAir(data){
    try {
        await client.connect()
        const db = client.db(dbName);
        const collection = db.collection('air')
        const result = await collection.insertOne(data)
        console.log(result)
    } catch (error) {
        console.log(error)
    } 
}

// Add object pro deport
export async function addDeport(data){
    try {
        await client.connect()
        const db = client.db(dbName);
        const collection = db.collection('pro-deport')
        const result = await collection.insertOne(data)
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
                    "road_map.$.weeks": {id: data.id, week: data.week, date: data.date, insurance: data.insurance, saving: data.saving, sheets: data.sheets }
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
                    "road_map.$.fines": {id: data.id_fines, amount: data.amount, description: data.description, date: data.date, book: '', receipt: '', amount_pay: 0, date_pay: '' }
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

        const result = await collection.updateOne(
            {ci: ciPartner, "road_map.id": data.id_month},
            {
                $push: {
                    "road_map.$.withdrawn": {id: data.id_withdrawn, amount: data.amount, type: data.type, receipt: data.receipt, book: data.book, date: data.date }
                }
            }
        )
        console.log(result)
    } catch (error) {
        console.log(error)
    } 
} 

// Add withdrawn to a partner and change state_insurance state
export async function addWithDrawnInsurance(ciPartner, data){
    try {  
        await client.connect()
        const db = client.db(dbName);
        const collection = db.collection('socios')
        console.log(data)
        const result = await collection.updateOne(
            {ci: ciPartner, "road_map.id": data.id_month},
            {
                $push: {
                    "road_map.$.withdrawn": {id: data.id_withdrawn, amount: data.amount, type: data.type, receipt: data.receipt, book: data.book, date: data.date }
                },
                $set: {
                    "road_map.$.state_insurance": true
                }
            }
        )
        console.log(result)
    } catch (error) {
        console.log(error)
    }
} 

// Add withdrawn to a partner and change state_saving state
export async function addWithDrawnSaving(ciPartner, data){
    try {  
        await client.connect()
        const db = client.db(dbName);
        const collection = db.collection('socios')
        console.log(data)
        const result = await collection.updateOne(
            {ci: ciPartner, "road_map.id": data.id_month},
            {
                $push: {
                    "road_map.$.withdrawn": {id: data.id_withdrawn, amount: data.amount, type: data.type, receipt: data.receipt, book: data.book, date: data.date }
                },
                $set: {
                    "road_map.$.state_saving": true
                }
            }
        )
        console.log(result)
    } catch (error) {
        console.log(error)
    } 
} 

// Add a object of help to a month of all partners
export async function addHelper(data){
    try {  
        await client.connect()
        const db = client.db(dbName);
        const collection = db.collection('socios')
        const result = await collection.updateMany(
            {"road_map.month": data.month, "road_map.year": data.year},
            {
                $push: {
                    "road_map.$[item].help": {id: generateKey(), amount: data.amount, description: data.description, date: data.date, book: '', receipt: '', amount_pay: 0, date_pay: '' }
                }
            },
            {
                arrayFilters: [
                    {"item.month": data.month}
                ]
            }
        )
        console.log(result)
    } catch (error) {
        console.log(error)
    } 
}

// add name change when a partner new is register
export async function addChangeName(ciUser, data){
    try {  
        await client.connect()
        const db = client.db(dbName);
        const collection = db.collection('socios')
        const result = await collection.updateOne(
            {ci: ciUser},
            {
                $set: {
                    "change_name": {
                        id: generateKey(), 
                        amount: data.amount, 
                        book: data.book, 
                        receipt: data.receipt,
                        date: data.date,
                    }
                }
            }
        )
        console.log(result)
    } catch (error) {
        console.log(error)
    } 
}

// add pro deport when a partner new is register
export async function addProAccident(ciUser, data){
    try {  
        await client.connect()
        const db = client.db(dbName);
        const collection = db.collection('socios')
        const result = await collection.updateOne(
            {ci: ciUser},
            {
                $set: {
                    "pro_accident": {
                        id: generateKey(), 
                        amount: data.amount, 
                        book: data.book, 
                        receipt: data.receipt,
                        date: data.date,
                    }
                }
            }
        )
        console.log(result)
    } catch (error) {
        console.log(error)
    } 
}

// add pro furniture when a partner new is register
export async function addProFurniture(ciUser, data){
    try {  
        await client.connect()
        const db = client.db(dbName);
        const collection = db.collection('socios')
        const result = await collection.updateOne(
            {ci: ciUser},
            {
                $set: {
                    "pro_furniture": {
                        id: generateKey(), 
                        amount: data.amount, 
                        book: data.book, 
                        receipt: data.receipt,
                        date: data.date,
                    }
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

// update the fines
export async function updateFines(ciPartner, data){
    try {  
        await client.connect()
        const db = client.db(dbName);
        const collection = db.collection('socios')
        const result = await collection.updateOne(
            {ci: ciPartner, "road_map.id": data.idMonth, "road_map.fines.id": data.idFines},
            {
                $set: {
                    "road_map.$[].fines.$[item].book": data.book,
                    "road_map.$[].fines.$[item].receipt": data.receipt,
                    "road_map.$[].fines.$[item].amount_pay": data.amount,
                    "road_map.$[].fines.$[item].date_pay": data.date
                }
            },
            {
                arrayFilters: [
                    {"item.id": data.idFines}
                ]
            }
        )
        console.log(result)
    } catch (error) {
        console.log(error)
    } 
}

// update help
export async function updateHelp(ciPartner, data){
    try {  
        await client.connect()
        const db = client.db(dbName);
        const collection = db.collection('socios')
        const result = await collection.updateOne(
            {ci: ciPartner, "road_map.id": data.idMonth, "road_map.help.id": data.idHelp},
            {
                $set: {
                    "road_map.$[].help.$[item].book": data.book,
                    "road_map.$[].help.$[item].receipt": data.receipt,
                    "road_map.$[].help.$[item].amount_pay": data.amount,
                    "road_map.$[].help.$[item].date_pay": data.date
                }
            },
            {
                arrayFilters: [
                    {"item.id": data.idHelp}
                ]
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
