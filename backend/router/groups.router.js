import Router from "@koa/router"
import { createGroup, getGroupByRegApi } from "../api/groups.api.js";
import { groupCount } from "../dao/groups.dao.js";

const groupsRouter = new Router(
    {
        prefix: '/groups'
    }
);

groupsRouter.post('/', async(ctx) =>
{
    console.log("here");
    const group = await ctx.request.body;

    console.log(group);
    
    const addedGroup = await createGroup(group);

    if(addedGroup){
        ctx.body = addedGroup;
        ctx.set('Content-Type', 'application/json');
        ctx.status = 201;
    }else{
        ctx.body = 'db err';
        ctx.set('Content-Type', 'application/json');
       
    }
    
});

groupsRouter.get('/counter', async(ctx) =>
{
    console.log("counter");
    
    
    const counter = await groupCount();

    if(counter){
        ctx.body = counter;
        ctx.set('Content-Type', 'application/json');
        ctx.status = 200;
    }else{
        ctx.body = 'db err';
        ctx.set('Content-Type', 'application/json');
       
    }
    
});

groupsRouter.get('/getById/:regId', async(ctx) =>
{
    const regId = ctx.params.regId;
    
    
    const res = await getGroupByRegApi(regId);

    if(res){
        ctx.body = res;
        ctx.set('Content-Type', 'application/json');
        ctx.status = 200;
    }else{
        ctx.body = 'db err';
        ctx.set('Content-Type', 'application/json');
       
    }
    
});

export default groupsRouter;