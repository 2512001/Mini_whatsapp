const express = require('express');
const app =  express();
const mongoose = require('mongoose');
const path =  require('path');
var methodOverride = require('method-override')
 
// override with the X-HTTP-Method-Override header in the request

const Chat = require('./model/chat.js');

let chat1 = new Chat({

    from: 'deepak',
    to: 'mira',
    msg: 'i baby how are you i love you',
    created_at: new Date().toUTCString()    
   
});


// chat1.save()
//     .then((data) => {
//         console.log(data);
//     })
//     .catch((error) => {
//         console.error('Error saving chat:', error);
//     });

//path and use line
app.set('views' ,  path.join( __dirname , 'views'));
app.set('view engine' , 'ejs');
app.use(express.static(path.join(__dirname , 'public')));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride('_method'));


//mongodb and mongoose
main()
.then(()=>{
console.log('database is connected');
})
.catch(err => console.log(err));

async function main() {

  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


//port
let port  = 8080;

app.listen(port , ()=>{
    console.log('application is running on port '  +  port);
});


//request method

app.get('/' ,  (req , res)=>{
    console.log('root working fine');
    res.send('root is working good and correct');
})

app.get('/chat' , async (req , res)=>{

 let data =  await  Chat.find();

 res.render('index.ejs' , {data});
  
   
    
});

app.get('/chat/new' , (req , res)=>{
    res.render('new.ejs');
})

app.post('/chat' , (req ,res)=>{
  let {from ,  to , msg } = req.body;

  console.log(req.body);
  
  let newchat = new Chat({
    from : from,
    to : to,
    msg  : msg,
    created_at: new Date().toUTCString() 
  })

  newchat.save()
  .then(()=>{
    console.log("chat is saved");
  }).
  catch((err)=>{
    console.log(err);
  });

  res.redirect('/chat');


})

//edit chat
app.get('/chat/:id/edit' , async (req , res)=>{

           let id =  req.params.id;
        let data = await Chat.findById(`${id}`)
          .then((data)=>{
            return data;
          })
          .catch((err)=>{
            console.log(err);
          })
          
res.render('edit.ejs' , {data});

})

//update route
app.put('/chat/:id' , async(req ,  res) =>{
   
 
     const { message } =  req.body;
     let {id} = req.params;
   let data = await  Chat.findByIdAndUpdate(id , { msg : message } , { runValidators : true , new : true});
   if(data){
    console.log('msg is updated');
    res.redirect('/chat');
   }

})

app.delete('/chat/:id' ,  async(req ,  res)=>{
             let {id} = req.params;
           let data= await Chat.findByIdAndDelete(id , { new : true });
          if(data)
          {
            console.log("chat is deleted");
            res.redirect('/chat');

          }

})
