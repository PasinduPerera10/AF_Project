import client from "./index.js";
const studentTopics = client.db("store").collection("studentTopics");
const banTopics = client.db("banlist").collection("studentTopics");
import { ObjectId } from "mongodb";
import * as mongoose from "mongoose";

export async function save ({groupid, topic, description, status, supervisor, cosupervisor}){
        const banlistchk = await banTopics.findOne({topic:topic});
        const topicduplication = await studentTopics.findOne({groupid:groupid});
        console.log(topicduplication)
        const arr = [];
        arr.push(topicduplication);
        try{
            var obj = arr.find(o => o.status === 'approved');
        }catch(e){
            obj=== undefined;
        }
        try{
            var obj1 = arr.find(o => o.status === 'pending');
        }catch(e){
            obj1=== undefined;
        }
        

  if (obj === undefined && obj1 === undefined) {
    if (banlistchk !== null) {
      status = "rejected";
    }
    const result = await studentTopics.insertOne({
      groupid,
      topic,
      description,
      status,
      supervisor,
      cosupervisor,
    });
    return result.insertedId;
  } else {
    return "topicexist or user already has a topic!";
  }
}

export async function ban({ topic }) {
  const banlistchk = await banTopics.findOne({ topic: topic });
  if (banlistchk !== null) {
    const result = await banTopics.insertOne({ topic });
    return result.insertedId;
  } else {
    return "alreadyinlist";
  }
}

export async function updatestatus(id, topicupdate) {
  const result = await studentTopics.updateOne(
    { _id: ObjectId(id) },
    { $set: { status: topicupdate.status } }
  );
  console.log(result);
  return result;
}

export async function getAll() {
  const cursor = await studentTopics.find();

  return cursor.toArray();
}

export async function removeById(id) {
  return await studentTopics.deleteOne({ id });
}

export const getById = async (id) => {
  try {
    const userdata = await studentTopics.findOne({ _id: ObjectId(id) });
    return userdata;
  } catch (e) {
    console.log(e);
  }
};

export async function editSupervisors(group) {
  const filter = { groupid: group.groupid };
  const options = { upsert: false };
  var updateDoc = null;

  if (group.supervisor) {
    updateDoc = { $set: { supervisor: group.supervisor } };
  } else if (group.cosupervisor) {
    updateDoc = { $set: { cosupervisor: group.cosupervisor } };
  }

  const result = await studentTopics.updateMany(filter, updateDoc, options);
  return result;
}

export async function getTopicByGroup(id){

  
  const filter = { groupid: id };
  console.log(filter)
  const result= await studentTopics.find(filter).toArray();

  console.log(result);

  var approved=null;

  if(result.length>1){
  result.map((value)=>{
      if(value.status=="approved"){
        approved=value;
      }
  })
}else{
  approved=result[0]
}

  console.log(approved)

  return approved;
}

//Export the functions
export default { save, ban, updatestatus, getAll, removeById, getById, getTopicByGroup };
