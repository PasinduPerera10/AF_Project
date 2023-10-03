import { v4 as uuidv4 } from 'uuid';
import { save, login, getAll, getById, removeById, update} from '../dao/users.dao.js';




//function for registering
export const addUser = async(user) =>
{

    const newUser = {
        name: user.name,
        email: user.email,
        username:user.username,
        password: user.password,
        role: user.role,
        reg: user.reg
    };
    const result = await save(newUser);
    console.log(result)
    return result;
};



//function for login
export const loginuser = async (user) =>
{

    const userlogin = {
        email:user.email,
        password:user.password
    };
    const result = await login(userlogin);
    return result;

    
}

export const getAllUsers = () =>
{
    return getAll();
}

export const deleteUser = async id =>
{
    return await removeById(id);
}

        export const getUser = async id => {
            return await getById(id);
        }

        export const updateUser = async (id, user)=>{
            return await update({id}, user);
        }

export default {addUser, loginuser, getAllUsers, getUser, deleteUser, updateUser};