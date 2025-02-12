import { createServer } from 'node:http';
import fsPromises from "node:fs/promises";
import fs from 'node:fs';

let count = 0;

//server sent events SSE
const server = createServer(async (req,res)=>{
    if(req.url==="/"){

        const htmlPage = fs.createReadStream('./websitefile/stream.html')
        htmlPage.pipe(res);
        
    } else if(req.url==='/stream'){
        res.writeHead(200,{
            'content-type':'text/event-stream',
            'cache-control':'no-cache',
            connection: 'keep-alive'
            })    
        }  
        setInterval(()=>{
            res.write(`data: the count is ${count++}\n\n`)
            },1000)   
    }
);

// const server = createServer(async (req,res)=>{
//     // console.log("request received");


//     //routing using req.url
//     if(req.url ==="/"){

//     //synchronus method using nopde:fs
//     // const data = fs.readFile('./websitefile/index.html')

//     //asyncronus method for html file using node:fs/promises
//     // const data = await fs.readFile('./websitefile/index.html')

//     // res.end(data);

//     //create stream: data comes in chunk(used in large files)
//     const datastream = fs.createReadStream('./websitefile/index.html');

//     datastream.on('data',(chunk)=>{
//         res.write(chunk)
//     })

//     datastream.on('end',()=>{
//         res.end();
//     })

//     datastream.pipe(res)

//     res.writeHead(200,{'content-type':'text/html'});
//     }

//     if(req.url==='/about'){
//     res.writeHead(200,{'content-type':'text/html'});

//     res.end('<h1>this is about page</h1>');
//     }

//     if(req.url==='/contact'){
//     res.writeHead(200,{'content-type':'text/html'});
    
//     res.end('<h1>this is contact page</h1>');
//     }

//     //create API
//     if(req.url==='/expanses'){
//         //API
//         //Create and expanse
//         //POST

//         if(req.method === 'POST'){
//             //read data from request
//             let buff = '';
//             req.on('data',(chunk)=>{
//                 // console.log('chunk',chunk); //get look chunk content

//                 buff = buff + chunk.toString();
//             });

//             req.on('end',async ()=>{
//                 //read data from db.json file
//                 const data = await fsPromises.readFile('./db.json');
//                 //convert data into object
//                 const dbData = JSON.parse(data);
//                 //push data to object
//                 dbData.push(JSON.parse(buff))
//                 //store data in json database
//                 //write to db.json file
//                 await fsPromises.writeFile('./db.json',JSON.stringify(dbData,null,2));

//                 res.end('OK')

//             })
//         }else if(req.method === 'GET'){
//             //read data from json database
//             const data = await fsPromises.readFile('./db.json');
//             //return data to client
//             res.end(data);
//         }
//     }

    
// });

//http://localhost:3000

server.listen(3000,()=>{
    console.log("server is listening 3000")
});