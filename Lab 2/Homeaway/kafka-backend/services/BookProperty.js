var { owner } = require("../../Backend/models/owner");
var { traveller } = require("../../Backend/models/traveller");
require("../../Backend/Database/mongoose");
    
function handle_request(msg, callback){

    console.log("\nIn Book property handle request\n")

    var availfrom = msg.availfrom;
    var availto = msg.availto;
    var propid = msg.id; //uuvid
    var owneremail = msg.owneremail;
    var travelleremail = msg.travelleremail;
    var headline =  msg.headline

    console.log(msg);

    var property = {                                //to travellers table 
         bookedfrom : msg.availfrom,
         bookedto : msg.availto,
         propid : msg.id, //uuvid
         owneremail : msg.owneremail,
         headline :  msg.headline
    }

    var p = {                                       //to owners table 
        bookedfrom : msg.availfrom,
        bookedto : msg.availto,
        bookedby : travelleremail
        // propid : msg.id, //uuvid
        // owneremail : msg.owneremail
   }

    traveller.findOneAndUpdate({email : travelleremail}, {$push : { properties :  property}}).then((result)=>{
        if(result!= undefined){
            console.log("Property booked by  !!", travelleremail)
            console.log("........................",result);
            res.status(200).json({ success : true, body : "Property booked Successfully"}).end("Booked Sucessfully");
        }else{
            console.log("Error in Booking property :( ",result);
           // callback(null,result)
            
        }
    })

    owner.findOneAndUpdate({"properties.propid" : propid},{ $push : {"properties.$.booking" : p}}).then((result)=>{
        if(result!= undefined){
            console.log("Property Listed !!")
            console.log("........................",result);
          //  res.status(200).json({ success : true, body : "Property listed Successfully"}).end("Posted Sucessfully");
        }else{
            console.log("Error in listing property :( ",result);
        }
    })
}
exports.handle_request = handle_request;
