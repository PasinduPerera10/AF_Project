import Router from "@koa/router"
import { addStudentSubmission, getAllStudentSubmissions, deleteStudentSubmission, getStudentSubmission, updateStudentSubmission } from "../api/studentsubmission.api.js";
import koaBusboy from "koa-busboy";
import fs from 'fs';
import { getAllSubmissions } from "../api/submissiontype.api.js";
import { getGroupByRegApi } from "../api/groups.api.js";
import { findRecords } from '../dao/studentsubmissions.dao.js';

const uploader = koaBusboy({
    dest: './uploads/studentsubmissions/'
})

const studentsubmissionsRouter = new Router(
    {
        prefix: '/studentsubmissions'
    }
);

studentsubmissionsRouter.post('/new',uploader, async(ctx) =>
{
    const data = await ctx.request.body;
    const saveFileName = './uploads/studentsubmissions/' + Math.floor(Math.random() * 1000) 
                        + ctx.request.files[0].filename;

                        const studentsubmission = {
                            groupid: data.groupid,
                            topic: data.topic,
                            uploaddate: data.uploaddate,
                            file: saveFileName,
                            assignmentId: data.assignmentId,
                            assignmentTitle: data.assignmentTitle,
                        };
                    
                        console.log(ctx.request.body);
                    
                        fs.rename(ctx.request.files[0].path,saveFileName, function (err) {    
                            console.log("renamed!");    
                        });
    const newstudentsubmission = await addStudentSubmission(studentsubmission);
    if(newstudentsubmission){
        ctx.body = newstudentsubmission;
        ctx.set('Content-Type', 'application/json');
        ctx.status = 201;
    }else if(newstudentsubmission.includes('userexist')){
        ctx.body = 'userexist';
        ctx.set('Content-Type', 'application/json');
        ctx.status = 201;
    }else{
        ctx.body = {err:'db err'};
        ctx.set('Content-Type', 'application/json');
        ctx.status = 201;
    }
});

studentsubmissionsRouter.get('/get', async(ctx) => {
    const result = await getAllSubmissions();
    ctx.body = result;
    ctx.status = 201;
});

studentsubmissionsRouter.get('/', async ctx=>{
    ctx.body= await getAllStudentSubmissions();
})

studentsubmissionsRouter.delete('/:id', (ctx) => {
    const id = ctx.params.id;
    ctx.body =  deleteStudentSubmission(id);
    ctx.status = 204;
});

studentsubmissionsRouter.get('/filterByGroup/:regId', async ctx=>{
    const regId = ctx.params.regId;
    const reg = await getGroupByRegApi(regId);
    const sub = await findRecords({groupid:reg[0].groupId+""});
    ctx.body= sub;
})

studentsubmissionsRouter.get('/get/:id', async ctx=> {
    try{
        const id = ctx.params.id;
        const data = await getStudentSubmission(id);
        if(data!==null){
            ctx.body = data;
            ctx.set('Content-Type', 'application/json');
            ctx.status = 200;
        }else{
            ctx.body = {data:'nodata'};
            ctx.set('Content-Type', 'application/json');
            ctx.status = 200;
        }
        
    }catch(e){
        ctx.body = await e;
        ctx.set('Content-Type', 'application/json');
        ctx.status = 200;
    }
})

studentsubmissionsRouter.put('/update/:id', async ctx=> {
    const id = ctx.params.id;
    let studentsubmission = ctx.request.body;
    ctx.body = await updateStudentSubmission(id,studentsubmission);
    ctx.response.status = 200;
    ctx.body = studentsubmission;
})

export default studentsubmissionsRouter;
