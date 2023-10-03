import client from './index.js';
const studentMarks= client.db('store').collection('studentMarks')


//create group
export async function save ({submissionId,pointMarks}){
    
        const result = await studentMarks.insertOne({submissionId,pointMarks});
        return result.insertedId;
}

//get Group by Id
export async function getAllMarks(){
  const result = await studentMarks.find();
  return result.toArray();
}

//getAndIncrementCount
export async function groupCount (){
    
    const result = await studentMarks.findOne({ counterType: "group" });
    

    const count = result.currentCount + 1;
    console.log(`Counter is ${count}`);


    const filter = { counterType: "group" }
    const options = { upsert: false };
    const updateDoc = {
      $set: {
        currentCount: count
      },
    };
    


    const result2 = await studentMarks.updateOne(filter, updateDoc, options);
        return result;
    }
//Export the functions
export default {save, getAllMarks};