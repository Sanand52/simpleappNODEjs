//using inbuilt module
import os from 'node:os';
//using third-party module
import chalk from 'chalk';

// console.log("cpus: ", os.cpus().length);

// console.log("totalmem: ", os.totalmem()/(1024*1024*1024));

// console.log("freemem: ", os.freemem()/(1024*1024*1024));

// console.log("uptime: ", os.uptime()/(60*60));

// console.log("hostname: ", os.hostname());

// console.log("user info: ", os.userInfo());

// console.log("Arch ", os.machine());

function moniter() {

    const oldCpus = os.cpus();

    // console.log("old", oldCpus);

    setTimeout(() => {
        const newCpus = os.cpus();

        const usage = newCpus.map((newCpu, i) => {
            return{
                core: i,
                usage: calculateCPU(oldCpus[i], newCpus[i])+' %',
            }
        });

        console.clear()

        console.log(chalk.bgMagenta(`=========system stats=========`))

        console.table(usage)

        const usedMemory= (os.totalmem() - os.freemem())/(1024*1024*1024)

        console.log(
            "Memory Used:",
            usedMemory > 10 ?
                chalk.redBright(`${usedMemory.toFixed(2)} GB/${(os.totalmem()/(1024*1024*1024)).toFixed(2)} GB`)
            : chalk.greenBright(`${usedMemory.toFixed(2)} GB/${(os.totalmem()/(1024*1024*1024)).toFixed(2)} GB`)
        )

        // console.log(
        //     `Memory Used: ${usedMemory.toFixed(2)} GB/${(os.totalmem()/(1024*1024*1024)).toFixed(2)} GB`
        // )

    }, 1000);
}

//for refreshing data of moniterfunction 
export default function systemstats() {

    setInterval(moniter,1000)
}

function calculateCPU(oldCpus, newCpus){
    const oldTotal = Object.values(oldCpus.times).reduce((a,b)=>a+b);
    const newTotal = Object.values(newCpus.times).reduce((a,b)=>a+b);

    const idle = newCpus.times.idle - oldCpus.times.idle;

    const total = newTotal - oldTotal;

    const used = total - idle;

    return((used/total)*100).toFixed(2); 

}



/*
{
    model: '12th Gen Intel(R) Core(TM) i5-12450H',
    speed: 2496,
    times: { user: 53734, nice: 0, sys: 29062, idle: 5404265, irq: 2156 }
  },
  {
    model: '12th Gen Intel(R) Core(TM) i5-12450H',
    speed: 2496,
    times: { user: 34265, nice: 0, sys: 16953, idle: 5435187, irq: 1687 }
  },
*/