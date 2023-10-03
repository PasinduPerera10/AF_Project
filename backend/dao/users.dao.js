import client from'./index.js';
const users = client.db('store').collection('users')
import * as mongoose from 'mongoose';
import {ObjectId} from 'mongodb';
import CryptoJS from"crypto-js";
var key = "ASECRET";

//register user
export async function save ({id, name, username, email, password, role, reg}){
    const isavailableemail = await users.findOne({email:email});
    const isavailableusername = await users.findOne({username:username});
    //const isavailablereg = await users.findOne({reg:reg});
    if(isavailableemail || isavailableusername){
        return 'userexist'
    }else{
        const result = await users.insertOne({id, name, username, email, password, role, reg});
        return result.insertedId;
    }
    
}

export async function getAll(){
    const cursor = await users.find();

return cursor.toArray();
}

export async function removeById(id){
    return await users.deleteOne({_id:ObjectId(id)});
}

export const getById = async (id) =>{
    return await users.findOne({_id:ObjectId(id)});
}

export async function update(id, user){
    const result = await users.updateOne({_id:ObjectId(id)}, {$set: {name:user.name, email:user.email, username:user.username, password:user.password, role:user.role}});
    console.log(result)
    return result;
   };

//login user
export async function login (user) {
    const email = user.email;
    const password = user.password;
    const userdata = await users.findOne({email:email});
    if((CryptoJS.AES.decrypt((userdata.password),key)).toString(CryptoJS.enc.Utf8) === password){
        return userdata;
    }
    
}



//Export the functions
export default {save, login, getAll, getById, removeById, update};