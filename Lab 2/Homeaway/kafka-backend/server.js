var connection =  new require('./kafka/Connection');
//topics files
//var signin = require('./services/signin.js');
var SearchProperty = require('./services/SearchProperty');
var TravellerTrip = require('./services/TravellerTrip');
var TravellerProfile = require('./services/TravellerProfile');
var TravellerProfilePost = require('./services/TravellerProfilePost');
var ListProperty = require('./services/ListProperty');
var TravellerSignUp = require('./services/TravellerSignUp');
var TravellerAccountEmail = require("./services/TravellerAccountEmail");
var TravellerAccountPassword = require("./services/TravellerAccountPassword");
var BookProperty = require("./services/BookProperty")

function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('Server is running ');
    consumer.on('message', function (message) {
        console.log('Message received for topic :- ' + topic_name)
        console.log(fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('After resolving Handle....\n\n',res)
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}

handleTopicRequest("search_property",SearchProperty);
handleTopicRequest("traveller_trip",TravellerTrip);
handleTopicRequest("traveller_profile",TravellerProfile);
handleTopicRequest("traveller_profile_post",TravellerProfilePost);
handleTopicRequest("list_property",ListProperty);
handleTopicRequest("traveller_sign_up",TravellerSignUp);
handleTopicRequest("traveller_account_email",TravellerAccountEmail);
handleTopicRequest("traveller_account_password",TravellerAccountPassword);
handleTopicRequest("book_property",BookProperty);

