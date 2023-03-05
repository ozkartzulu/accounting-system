import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);
// Database Name
const dbName = 'sistema-contable';

export async function getEmployees() {
    // Use connect method to connect to the server
    let result = ''
    try {
        await client.connect()
        const db = client.db(dbName);
        const collection = db.collection('employees')
        result = await collection.find({}).toArray()
    } catch (error) {
        console.log(error)
    }
     
    return result;
}

export async function getEmployee(ciUser) {
    // Use connect method to connect to the server
    let result = ''
    try {
        await client.connect()
        const db = client.db(dbName);
        const collection = db.collection('employees')
        result = await collection.find({ci: ciUser}).toArray()
    } catch (error) {
        console.log(error)
    }
  
    return result;
}

// Add Employee to db
export async function addEmployee(data){
    try {
        await client.connect()
        const db = client.db(dbName);
        const collection = db.collection('employees')
        const result = await collection.insertOne(data)
    } catch (error) {
        console.log(error)
    } 
}

// Add month in a employee
export async function addMonth(ciUser, data){
    try {
        await client.connect()
        const db = client.db(dbName);
        const collection = db.collection('employees')
        const result = await collection.updateOne(
            {ci: ciUser},
            {
                $push: {
                    "road_map": {id: data.id, month: data.month, year: data.year, state_saving: false, weeks: [], withdrawn: []}
                }
            }
        )
        console.log(result)
    } catch (error) {
        console.log(error)
    } 
}

// Add a object of week in array of road_map on employee
export async function addWeek(ciUser, data){
    try {  
        await client.connect()
        const db = client.db(dbName);
        const collection = db.collection('employees')
        const result = await collection.updateOne(
            {ci: ciUser, "road_map.id": data.month},
            {
                $push: {
                    "road_map.$.weeks": {id: data.id, week: data.week, saving: data.saving, date: data.date }
                }
            }
        )
        console.log(result)
    } catch (error) {
        console.log(error)
    } 
}

// Add withdrawn to a employee
export async function addWithDrawn(ciUser, data){
    try {  
        await client.connect()
        const db = client.db(dbName);
        const collection = db.collection('employees')

        const result = await collection.updateOne(
            {ci: ciUser, "road_map.id": data.id_month},
            {
                $push: {
                    "road_map.$.withdrawn": {id: data.id_withdrawn, amount: data.amount, receipt: data.receipt, book: data.book, date: data.date }
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

// Update Employee in db about ci
export async function updateEmployee(data, ciUser){
    try {
        await client.connect()
        const db = client.db(dbName);
        const collection = db.collection('employees')
        const result = await collection.updateOne({ci: ciUser},{$set:data})
    } catch (error) {
        console.log(error)
    } 
}

// Update state of employee
export async function updateStatus(data){
    try {  
        await client.connect()
        const db = client.db(dbName);
        const collection = db.collection('employees')
        const result = await collection.updateOne(
            {ci: data.user_ci},
            {
                $set: {
                    "status": data.status
                }
            }
        )
        console.log(result)
    } catch (error) {
        console.log(error)
    } 
}

// Update deposit initial of employee
export async function addContribution(ciUser, data){
    try {  
        await client.connect()
        const db = client.db(dbName);
        const collection = db.collection('employees')
        const result = await collection.updateOne(
            {ci: ciUser},
            {
                $set: {
                    "contribution": {
                        id: data.id, 
                        amount: data.amount, 
                        pro_deport: data.pro_deport, 
                        date: data.date,
                        withdrawn_amount: 0,
                        book: '',
                        receipt: '',
                        withdrawn_date: ''
                    }
                }
            }
        )
        console.log(result)
    } catch (error) {
        console.log(error)
    } 
}

// Update deposit initial of employee
export async function updateContribution(ciUser, data){
    try {  
        await client.connect()
        const db = client.db(dbName);
        const collection = db.collection('employees')
        const result = await collection.updateOne(
            {ci: ciUser},
            {
                $set: {
                    "contribution.withdrawn_amount": data.withdrawn_amount,
                    "contribution.book": data.book,
                    "contribution.receipt": data.receipt,
                    "contribution.withdrawn_date": data.withdrawn_date,
                }
            }
        )
        console.log(result)
    } catch (error) {
        console.log(error)
    } 
}

// Delete Employee of db by ci
export async function deleteEmployee(idUser){
    try {
        await client.connect()
        const db = client.db(dbName);
        const collection = db.collection('employees')
        const result = await collection.deleteOne({ci: idUser})
        console.log(result)
    } catch (error) {
        console.log(error)
    } 
}