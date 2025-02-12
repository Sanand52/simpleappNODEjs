//user defined module
export default function greeting(){
    const x = process.argv[2];

    let name;

    x? name=x: name=""
    
    let hours = new Date().getHours();

    if(hours < 12){
        return `Good Morning ${name}`;
    }
    if(hours >= 12 && hours < 17){
        return `Good Afternoon ${name}`;
    }
    if(hours >= 17 && hours < 19){
        return `Good Evening ${name}`;
    }
    return `Good Night ${name}`;
}

