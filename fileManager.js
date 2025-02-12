import*as readline from 'node:readline/promises'
import { stdin, stdout } from 'node:process'
import chalk from 'chalk'
import {createFile, createFolder, deleteFile, deletefolder, listItems, readFile, writetoFile} from './fileManagerfns/fs.js'

const rl = readline.createInterface({
    input: stdin,
    output: stdout,
})

export async function menu(){

    // console.clear();

    console.log(chalk.blueBright("\n File manager"))

    console.log('================================== \n')
    const options=[
        "create folder",
        "create file",
        "write to file",
        "read file",
        "delete file",
        "delete folder",
        "List Items",
        "Exit"
    ]

    options.forEach((opt,i)=>{
        console.log(chalk.yellow(`${i+1}`)+chalk.white(` ${opt}`))
    })

    const answer = await rl.question(chalk.cyan("\nSelect Option:"))

    switch(answer){
        //create folder on 1 option
        case "1" :
        const folder = await rl.question(chalk.cyan('folder path: '));
        await createFolder(folder)
        console.log(chalk.green("folder created successfully"));
        break;

        //create file on second option
        case "2" :
        const filepath = await rl.question(chalk.cyan('file path: '));
        const content = await rl.question(chalk.cyan('file content: '));
        await createFile(filepath,content);
        console.log(chalk.green("file created successfully"));
        break;

        //write to file on 3 option
        case "3":
        const location = await rl.question(chalk.cyan('file path: '));
        const data = await rl.question(chalk.cyan('file content: '));
        await writetoFile(location,`\n${data}`);
        console.log(chalk.green("file Updated successfully"));
        break;

        //read file on 4 option
        case "4":
        const path = await rl.question(chalk.cyan('file location: '));
        const Filecontent = await readFile(path);
        console.log(chalk.magenta(`File Content\n================\n`)+chalk.green(`${Filecontent}`))
        break;

        //delete filefor 5 option
        case "5":
        const fileLocation = await rl.question(chalk.cyan('file path: '));
        await deleteFile(fileLocation);
        console.log("file deleted successfully");
        break;

        //folder delete for 6 option
        case "6":
        const folderLocation = await rl.question(chalk.cyan('folder path: '));
        await deletefolder(folderLocation);
        console.log("folder deleted successfully")
        break;

        //list items for 7 option
        case "7":
        const fileList = await rl.question(chalk.cyan('file path(enter for current file): '));
        const items = await listItems(fileList || './');
        console.log(chalk.blue('\nContents\n=======\n'));

        items.forEach((i)=>{
            console.log(chalk.yellow(`${i.name}`))
        })
        break;

        //for exit
        case "8":
        rl.close();
        return;
        
        default:
        console.log(chalk.red('Invalid option'))
    }

    //for again view menu
    await rl.question(chalk.grey('\nPress enter to continue....'));
    console.clear();
    menu();
}

// menu()