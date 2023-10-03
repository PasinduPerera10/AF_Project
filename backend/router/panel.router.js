import Router from "@koa/router"
import { getAllPanelMembers, getGroup, assignPanel, getAllGroups } from "../api/panel.api.js";

const panelRouter = new Router(
    {
        prefix: '/panel'
    }
);


panelRouter.get('/', async ctx=>{
    ctx.body= await getAllPanelMembers();
    ctx.set('Content-Type', 'application/json');
    ctx.status = 201;
})

panelRouter.get('/Groups', async ctx=>{
    ctx.body= await getAllGroups();
    ctx.set('Content-Type', 'application/json');
    ctx.status = 201;
})

panelRouter.get('/getGroup/:id', async ctx=>{
    const id = ctx.params.id;
    ctx.body= await getGroup(id);
    ctx.set('Content-Type', 'application/json');
    ctx.status = 201;
})

panelRouter.put('/assign/:id', async(ctx) =>
{
    const id = ctx.params.id;
    const data = await ctx.request.body;
    console.log(data)
    
    const panelassign = await assignPanel(id,data);
    try{
        ctx.body = panelassign;
        ctx.set('Content-Type', 'application/json');
        ctx.status = 201;
    }catch(e){
        ctx.body = {err:e};
        ctx.set('Content-Type', 'application/json');
        ctx.status = 201;
    }
    
});

export default panelRouter;