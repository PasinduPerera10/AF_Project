import axios from "axios";


//function to get groupID
export async function getGroupId()
{
  var id=null;

  await axios.get("http://localhost:3000/groups/counter").then(response =>
  {
    //sss
      const groupId = response.data;
      console.log(groupId);
      id=groupId.currentCount;
      
      
    
  }).then(x=>{
    //console.log(id);
    
  });
  return id;
}

//function to get group Id by student registation number
export async function getGroupByReg(regId){
  var data = [];
  await axios.get('http://localhost:3000/groups/getById/' + regId).then(response => {
    data = response.data;
  })
  return data;
}

//function to add group
export async function createGroup(group)
{

  await axios.post("http://localhost:3000/groups/", group).then(response =>
    {
    const data = response.data;
    console.log(data)
      
    });
}

export default {getGroupByReg}