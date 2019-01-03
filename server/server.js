const path=require('path');
const express=require('express');
const port=process.env.PORT||3000;
PublicPath=path.join(__dirname,'../public');
var app=express();
app.use(express.static(PublicPath));
app.listen(port,()=>{
	console.log(`Server is up and running on ${port}`);
})