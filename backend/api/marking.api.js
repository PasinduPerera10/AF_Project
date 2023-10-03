import client from'../dao/index.js';
const marking = client.db('store').collection('markingScheme')

export async function save ({assignmentType, markingPoints}){
        const result = await marking.insertOne({assignmentType, markingPoints});
        return result.insertedId;
}

export async function getAll(){
        const cursor = await marking.find();
        return cursor.toArray();
}

export default {save,getAll};