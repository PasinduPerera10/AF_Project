import axios from "axios";


//function to get groupID
export async function getChatMsg(GroupId)
{
  var resData = [];

  await axios.get("http://localhost:3000/chat/msges/" + GroupId).then(response =>
  {
    //sss
      const res = response.data;
      resData.push(res);
      
      
    
  }).then(x=>{
    //console.log(id);
    
  });
  return resData;
}

//function to get group Id by student registation number
export async function getGroupByReg(regId){
  var data = [];
  await axios.get('http://localhost:3000/groups/getById/' + regId).then(response => {
    data = response.data;
  })
  return data;
}

//function to get group Id by student registation number
export async function getGroupById(regId){
  var data = [];
  await axios.get('http://localhost:3000/chat/msges/' + regId).then(response => {
    data = response.data;
  })
  return data;
}

//function to add group
export async function CreateChat(Chat)
{

  await axios.post("http://localhost:3000/chat/new", Chat).then(response =>
    {
    const data = response.data;
    console.log(data)
      
    });
}

export default {CreateChat, getGroupByReg, getGroupById};