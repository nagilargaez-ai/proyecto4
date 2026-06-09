//Añade los enlaces de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyACf6Ovi9GA3t-YoSgnFETbLc2T8Bx98mM",
  authDomain: "kwitter-e44be.firebaseapp.com",
  databaseURL: "https://kwitter-e44be-default-rtdb.firebaseio.com",
  projectId: "kwitter-e44be",
  storageBucket: "kwitter-e44be.firebasestorage.app",
  messagingSenderId: "59245417171",
  appId: "1:59245417171:web:e73cdcdcd9a836d2a6ba26"
};

firebase.initializeApp(firebaseConfig);
  user_name = localStorage.getItem("user_name");

document.getElementById("user_name").innerHTML = "¡Hola " + user_name + "!";

function addRoom()
{
  room_name = document.getElementById("room_name").value;

  firebase.database().ref("/").child(room_name).update({
    purpose : "adding room name"
  });

    localStorage.setItem("room_name", room_name);
    
    window.location = "kwitter_page.html";
}

function getData() {  firebase.database().ref("/").on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key;
       Room_names = childKey;
       console.log("Room Name - " + Room_names);
      row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#"+ Room_names +"</div><hr>";
      document.getElementById("output").innerHTML += row;
    });
  });

}

getData();

function redirectToRoomName(name)
{
  console.log(name);
  localStorage.setItem("room_name", name);
    window.location = "kwitter_page.html";
}

function logout() {
localStorage.removeItem("user_name");
localStorage.removeItem("room_name");
    window.location = "index.html";
}
