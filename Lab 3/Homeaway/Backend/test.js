var assert = require("assert");
var supertest = require("supertest");
var should = require("should");
var server = supertest.agent("http://18.221.109.234:3001");


// //Test case 1
// //Get Traveller Trips
it("Test should return trip for a particular Traveller ", function(done) {
    server
      .get("/TravellerTrip")
      .query({"id":"varunsj18@gmail.com"})
      .expect("Content-type", /json/)
      .expect(200)
      .end(function(err, res) {
       console.log("Status: ", res.status);
       console.log("Status: ", JSON.stringify(res));

       res.status.should.equal(200);
        done();
      });
  });

//   //Test case-2 -traveler login
  it("should validate traveler with given credentials", function(done) {
    server
      .post("/TravellerLogin")
      .send({"email": "varunsj18@gmail.com", "password": "varunJain" })
      .expect(200)
      .end(function(err, res) {
        console.log("Status: ", res.status);
        console.log("Logged in Successfully");
        res.status.should.equal(200);
        done();
      });
  });


// //Test-Case 3 Owner Login

  it("should log in owner to backend", function(done) {
    server
      .post("/OwnerLogin")
      .send({
        "email": "shubhamsand@gmail.com",
        "password": "sand"
      })
      .expect("Content-type", /plain/)
      .expect(200)
      .end(function(err, res) {
        console.log("Status: ", res.status);
        console.log("Logged in Successfully");
        res.status.should.equal(200);
        done();
      });
  });

//   //Test case-4 --get reply

  it("should get reply for traveller question", function(done) {
    server
      .get("/GetReply")
      .query({ "id" : "varunsj18@gmail.com"  
      })
      .expect("Content-type", /json/)
      .expect(200)
      .end(function(err, res) {
        console.log("Status: ", res.status);
        console.log(JSON.stringify(res));
       res.status.should.equal(200);
        done();
      });
  });

// // Test case-5--Book property

  it("should change email address", function(done) {
    server
      .post("/TravellerAccountEmail")
      .send({
        oldemail : "varunsj18@gmail.com",
        newemail : "varunsj18@gmail.com",
      })
      .expect("Content-type", /plain/)
      .expect(200)
      .end(function(err, res) {
       console.log("Status: ", res.status);
       console.log("Changed Succesfully");

        done();
      });
  });