import Koa from "koa";
import bodyParser from "koa-bodyparser";
import usersRouter from "./router/users.router.js";
import cors from '@koa/cors'
import serve from "koa-static";
import koaRouter from 'koa-router'; // importing Koa-Router
import publicationRouter from "./router/publication.router.js";
import groupsRouter from "./router/groups.router.js";
import chatRouter from "./router/chat.router.js";
import topicRouter from "./router/topics.router.js";
import studentsubmissionsRouter from "./router/studentsubmission.router.js";
import panelRouter from "./router/panel.router.js";
import markingRouter from "./router/marking.router.js";
import submissionsRouter from "./router/submissiontype.router.js";
import path from "path";

const PORT = process.env.PORT || 3000
import addMarks from "./router/addMarks.router.js";

const app = new Koa();
const router = new koaRouter()
const __dirname = path.resolve();
// Step 1:
app.use(serve(path.join(__dirname, "../client/build")));
// Step 2:
router.get((":splat*"), function (request, response) {
  response.sendFile(path.join(__dirname, "../client/build", "index.html"));
});
app.use(bodyParser());
app.use(serve('./uploads/publications'));
app.use(cors());
app.use(serve('./uploads/studentsubmissions'));

app.use(router.routes()).use(router.allowedMethods());
app.use(usersRouter.routes()).use(usersRouter.allowedMethods());
app.use(chatRouter.routes()).use(chatRouter.allowedMethods());
app.use(topicRouter.routes()).use(topicRouter.allowedMethods());
app.use(publicationRouter.routes()).use(publicationRouter.allowedMethods());
app.use(groupsRouter.routes()).use(groupsRouter.allowedMethods());
app.use(studentsubmissionsRouter.routes()).use(studentsubmissionsRouter.allowedMethods());
app.use(panelRouter.routes()).use(panelRouter.allowedMethods());
app.use(markingRouter.routes()).use(markingRouter.allowedMethods());
app.use(submissionsRouter.routes()).use(submissionsRouter.allowedMethods());
app.use(addMarks.routes()).use(addMarks.allowedMethods());

app.use(ctx =>
{
    ctx.set("Content-Type", "text/html");
    ctx.body = '<h1>No data is available1</h1>'
});

app.listen(PORT, () =>
{
    console.log(`App running on port ${PORT}!`);
})