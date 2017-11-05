  console.log("Connected and initialize!")

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBWgpWQaX-JOWkxuTp91KBQdT-qiSdOq-Y",
    authDomain: "train-tracker-e3390.firebaseapp.com",
    databaseURL: "https://train-tracker-e3390.firebaseio.com",
    projectId: "train-tracker-e3390",
    storageBucket: "",
    messagingSenderId: "1042138873733"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

$("#submit").on("click", function(event) { 
  event.preventDefault();

var train =  $("#trainName").val().trim();
var whereToGo = $("#destination").val().trim();
var trainTime = $("#firstTrain").val().trim();
var minPerTrain = $("#frequency").val().trim();
var trainFare = $("#fare").val().trim();

var newTrain = {

      trainName: train,
      destination: whereToGo,
      firstTrain: trainTime,
      frequency: minPerTrain,
      fare: trainFare

   
   };
    // Change the HTML to reflect the stored values
      
database.ref().push(newTrain);

console.log(newTrain.trainName);
console.log(newTrain.destination);
console.log(newTrain.firstTrain);
console.log(newTrain.frequency);
console.log(newTrain.fare);

      alert("New Train Added Successfully");
   
      $("#trainName").val("");
      $("#destination").val("");
      $("#firstTrain").val("");
      $("#frequency").val("");
      $("#fare").val("");
});


    
    database.ref().on("child_added", function(childSnapshot, prevChildKey) {
      console.log(childSnapshot.val());
      var train =  childSnapshot.val().trainName;
      var whereToGo = childSnapshot.val().destination;
      var trainTime = childSnapshot.val().firstTrain;
      var minPerTrain = childSnapshot.val().frequency;
      var trainFare = parseInt(childSnapshot.val().fare);
      // var minPerTrain = (y);
     
      console.log(train);
      console.log(whereToGo);
      console.log(trainTime);
      console.log(minPerTrain);
      console.log(trainFare)



    var tFrequency = parseInt(childSnapshot.val().frequency);
    console.log(tFrequency);
    // Time is 3:30 AM
    var firstTime = childSnapshot.val().firstTrain;
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log("First Time Converted " + firstTimeConverted);
    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log("tRemain " + tRemainder);
    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    //   // var monthsWorked = $("");
    //   // var totalBilled = $("");

      


      $("#newTrainTable > tbody").append("<tr><td>" + train + "</td><td>" + whereToGo + "</td><td>" +"$"+ trainFare + "</td><td>" + minPerTrain + "</td><td>" + moment(nextTrain).format("hh:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>"); 
    });

