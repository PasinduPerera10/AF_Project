import client from'./index.js';
const submissiontypes = client.db('store').collection('submissiontypes');
import {ObjectId} from 'mongodb';

export async function save ({title, desc, deadline}){
        const result = await submissiontypes.insertOne({title, desc, deadline});
        return result.insertedId;
    }

export async function getAll(){
    const cursor = await submissiontypes.find();

return cursor.toArray();
}

export async function removeById(id){
    return await submissiontypes.deleteOne({_id:ObjectId(id)});
}

export const getById = async (id) =>{
    try{
        const subdata = await submissiontypes.findOne({_id:ObjectId(id)});
        return subdata;
    }catch(e){
        console.log(e)
    } 
}

export async function update(id, submissiontype){
    const result = await submissiontypes.replaceOne({"_id":ObjectId(id)}, {title:submissiontype.title, desc:submissiontype.desc, deadline:submissiontype.deadline});
    console.log(result)
    return result;
   };

//Export the functions
export default {save, getAll, removeById, getById, update};