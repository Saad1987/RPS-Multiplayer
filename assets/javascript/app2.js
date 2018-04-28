$(document).ready(function () {

  var players = [];
  var space = $("<br>");
  var divPlayer1 = $("#player1Choice");
  var divPlayer2 = $("#player2Choice");
  var player1 = null;
  var player1wins;
  var player1losses;
  var player2wins;
  var player2losses;
  var player2 = null;

  var userName;
  var player1Choice;
  var player2Choice;

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB26d7-Pgge-v9q196_fUlR5UQ_TaYrs5s",
    authDomain: "rps-multiplayer-e0d46.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-e0d46.firebaseio.com",
    projectId: "rps-multiplayer-e0d46",
    storageBucket: "rps-multiplayer-e0d46.appspot.com",
    messagingSenderId: "462121332610"
  };
  firebase.initializeApp(config);


  function Welcoming(Append, player, number) {

    Append.empty();
    var displayName = $("<div>").html("<h3> Welcome ! " + player + " <br /> You are player " + number + " </h3>")
    Append.append(displayName)

  }

  function waiting1(player) {

    $("#waitingScreen").text("It's your turn : " + player.name);
  }


  function waiting2(player) {

    $("#waitingScreen").text("Please wait, it's : " + player.name + " turn");
  }

  function createPanelChoice(Append, player) {

    Append.empty();

    var r = $("<div>").text("Rock").attr("data-name", "Rock").addClass("panelChoice text-center");
    var p = $("<div>").text("Paper").attr("data-name", "Paper").addClass("panelChoice text-center");
    var s = $("<div>").text("Scissors").attr("data-name", "Scissors").addClass("panelChoice text-center");

    Append.append(r, p, s);


  }



  function dispChoice(Append, player, choice) {

    Append.empty();

    var divChoice = $("<div>").text(choice).addClass("text-center big");

    Append.append(divChoice);

  }

  function updateWL() {

    $("#wl1").text("Wins : " + player1wins + " Losses : " + player1losses).addClass("text-center wl");
    $("#wl2").text("Wins : " + player2wins + " Losses : " + player2losses).addClass("text-center wl");
  }

  function rpsCompare(choice1, choice2) {

    if (choice1 === choice2) {

      $("#status").text("Tie Game !").addClass("centered text-center big");

    }

    if (choice1 === "Scissors") {

      if (choice2 === "Rock") {

        $("#status").text(player2.name + " wins !").addClass("centered text-center big");
        player2wins++;
        player1losses++;
        updateWL();

      }
      if (choice2 === "Paper") {

        $("#status").text(player1.name + " wins !").addClass("centered text-center big");
        player1wins++;
        player2losses++;
        updateWL();

      }

    }

    if (choice1 === "Paper") {

      if (choice2 === "Scissors") {

        $("#status").text(player2.name + " wins !").addClass("centered text-center big");
        player2wins++;
        player1losses++;
        updateWL();
      }
      if (choice2 === "Rock") {

        $("#status").text(player1.name + " wins !").addClass("centered text-center big");
        player1wins++;
        player2losses++;
        updateWL();
      }

    }

    if (choice1 === "Rock") {

      if (choice2 === "Paper") {

        $("#status").text(player2.name + " wins !").addClass("centered text-center big");
        player2wins++;
        player1losses++;
        updateWL();
      }
      if (choice2 === "Scissors") {

        $("#status").text(player1.name + " wins !").addClass("centered text-center big");
        player1wins++;
        player2losses++;
        updateWL();
      }

    }


  }

  // Create a variable to reference the database.
  var database = firebase.database();

  database.ref("turn").set(0);

  // Retreiving infos
  database.ref().on("value", function (snapshot) {

    if (snapshot.child("Players/1").exists()) {


      player1 = snapshot.child("Players/1").val();
      $("#player1").html("<h3>★" + player1.name + "★</h3>");
      // database.ref("Players/1/wins").set(player1wins);
      // database.ref("Players/1/losses").set(player1losses);

      // $("#wl1").text("Wins : " + player1.wins + " Losses : " + player1.losses).addClass("text-center wl");



    }

    else {
      player1 = null;
      $("#player1").html("<h3> Waiting for Player 1 to join </h3>");
      player1wins = 0;
      player1losses = 0;
      $("#wl1").empty();
    }

    if (snapshot.child("Players/2").exists()) {


      player2 = snapshot.child("Players/2").val();
      $("#player2").html("<h3>★" + player2.name + "★</h3>");

      // database.ref("Players/2/wins").set(player2wins);
      // database.ref("Players/2/losses").set(player2losses);

      // $("#wl2").text("Wins : " + player2.wins + " Losses : " + player2.losses).addClass("text-center wl");

    }

    else {
      player2 = null;
      $("#player2").html("<h3> Waiting for Player 2 to join </h3>");
      player2wins = 0;
      player2losses = 0;
      $("#wl2").empty();
    }

    if (((snapshot.child("Players/2/choice").exists()) && (snapshot.child("Players/1/choice").exists())) && (snapshot.child("turn").val() === 3)) {

      player1Choice = snapshot.child("Players/1/choice").val();
      player2Choice = snapshot.child("Players/2/choice").val();

      if ((userName === player1.name)) {
        divPlayer2.text(player2.choice).addClass("text-center big");

      }

      if ((userName === player2.name)) {
        divPlayer1.text(player1.choice).addClass("text-center big");

      }



      rpsCompare(player1Choice, player2Choice);
      console.log("This is immer :" + player1wins, player1losses, player2wins, player2losses);




      // }

      function set1() {

        $("#status").empty();
        if ((userName === player1.name)) {
          divPlayer2.empty();
        }

        if ((userName === player2.name)) {
          divPlayer1.empty();
        }
        database.ref("turn").set(1);
        database.ref("Players/1/wins").set(player1wins);
        database.ref("Players/1/losses").set(player1losses);
        database.ref("Players/2/wins").set(player2wins);
        database.ref("Players/2/losses").set(player2losses);
      }

      // setTimeout(resetDiv,4900);
      setTimeout(set1, 5000);



    }

  });


  database.ref("turn").on("value", function (snapshot) {
    //Pretty much all the game displays and gathering infos from players


    if ((player1 && player2) && (snapshot.val() === 1)) {


      updateWL();
      divPlayer2.empty();
      if ((userName === player1.name)) {


        createPanelChoice(divPlayer1, player1);
        waiting1(player1);

        $(document).on("click", ".panelChoice", function () {

          var choice = $(this).attr("data-name");
          player1Choice = choice;
          dispChoice(divPlayer1, player1, player1Choice);
          database.ref("Players/1/choice").set(player1Choice);
          waiting2(player2);
          database.ref("turn").set(2);


        });

      }

      else if ((userName === player2.name)) {
        waiting2(player1);

      }

    }



    if ((player1 && player2) && (snapshot.val() === 2)) {
      //
      if ((userName === player2.name)) {

        console.log("Second Turn");
        createPanelChoice(divPlayer2, player2);
        waiting1(player2);

        $(document).on("click", ".panelChoice", function () {

          var choice = $(this).attr("data-name");
          player2Choice = choice;
          dispChoice(divPlayer2, player2, player2Choice);
          database.ref("Players/2/choice").set(player2Choice);
          database.ref("turn").set(3);



        });

      }

    }
    // /!\ Doesn't want to execute !!
    // /!\ Doesn't want to execute !! snapshot.child("1/choice").exists())
    // /!\ Doesn't want to execute !!
    if ((player1 && player2) && (snapshot.val() === 3)) {

      console.log("third outer turn : " + player1Choice, player2Choice);
    }

  });

  database.ref("Players/1").on("value", function (snapshot) {

    wins = snapshot.child("/wins").val();
    losses = snapshot.child("/losses").val();
    console.log("Player 1 info w/l : " + wins, losses)
    $("#wl1").text("Wins : " + wins + " Losses : " + losses).addClass("text-center wl");


  });

  database.ref("Players/2").on("value", function (snapshot) {

    wins = snapshot.child("/wins").val();
    losses = snapshot.child("/losses").val();
    console.log("Player 2 info w/l : " + wins, losses)
    $("#wl2").text("Wins : " + wins + " Losses : " + losses).addClass("text-center wl");

  });




  //The beguining of the GAME !
  $("#Start").on("click", function () {


    if ((player1) && (!player2)) {




      userName = $("#pseudoname").val().trim();
      namePlayer2 = $("#pseudoname").val().trim();
      var hideButton = $("#nameInput");
      database.ref("Players/2/name").set(namePlayer2);
      database.ref("Players/2/wins").set(0);
      database.ref("Players/2/losses").set(0);
      player2wins = 0;
      player2losses = 0;
      Welcoming(hideButton, namePlayer2, "2");
      database.ref("Players/2").onDisconnect().remove();



    }

    else if (((!player1) && (!player2)) || ((!player1) && (player2))) {


      userName = $("#pseudoname").val().trim();
      namePlayer1 = $("#pseudoname").val().trim();
      var hideButton = $("#nameInput");
      database.ref("Players/1/name").set(namePlayer1);
      database.ref("Players/1/wins").set(0);
      database.ref("Players/1/losses").set(0);
      player1wins = 0;
      player1losses = 0;
      Welcoming(hideButton, namePlayer1, "1");
      database.ref("Players/1").onDisconnect().remove();

    }

    if ((player1) && (player2)) {


      database.ref("turn").set(1);


    }

  

    // Get a key for the join chat entry
    var msg = userName + " has joined!";
		
		
		var chatKey = database.ref().child("/chat/").push().key;

		// Join chat entry
		database.ref("/chat/" + chatKey).set(msg);

		
	});


database.ref("/chat/").on("child_added", function (snapshot) {
	var chatMsg = snapshot.val();
	var chatEntry = $("<div>").html(chatMsg);


	$("#chatRoom").append(chatEntry);
	$("#chatRoom").scrollTop($("#chatRoom")[0].scrollHeight);
});


database.ref("Players").on("child_removed", function (snapshot) {
	var msg = snapshot.val().name + " has disconnected!";

	// Get a key for the disconnection chat entry
	var chatKey = database.ref().child("/chat/").push().key;

	// Disconnection chat entry
  database.ref("/chat/" + chatKey).set(msg);
  
  if ((!player1) && (!player2)){

    database.ref("/chat/").remove();

  }
});


$("#send").on("click", function (event) {
	event.preventDefault();

	//Valid non empty chat entry from an existing user !
	if ((userName !== "") && ($("#chat-message").val().trim() !== "")) {
	
		var msg = userName + ": " + $("#chat-message").val().trim();
		$("#chat-message").val("");

	
		var chatKey = database.ref().child("/chat/").push().key;

	
		database.ref("/chat/" + chatKey).set(msg);
	}
});

});













