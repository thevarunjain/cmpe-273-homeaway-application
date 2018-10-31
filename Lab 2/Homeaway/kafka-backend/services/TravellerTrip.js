
var { owner } = require("../../Backend/models/owner");
var { traveller } = require("../../Backend/models/traveller");
require("../../Backend/Database/mongoose");
    
function handle_request(msg, callback){
console.log("In traveller trip handle request of kafka")
  
console.log(msg);    
    var arr = [ ];
    traveller.find({email : msg}, {properties : 1 ,_id : 0 }).then((result)=>{
      if(result!= null){
        result.map((data)=>{
            data.properties.map((prop)=>{
                console.log(prop);
                arr.push(prop)
            })
            });

            console.log("..............",arr);
            console.log("Property Found");
              callback(null,arr)      // data to be sent backwards

           res.writeHead(200,{
               'Content-Type' : 'application/json'
           })
           res.end(JSON.stringify(arr));
        }else{
            console.log(result)
            console.log("No property found");
        }
        
        })

    }
exports.handle_request = handle_request;
