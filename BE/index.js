import express from "express"
import {z} from "zod" 
import dotenv from 'dotenv';
import cors from 'cors';
import { nanoid } from "nanoid";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

const urlMap = {}

const urlSchema = z.object({
    url: z.url({error: "Invalid URL format send correct url"})
})

app.get("/",(req,res)=>{
    res.json({
        message: "server spinning good"
    })
})

app.post("/shorten",(req,res)=>{
    const validation = urlSchema.safeParse(req.body)

    if(!validation.success){
        return res.status(400).json({
            error: "zod throw error",
            zoderror: z.prettifyError(validation.error)
        })
    }

    const {url} = validation.data

    let code = nanoid(6);

    urlMap[code] = url

    return res.json({
        shorten_url: `http://localhost:3000/s/${code}`,
        url: url
    })
})

app.get("/s/:code",(req,res)=>{
    const code = req.params.code;
    const originalUrl = urlMap[code]

    if(!originalUrl){
        return res.status(404).json({
            error: "Shorten URL not found"
        })
    }

    return res.redirect(originalUrl)
});

app.use((req,res,next)=>{
    res.status(404).json({ message: "Route not found" });
})

app.listen(PORT,()=>{
    console.log(`server is running healthy on -> http://localhost:${PORT}`);
    
})