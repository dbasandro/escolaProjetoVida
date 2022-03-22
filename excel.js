var express = require('express');
var app = express();
var http = require('http').Server(app);

//This will add button to link to your download page
//res.sendfile(link of html file in your pc)

app.get('/',function(req,res){ 
  res.sendFile('/home/prateek/Documents/nodejs/open_genus/download_server/html_file.html');
})
app.get('/download',function(req,res){
    res.download(__dirname +'/ichigo.jpeg','ichigo.jpeg');
})
http.listen(3000,function(){
    console.log('Server is live on server ' + 3000);
})