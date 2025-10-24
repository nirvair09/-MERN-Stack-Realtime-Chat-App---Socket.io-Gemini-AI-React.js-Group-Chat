import passport from "passport";
import { Env } from "./config/env.config";
import { asyncHandler } from "./middlewares/asyncHandler.middleware";
import { HTTPSTATUS } from "./config/http.config";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import connectDatabase from "./config/database.config";
import { initializeSocket } from "./lib/socket";
import routes from "./routes";
import { Express } from "express";
import "./config/passport.config";

const app=express();
const server=Http2ServerRequest.createServer(app);

initializeSocket(server);

app.use(express.json({limit:"15mb"}));
app.use(cookieParser());
app.use(express.urlendcoded({extended:true}));
app.use(
    cors({
        origin:Env.FRONTEND_ORIGIN,
        credential:true
    })
);

app.use(passport.initialize());

app.get(
    "/health",
    asyncHandler(async(req:Request,res:Response)=>{
        res.status(HTTPSTATUS.OK).json({
            message:"Server is healtyy",
            status:"OK",
        })
    })
);

app.use("/api",routes);


if(Env.NODE_ENV==="production"){
    const clientPath=path.resolve(__dirname,"../../client/dist");

    app.use(express.static(clientPath));
    app.get(/^(?!\/api).*/, (req: Request, res: Response) => {
    res.sendFile(path.join(clientPath, "index.html"));
  });
}


app,use(errorHandler);

server.listen(Env.PORT,async()=>{
    await connectDatabase();
    console.log(`Server is listening at Port:${Env.PORT} in ${Env.NODE_ENV} mode`);
});