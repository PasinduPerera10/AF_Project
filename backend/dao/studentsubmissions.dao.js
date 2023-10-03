import client from'./index.js';
const studentsubmissions = client.db('store').collection('studentsubmissions');
import {ObjectId} from 'mongodb';

export async function save ({groupid, topic, uploaddate, file, assignmentId, assignmentTitle}){
        const result = await studentsubmissions.insertOne({groupid, topic, uploaddate, file, assignmentId, assignmentTitle});
        return result.insertedId;
    }

export async function getAll(){
    const cursor = await studentsubmissions.find();

return cursor.toArray();
}

export async function removeById(id){
    return await studentsubmissions.deleteOne({_id:ObjectId(id)});
}

export const getById = async (id) =>{
    try{
        const subdata = await studentsubmissions.findOne({_id:ObjectId(id)});
        return subdata;
    }catch(e){
        console.log(e)
    }
}

export async function findRecords(condition){
    const cursor = await studentsubmissions.find(condition);
    return cursor.toArray();
}

export async function update(id, studentsubmission){
    const result = await studentsubmissions.replaceOne({"_id":ObjectId(id)}, {groupid:studentsubmission.groupid, topic:studentsubmission.topic, uploaddate:studentsubmission.uploaddate, file:studentsubmission.file, assignmentTitle:studentsubmission.assignmentTitle});
    console.log(result)
    return result;
   };

export default {save, getAll, removeById, getById, update, findRecords};
