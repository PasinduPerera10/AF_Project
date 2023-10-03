import axios from "axios";
import { getGroupByReg } from "./group.apicall";

//function to register new topic
export async function newTopic(topicData){


    var data1 = []

    await axios.post("http://localhost:3000/topics/new",topicData).then((response) => {
        data1 = response.data;
        console.log(data1);

        
            alert("Result: "+data1);
        
        try{
            data1.push(data1);
        }catch(e){}
        
    })

    return data1;
}

//function to get all topics
export async function getTopics()
{
    var items = [];
    await axios.get("http://localhost:3000/topics/").then((response) => {
        const data = response.data;
        const keys = Object.keys(data);
        for (var x in data) {
          items.push({
            _id: data[x]._id,
            groupid: data[x].groupid,
            topic: data[x].topic,
            description: data[x].description,
            status: data[x].status,
            supervisor: data[x].supervisor,
            cosupervisor: data[x].cosupervisor
          });

        
        }
    });
    return items;
}

//function to update topics
export async function updateTopicsts(id,status)
{
    var data = '';
    await axios.put("http://localhost:3000/topics/update/" + id, status).then((response) => {
        data = response.data;
    });
    window.location.href='/panel/evTopics';
    return data;
}

export async function banTopicsts(topic)
{
    var data = '';
    await axios.post("http://localhost:3000/topics/ban/" , topic).then((response) => {
        data = response.data;
    });
    window.location.href='/panel/evTopics';
    return data;
}



//add supervisor details to topic
export async function updateSupervisor(update)
{
    var data=null;
    
    await axios.put("http://localhost:3000/topics/supervisor" , update).then((response) => {
        data = response.data;

        try{
            if(data.modifiedCount==1){
                alert("Accepted!");
            }else{
                alert("Error occured!");
            }
        }catch(e){}
    });
    
    return data;
}

//function to get topic details of the group id
export async function getTopicByGroupId(groupid)
{
    const group=groupid[0].groupId
    

    var data = null;
    await axios.get("http://localhost:3000/topics/group/"+group).then((response) => {
        data = response.data;
        console.log(data);
        
    });
    return data;
}





export default {getTopics, updateTopicsts, banTopicsts, newTopic, updateSupervisor, getTopicByGroupId};