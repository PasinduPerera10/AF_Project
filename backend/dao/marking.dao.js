import client from'./index.js';
const publication = client.db('store').collection('markingScheme')

export async function save ({assignmentType, markingPoints}){
        const result = await publication.insertOne({assignmentType, markingPoints});
        return result.insertedId;
}

export default {save};