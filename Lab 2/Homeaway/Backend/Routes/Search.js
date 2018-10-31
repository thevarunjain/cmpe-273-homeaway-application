var express = require('express');
 var router = express.Router();

router.post('/search', function(req,res){
    console.log("Searching in Database"); 
    console.log(req.body); 

    var place = req.body.place;
    var dateTo = new Date(req.body.dateto);
    var dateFrom = new Date(req.body.datefrom);
    var guest = req.body.guest;
    
    kafka.make_request('search_property',req.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("Inside else");
            res.writeHead(200,{
                'Content-Type' : 'application/json'
                })
                res.end(JSON.stringify(results));
                // res.end();
            }
        
    });

//     var arr = [ ];
//    console.log(place,dateFrom,dateTo,guest)
//    console.log(place)
//     place = place.toLowerCase();
//     console.log(place)
    
//    owner.find({ })
//     .then((result,err)=>{
//         if(result.length != 0 ){
//             console.log("........result",result)

//         result.map((data)=>{
//             data.properties.map((prop)=>{
//                var to = new Date(prop.availto);
//                var from = new Date(prop.availfrom)
//                 if(prop.accomodation >= guest && prop.address.toLowerCase().includes(place.toLowerCase()) && to >= dateTo && from <= dateFrom){
//                     console.log(prop.headline, from , to);

//                     arr.push(prop)
//                 }

//             });
//         })
//              console.log("dddddddddddddddd",arr);
//              console.log("Property Found");
//             res.writeHead(200,{
//                 'Content-Type' : 'application/json'
//             })
//             res.end(JSON.stringify(arr));
//         //    console.log(JSON.stringify(arr));
//       }else{
//         console.log(result)
//         console.log("No property found");
//       }
//     })
})


module.exports = router;