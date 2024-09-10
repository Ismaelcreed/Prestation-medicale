import  express  from "express";
import bodyParser from "body-parser";
import cors from "cors";
import Route from "./routes/post.routes.js";

const app = express();
const port = 8000;
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use("/api",Route);
app.get("/post" , (req ,res) => {
    res.send("Voici les données!")
});

app.listen(port , () => {
    console.log(`Le serveur démarre dans le port: http://localhost: ${port}`)
});
