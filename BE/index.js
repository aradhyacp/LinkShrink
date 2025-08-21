import express from "express"
import {z} from "zod" 
import dotenv from 'dotenv';
import cors from 'cors';
import { nanoid } from "nanoid";
import { createClient } from "@supabase/supabase-js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);


app.use(cors())
app.use(express.json())





const urlSchema = z.object({
    url: z.url({error: "Invalid URL format send correct url"}),
    customCode: z.string().regex(/^[a-zA-Z0-9_-]{3,20}$/, {
      message: "Custom code must be 3-20 characters, letters/numbers/-/_ only.",
    }).optional(),
})

app.get("/",(req,res)=>{
    res.json({
        message: "server spinning good"
    })
})

app.post("/shorten",async (req,res)=>{
    const validation = urlSchema.safeParse(req.body)

    if(!validation.success){
        return res.status(400).json({
            error: z.prettifyError(validation.error)
        })
    }

    const {url, customCode} = validation.data
    let code = customCode || nanoid(6);

    const {data:existing, error: checkError } = await supabase.from('urlshortener').select('id').eq("id",code).single();

    if (existing) {
    return res.status(409).json({ error: "Short code already in use." });
    }

    const forwarded = req.headers['x-forwarded-for'];
    const ip = typeof forwarded === 'string' ? forwarded.split(',')[0] : req.socket.remoteAddress;


    const {error: insertError } = await supabase.from("urlshortener").insert([
        {
            id: code,
            url: url,
            created_ip_address: ip
        }
    ]);

    if (insertError) {
    return res.status(500).json({ error: "Failed to shorten URL." });
    }


    return res.status(201).json({
        shorten_url: `http://localhost:3000/s/${code}`,
        original_url: url
    })
})

app.get("/s/:code",async (req,res)=>{
    const code = req.params.code;
    const {data,error} = await supabase.from("urlshortener").select("url").eq("id",code).single();
    console.log(data);
    

    if(!data || error){
        return res.status(404).json({
            error: "Shorten URL not found"
        })
    }

    return res.redirect(data.url)
});

app.use((req,res,next)=>{
    res.status(404).json({ message: "Route not found" });
})

app.listen(PORT,()=>{
    console.log(`server is running healthy on -> http://localhost:${PORT}`);
    
})