const mongoose = require('mongoose');
const chat = require('./model/chat');

main().
then(()=>{
    console.log('database is connected');
})
.catch((err)=>{
    console.local(err+"this is error");
})

async function main()
{
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

}

let allchats = [
    {
        from : 'deepak',
        to : 'mayra',
        msg : 'me tujhe camp me itna chodunga to ro dengi',
        created_at: new Date().toUTCString()  
    },
    {
        from : 'mayra',
        to : 'deepak',
        msg : 'yes baby i want fuck me hard deep that make me cry',
        created_at: new Date().toUTCString()  
    },
    {
        from : 'deepak',
        to : 'mayra',
        msg : 'teri chut fat jayengi',
        created_at: new Date().toUTCString()  
    },
    {
        from : 'deepak',
        to : 'mayra',
        msg : 'or lund bhi fas jayega teri chut me itna bada hai mera lunda',
        created_at: new Date().toUTCString()  
    },
    {
        from : 'mayra',
        to : 'deepak',
        msg : 'chalega i wanna vahi to majha hai you fuck my mouth also everything that you want baby fuck my chut chod chod meri chut me chale patak dena ',
        created_at: new Date().toUTCString()  
    },
    {
        from : 'deepak',
        to : 'mayra',
        msg : 'ok baby maja ayenga teri chut fat ke lal ho jayengi to kal teri chut royengi or tero gand avaj lagayengi pak pak pak pakka puk tu chilayegi o ya oya fuck me ',
        created_at: new Date().toUTCString()  
    },

    
];

chat.insertMany(allchats);