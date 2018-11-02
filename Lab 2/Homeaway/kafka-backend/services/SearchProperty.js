
var { owner } = require("../../Backend/models/owner");
require("../../Backend/Database/mongoose");
    
function handle_request(msg, callback){
console.log("In Search handle request")
    var arr = [ ];
    console.log("Data from Node....\n",msg);
    console.log(msg);
    var dateTo = new Date(msg.dateto);
    var dateFrom = new Date(msg.datefrom);
    console.log("Searching property for",msg.place,dateFrom,dateTo,msg.guest)

    owner.find({ })
     .then((result,err)=>{
         if(result.length != 0 ){
            // console.log("........result",result)
 
             result.map((data)=>{
                data.properties.map((prop)=>{
                   var to = new Date(prop.availto);
                   var from = new Date(prop.availfrom)
                    if(prop.accomodation >= msg.guest && prop.address.toLowerCase().includes(msg.place.toLowerCase()) && to >= dateTo && from <= dateFrom){
                        console.log(prop.headline, from , to);
                        arr.push(prop)
                    }
                });
            })
            console.log("Property Found >>>>>>\n\n",arr);
            callback(null,arr)      // data to be sent backwards
       }else{
         console.log(result)
         callback(null,"No property found")
         console.log("No property found");
       }
     }).catch(e => {
         console.log("In catch error ",e)
     })
    }
exports.handle_request = handle_request;
