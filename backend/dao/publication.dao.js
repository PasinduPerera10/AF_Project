import { ObjectId } from 'mongodb';
import client from'./index.js';
const publication = client.db('store').collection('publications')

export async function save ({title, desc, file}){
        const result = await publication.insertOne({title, desc, file});
        return result.insertedId;
}

export async function getAll(){
    const cursor = await publication.find();
    return cursor.toArray();
}

export async function updateRecord(query,values){
    return await publication.updateOne(query,values);
}

export async function findOneRecord(id){
    const cursor = await publication.find({_id:ObjectId(id)});
    return cursor.toArray();
}

export async function removeById(id){
    return await publication.deleteOne({_id:ObjectId(id)});
}



//Export the functions
export default {save, getAll, removeById};