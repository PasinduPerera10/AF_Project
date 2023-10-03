import Router from "@koa/router"
import koaBusboy from "koa-busboy";
import fs from 'fs';
import { save, getAll, findOneRecord, updateRecord, removeById} from '../dao/publication.dao.js';
import { ObjectId } from "mongodb";

const uploader = koaBusboy({
    dest: './uploads/publications/'
})

const publicationRouter = new Router(
    {
        prefix: '/publication'
    }
);


publicationRouter.post('/add',uploader, async(ctx) => {

    const data = ctx.request.body;

    const saveFileName = Math.floor(Math.random() * 1000) 
                        + ctx.request.files[0].filename;

    const publication = {
        title: data.title,
        desc: data.desc,
        file: saveFileName
    };

    console.log(ctx.request.body);

    fs.rename(ctx.request.files[0].path,'./uploads/publications/'+saveFileName, function (err) {    
        console.log("renamed!");    
    });

    const result = await save(publication);

    ctx.body = result;
    ctx.set('Content-Type', 'application/json');
    ctx.status = 201;

});

publicationRouter.post('/getAll', async(ctx) => {

    const result = await getAll();
    ctx.body = result;
    ctx.status = 201;

});

publicationRouter.get('/findOne', async(ctx) => {
    const result = await findOneRecord(ctx.query.id);
    ctx.body = result;
    ctx.status = 201;
});


publicationRouter.post('/update',uploader, async(ctx) => {

    const data = ctx.request.body;

    const saveFileName = Math.floor(Math.random() * 1000) 
                        + ctx.request.files[0].filename;

    const publication = {
        $set: {
            title: data.title,
            desc: data.desc,
            file: saveFileName
        }
    };

    fs.rename(ctx.request.files[0].path, './uploads/publications/'+saveFileName, function (err) {    
        console.log("renamed!");    
    });

    fs.unlink('./uploads/publications/'+data.efile, function (err) {
        if (err) throw err;
        console.log('File deleted!');
    });

    const query = {_id: ObjectId(data.id)};
    const result = await updateRecord(query,publication);

    ctx.body = result;
    ctx.set('Content-Type', 'application/json');
    ctx.status = 201;

});

publicationRouter.get('/delete', async(ctx) => {

    const delData = await findOneRecord(ctx.query.id);

    fs.unlink('./uploads/publications/'+delData[0].file, function (err) {
        if (err) throw err;
        console.log('File deleted!');
    });

    const result = await removeById(ctx.query.id);
    ctx.body = result;
    ctx.status = 201;
});

export default publicationRouter;