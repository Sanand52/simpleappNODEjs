//using promises
import*as fs from 'node:fs/promises'
import path from 'node:path'

export async function listItems(pathname='./') {
    const items = await fs.readdir(pathname,{withFileTypes:true})
    return items.map((i)=>{
        return {
            name : i.name,
            type : i.isDirectory() ? 'Folder':'File',
            path : path.join(import.meta.dirname, i.name)
        }
    })
}
export async function createFolder(pathname) {
    await fs.mkdir(pathname,{recursive: true})
}

export async function createFile(pathname,content='') {
    await fs.writeFile(pathname,content)
}

export async function writetoFile(pathname,content='') {
    await fs.appendFile(pathname,content)
}

export async function readFile(pathname) {
    const data = await fs.readFile(pathname,'utf-8');
    // console.log(data)
    return data;
}

export async function deleteFile(pathname) {
    await fs.unlink(pathname)    
}

export async function deletefolder(pathname) {
    await fs.rm(pathname,{recursive: true})
}

async function getFileinfo(pathname){
    const stats = await fs.stat(pathname)

    const data = {
        size : `${(stats.size/1024).toFixed(2)} KB`,
        created : stats.birthtime.toLocaleString(),
        modified : stats.mtime.toLocaleString()
    }

    console.log(data);
}

// getFileinfo('.hellofile.txt')
// deletefolder('./content')
// deleteFile('hellopromise.txt')
// readFile('.hellofile')
// writetoFile('.hellofile','content append')
// createFile('.hellofile','hello file created')
// createFolder('./content')







/*===========================================================*/

// function using promises
// async function createfile(pathname){
//     try {
//     await fs.writeFile(pathname,"hello Anand \n")
//     await fs.appendFile(pathname,"hello node \n")
//     } catch (error) {
//         console.log('error',error)    
//     }

//     console.log("file written")
// }

// createfile('./hellopromise.txt')


/*========================================================*/
//fs means file system
// import*as fs from 'node:fs'

//function using fs
// function createFile(pathname){

//     //sync
//     // fs.writeFileSync(pathname,"hello anand")//it create new file
//     // fs.writeFileSync(pathname,"hello node.js \n")//it replace the previous file (\n) used for next line
//     // fs.appendFileSync(pathname,"hello again")//it append the file add content to prevous file

//     //Async
//     // error first callback
//     // fs.writeFile(pathname,"hello Anand \n", (err)=>{
// //     err ? console.log("something error") 
// //     : console.log("file has been created Asynchronously")
// //     return;
//     // });

//     // fs.appendFile(pathname,"hello node",(err)=>{
// //     err ? console.log("something error")
// //     : console.log("file append asynchronously")
//     // });

//     console.log("file has been created")
// }

// createFile('./hellofs.txt');