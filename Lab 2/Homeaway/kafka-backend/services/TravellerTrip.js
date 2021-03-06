
var { owner } = require("../../Backend/models/owner");
var { traveller } = require("../../Backend/models/traveller");
require("../../Backend/Database/mongoose");
    
function handle_request(msg, callback){
console.log("\nIn Traveller trip handle request")
  
console.log("\nProperties for : ",msg);    
    var arr = [ ];
    traveller.find({email : msg}, {properties : 1 ,_id : 0 }).then((result)=>{
      if(result!= null){
        result.map((data)=>{
            data.properties.map((prop)=>{
                //console.log(prop);
                arr.push(prop)
            })
            });
            console.log("\nProperty Found >>>>>>\n\n",arr);
            callback(null,arr)      // data to be sent backwards
        }else{
           // console.log(result)
            callback(null,"No prop found")
            console.log("No property found");
        }
        
        })

    }
exports.handle_request = handle_request;
