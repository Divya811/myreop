var express=require('express');
var app=express();
app.use(express.static(__dirname + '/public'));
app.use(express.static('public'));
var un,uc;
var ps;
// var name="";s
var n;
var newuser;
var newps;
var conps;

var forname;
var forpwd;




var bodyParser = require('body-parser') ;

app.use(bodyParser.urlencoded({
    extended: true
}));  



app.get('/home',function(req,res){
	
	res.sendFile(__dirname+'/home.html');

});

app.get('/login',function(req,res){
	res.sendFile(__dirname+'/login.html');
});

app.get('/forpas',function(req,res){
	res.sendFile(__dirname+'/forpas.html');
});

app.get('/blog',function(req,res){
	res.sendFile(__dirname+'/blog.html');
});

app.get('/signup',function(req,res){
	res.sendFile(__dirname+'/signup.html');
});


var MongoClient = require('mongodb').MongoClient;
 var url="mongodb://datauser:datauser@ds061076.mlab.com:61076/det";

MongoClient.connect(url, function(err, db) {
      
      uc=db.collection('collect');
		console.log("connected");
  
});
   app.post('/home',function(req,res){

		un=req.body.user;
		console.log("un val"+un);
		ps=req.body.pass;
	   	uc.find({username:un,password:ps}).toArray(function(err,docs){

	   		if (docs.length>0) {

	   			console.log("valid");
	   			res.redirect('/blog');
	   		}
	   		else{
	   			console.log("invalid");
	   			res.redirect('/login');
	   		}

	   });
		
});

   app.post('/newdata',function(req,res){

   	n=req.body.newname;
	newuser=req.body.uname;
	newps=req.body.pwd;
	conps=req.body.cpwd;

   	if (newps===conps) {
		uc.find({username:newuser,password:newps}).toArray(function(err,docs){
				if (docs.length==0) {
			  		
						uc.insert({username:newuser,password:newps});
			  		
			  			res.redirect('/login');
			  	}
			  	else{
			  		console.log("hey")
			  		res.redirect('/signup');
			  	}

  	 		});
		}
	else{
		console.log("password didn't match");
		res.redirect('/signup');
	}

	});

   app.post('/sgb',function(req,res){

   	forname=req.body.nm;
   	un=req.body.user;
   	forpwd=req.body.new;//password
	console.log(un);
	console.log(forname);
  
   		uc.update({'username':forname},{$set:{'password':forpwd}});

   		res.redirect('/login');
	

   });


    app.post('/backhome',function(req,res){

    	res.redirect('/home');
    });

app.listen(3000);

	
	
