import Router from "@koa/router"
import { getAllSubmissions,getSubmission } from "../api/submissiontype.api.js";
import { save, getAllMarks } from "../dao/addMark.dao.js";

const addMarks = new Router(
    {
        prefix: '/addMarks'
    }
);

addMarks.post('/get', async(ctx) => {

    const result = await getAllMarks();
    ctx.body = result;
    ctx.status = 201;

});

addMarks.post('/save', async(ctx) => {
    const data = await ctx.request.body;

    const marking = {
        submissionId: data.submissionsId,
        pointMarks: data.pointMarks,
    };

    const result = await save(marking);
    ctx.body = result;
    ctx.status = 201;

});

export default addMarks;