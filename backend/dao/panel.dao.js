import client from'./index.js';
const users = client.db('store').collection('users')
const groups = client.db('store').collection('groups')
import {ObjectId} from 'mongodb';
import * as mongoose from 'mongoose';

export async function assign (groupId,panelmember){
    console.log(groupId)
    console.log(panelmember)
    const result = await groups.updateOne({groupId:parseInt(groupId)}, {$set: {panel:panelmember}},{upsert:true});
    return {modeifiedres:result.modifiedCount};
}

export async function checkStatusOfGroup (groupId){
    const cursor = await groups.findOne({groupId:parseInt(groupId)});
    if(cursor.panel){
        var panelmembers = cursor.panel;
    }else{
        panelmembers = "NotExist";
    }
    return {data:panelmembers};
}

export async function getPanelMembers (){
    const cursor = await users.find({role:'staff'});
    return cursor.toArray();
}

export async function getGroups (){
    const cursor = await groups.find();
    return cursor.toArray();
}


//Export the functions
export default {getPanelMembers, checkStatusOfGroup, assign, getGroups};