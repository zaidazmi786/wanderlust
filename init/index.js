const mongoose =require ("mongoose");
const initdata=require("./data.js");
const listing=require("../models/listing.js");

const url="mongodb://127.0.0.1:27017/wanderlust";
main().then((res)=>{
console.log("connection successful");
}).catch((err)=>{
    console.log(err);
});

async function main(){
  await  mongoose.connect(url);
}

const initdb=async ()=>{
    await listing.deleteMany({});
    initdata.data=  initdata.data.map((obj)=>({...obj,owner:"6a7ac8c508713e5b50b42180"}));
    await listing.insertMany(initdata.data);
console.log("data was initilized")

}
initdb();
