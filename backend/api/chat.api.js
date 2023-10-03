import { save, getChatMsg } from '../dao/chat.dao.js'


//function for creating group
export const createMsg = async(data) =>
{
    const newChat = {
        text:data.text,
        createdAt:data.createdAt,
        groupId:data.groupId,
        user:data.user
    }
    const result = await save(data.text,data.createdAt,data.groupId,data.user);
    console.log(result)
    return result;
};

//function for getting group detials using register number
export const getMsg = async(groupId) => {
    const result = await getChatMsg(groupId);
    return result;
}

