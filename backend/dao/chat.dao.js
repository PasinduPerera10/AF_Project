import client from './index.js';

const chat = client.db('store').collection('chat')


//create msg
export async function save (text, createdAt, groupId, user){
    
        const result = await chat.insertOne({text, createdAt, groupId, user});
        return result.insertedId;
}

//get chat msges
export async function getChatMsg(groupId){
  const result = await chat.find({groupId:parseInt(groupId)});
  return result.toArray();
  
}


//Export the functions
export default {save, getChatMsg};