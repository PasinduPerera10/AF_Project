import axios from "axios";


//function to get groups
export async function getGroups()
{
  var data = [];

  await axios.get("http://localhost:3000/panel/Groups").then(response =>
  {
    data = response.data;
  }).then(x=>{
    
  });
  return data;
}

//function to get panelmembers
export async function getPanelMembers()
{
  var data = [];

  await axios.get("http://localhost:3000/panel/").then(response =>
  {
    data = response.data;
  }).then(x=>{
    
  });
  return data;
}


//function to add group
export async function assignGroup(id,data)
{
var dataa = [];
  await axios.put("http://localhost:3000/panel/assign/" + id, data).then(response =>
    {
    const data = response.data;
    console.log(data)
    dataa.push(data);
    });

    return dataa;
}