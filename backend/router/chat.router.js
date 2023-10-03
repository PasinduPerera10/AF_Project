import Router from "@koa/router"
import { createMsg, getMsg } from "../api/chat.api.js";

const chatRouter = new Router(
    {
        prefix: '/chat'
    }
);

chatRouter.post('/new', async(ctx) =>
{
    console.log("here");
    const chat = await ctx.request.body;

    console.log(chat);
    
    const addedGroup = await createMsg(chat);

    if(addedGroup){
        ctx.body = addedGroup;
        ctx.set('Content-Type', 'application/json');
        ctx.status = 201;
    }else{
        ctx.body = 'db err';
        ctx.set('Content-Type', 'application/json');
       
    }
    
});

chatRouter.get('/msges/:groupId', async(ctx) =>
{
    const groupId = ctx.params.groupId;
    
    
    const res = await getMsg(groupId);

    if(res){
        ctx.body = res;
        ctx.set('Content-Type', 'application/json');
        ctx.status = 200;
    }else{
        ctx.body = 'db err';
        ctx.set('Content-Type', 'application/json');
       
    }
    
});

export default chatRouter;