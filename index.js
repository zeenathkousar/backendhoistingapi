const express=require('express');
const app=express();
const data=require('./coursedata.json');
const fs=require('fs');
const port=process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.send('hello working api')
})

app.get('/read',(req,res)=>{  
    res.send(data);
})

app.post("/create",(req,res)=>{
    const body=req.body;
    data.push({...body, id:data.length+1});
    console.log(data);
    fs.writeFile('./coursedata.json',JSON.stringify(data),(err,d)=>{
        res.send('post req');
   
    })

})



//dynamic routing - 
app.get('/read/:id',(req,res)=>{
    const identitynumber=Number(req.params.id);
   const u=data.find((u)=>u.id === identitynumber);
    res.send(u)
})

//update 
app.patch('/upd/:id',(req,res)=>{
    const identitynumber=Number(req.params.id);
    const u=data.find((u)=>u.id === identitynumber); 
    u.first_name= 'RESTAPI';
    fs.writeFile('./coursedata.json',JSON.stringify(data),(err,data)=>{
        res.send(data);
})

})
 
app.delete('/del/:id',(req,res)=>{
    const identitynumber=Number(req.params.id);
    const u=data.find((u)=>u.id === identitynumber);

   const var1= delete data[identitynumber-1];
   if(var1===true){
    fs.writeFile('./coursedata.json',JSON.stringify(data),(err,data)=>{
        res.json({status:"successdeleted", data: data});

    })

   }
   else{
    res.send('error in deleting that object')

   }

})
    

app.listen(port,()=>{
    console.log('server started')
})