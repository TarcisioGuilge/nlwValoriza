import  {Router} from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAtuhenticated } from "./middlewares/ensureAuthenticated";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { ListUserReceiverComplimentsController } from "./controllers/ListUserReceiverComplimentsController";
import { ListUserSenderComplimentsController } from "./controllers/ListUserSenderComplimentsController";
import { ListTagsController } from "./controllers/ListTagsController";
import { ListUsersController } from "./controllers/ListUsersController";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserReceiverComplimentsController = new ListUserReceiverComplimentsController();
const listUserSenderComplimentsController = new ListUserSenderComplimentsController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();


router.post("/users", createUserController.handle)

router.post("/tags", ensureAtuhenticated,ensureAdmin,createTagController.handle)

router.post("/login", authenticateUserController.handle)

router.post("/compliment", ensureAtuhenticated, createComplimentController.handle)

router.get("/users/compliments/receive", ensureAtuhenticated,listUserReceiverComplimentsController.handle)

router.get("/users/compliments/send", ensureAtuhenticated,listUserSenderComplimentsController.handle)

router.get("/tags", ensureAtuhenticated,listTagsController.handle)

router.get("/users", ensureAtuhenticated,listUsersController.handle)


export{router}