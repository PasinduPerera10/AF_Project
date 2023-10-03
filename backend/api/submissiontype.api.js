import { save, getAll, removeById, getById, update} from '../dao/submissiontypes.dao.js';

const submissiontypes = new Map();

const defaultSubmission =
{
    title: "Title1",
    desc: "Description1",
    deadline:"2022-05-27",
};

const defaultSubmission2 =
{
    title: "Title2",
    desc: "Description2",
    deadline:"2022-05-29"
};

submissiontypes.set(defaultSubmission.desc, defaultSubmission);
submissiontypes.set(defaultSubmission2.desc, defaultSubmission);

export const addSubmission = async(submissiontype) =>
{

    const newSubmission = {
        title: submissiontype.title,
        desc: submissiontype.desc,
        deadline:submissiontype.deadline
    };
    const result = await save(newSubmission);
    console.log(result)
    return result;
};

export const getAllSubmissions = () =>
{
    return getAll();
}

export const deleteSubmission = async id =>
{
    return await removeById(id);
}

export const getSubmission = async(id) => {
    return await getById(id);
}

export const updateSubmission = async (id, submissiontype)=>{
    return await update({id}, submissiontype);
}

export default {addSubmission, getAllSubmissions, deleteSubmission, getSubmission, updateSubmission};