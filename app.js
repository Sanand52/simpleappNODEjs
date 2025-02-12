import { menu } from './fileManager.js';
import greeting from './greeting.js';
import systemstats from './moniter.js';
import moniter from './moniter.js';

//Using user defined module
// console.log(greeting());  //node app.js "John" => Good Morning John 

//Using Node's inbuilt module 
// console.log(systemstats()); //system tracking fuction 

//file manager app get functions from fileManagerfn
console.log(menu());
