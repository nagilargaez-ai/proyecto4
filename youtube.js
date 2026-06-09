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

const API_KEY = "AIzaSyA-P3EVgCGz25BdhgkR0kJPebhPFpQ1_xk";


let user_name =
localStorage.getItem("user_name");

document.getElementById("user_name").innerHTML =
"¡Hola " + user_name + "!";


function buscarVideos()
{
    let texto =
    document.getElementById("search").value;

    fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${texto}&maxResults=10&type=video&key=${API_KEY}`
    )

    .then(response=>response.json())

    .then(data=>{

        document.getElementById("videos").innerHTML="";

        data.items.forEach(video=>{

            let videoId =
            video.id.videoId;

            let titulo =
            video.snippet.title;

            document.getElementById("videos").innerHTML +=

            `
            <div class="video-card">

            <h3>${titulo}</h3>

            <iframe
            src="https://www.youtube.com/embed/${videoId}"
            allowfullscreen>
            </iframe>

            <br><br>

            <button
            class="btn btn-danger"
            onclick="guardarFavorito('${videoId}','${titulo}')">

            ❤️ Guardar

            </button>

            </div>
            `;

        });

    });
}

function guardarFavorito(videoId,title)
{
    firebase.database()
    .ref("favoritos/"+user_name)
    .push({

        videoId:videoId,
        title:title

    });

    alert("Video guardado");
}

function verFavoritos()
{
    firebase.database()
    .ref("favoritos/"+user_name)

    .once("value")

    .then(function(snapshot){

        document.getElementById("videos").innerHTML="";

        snapshot.forEach(function(child){

            let data =
            child.val();

            document.getElementById("videos").innerHTML +=

            `
            <div class="video-card">

            <h3>${data.title}</h3>

            <iframe
            src="https://www.youtube.com/embed/${data.videoId}"
            allowfullscreen>
            </iframe>

            </div>
            `;

        });

    });
}


