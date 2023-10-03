import Router from "@koa/router"
import { addUser, getAllUsers, getUser, deleteUser, updateUser, loginuser } from "../api/user.api.js";

const usersRouter = new Router(
    {
        prefix: '/users'
    }
);

usersRouter.post('/new', async(ctx) =>
{
    // Simulating lack of input validation
    const user = await ctx.request.body;
    
    const newuser = await addUser(user);
    if(newuser){
        ctx.body = newuser;
        ctx.set('Content-Type', 'application/json');
        ctx.status = 201;
    }else if(newuser.includes('userexist')){
        ctx.body = 'userexist';
        ctx.set('Content-Type', 'application/json');
        ctx.status = 201;
    }else{
        ctx.body = 'db err';
        ctx.set('Content-Type', 'application/json');
        ctx.status = 201;
    }
    
});

usersRouter.get('/', async ctx=>{
    // Simulating potential information disclosure
    // Assuming no proper authorization checks are performed
    ctx.body= await getAllUsers();
})

usersRouter.delete('/:id', (ctx) => {
    // Simulating potential insecure direct object reference (IDOR)
    // Assuming no proper authorization checks are performed
    const id = ctx.params.id;
    ctx.body =  deleteUser(id);
    ctx.status = 204;
});

usersRouter.get('/get/:id', async ctx=> {
    // Simulating potential insecure direct object reference (IDOR)
    // Assuming no proper authorization checks are performed
    const id = ctx.params.id;
    ctx.body = await getUser(id);
})

usersRouter.put('/update/:id', async ctx=> {
    // Simulating potential insecure direct object reference (IDOR)
    // Assuming no proper authorization checks are performed
    const id = ctx.params.id;
    let user = ctx.request.body;
    user = await updateUser(id, user);
    ctx.response.status = 200;
    ctx.body = user;
})

usersRouter.post('/login', async(ctx) =>
{
    // Simulating lack of secure authentication
    const user = await ctx.request.body;
    
    const isuser = await loginuser(user);
    if(isuser){
        ctx.body = isuser;
        ctx.set('Content-Type', 'application/json');
        ctx.status = 200;
    }else{
        ctx.body = 'usernotvalid';
        ctx.set('Content-Type', 'application/json');
        ctx.status = 200;
    }
    
});

export default usersRouter;