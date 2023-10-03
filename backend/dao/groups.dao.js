import client from './index.js';

const groups = client.db('store').collection('groups')
const groupCounter= client.db('store').collection('counter')


//create group
export async function save ({member1, member2, member3, member4, groupId}){
    
        const result = await groups.insertOne({member1, member2, member3, member4, groupId});
        return result.insertedId;
}

//get Group by Id
export async function getGroupByReg(regId){
  const result = await groups.find({$or:[{member1:regId},{member2:regId},{member3:regId},{member4:regId}]});
  return result.toArray();
}

export async function getPanel(condition){  
  const result = await groups.find(condition).project({groupId:1,_id:0});
  return result.toArray();
}

//getAndIncrementCount
export async function groupCount (){
    
    const result = await groupCounter.findOne({ counterType: "group" });
    

    const count = result.currentCount + 1;
    console.log(`Counter is ${count}`);


    const filter = { counterType: "group" }
    const options = { upsert: false };
    const updateDoc = {
      $set: {
        currentCount: count
      },
    };

    const result2 = await groupCounter.updateOne(filter, updateDoc, options);
        return result;
    }

    


// login user
// export async function login (user) {
//     const email = user.email;
//     const password = user.password;
//     const userdata = await users.findOne({email:email,password:password});
//     return userdata;
// }



//Export the functions
export default {save, getGroupByReg};