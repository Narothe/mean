import App from './app';
import IndexController from "./controllers/index.controller";
import DataController from "./controllers/data.controller";
import PostController from "./controllers/post.controller";

const app: App = new App([
    new IndexController(),
    new DataController(),
    new PostController()
]);

app.listen();
