song2Status = "";
song1Status = "";

song1 = "";
song2 = "";
punhoDireitoX = 0;
punhoDireitoY = 0;
punhoEsquerdoX = 0;
punhoEsquerdoY = 0;
placarPunhoEsquerdo = 0;
placarPunhoDireito = 0;

function preload() {
    song1.loadSound("music.mp3");
    song1.loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    song1Status = song1.isPlaying();
    song2Status = song2.isPlaying();
    stroke("#000000");

    if (placarPunhoEsquerdo > 0.2) {
        circle(punhoEsquerdoX, punhoEsquerdoY, 20);
        song1.stop();
        if (song2Status == false) {
            song2.play();
            document.getElementById("nome").innerHTML = "Tocando Música do Harry Potter";
        }
    }

    if (placarPunhoDireito > 0.2) {
        circle(punhoDireitoX, punhoDireitoY, 20);
        song2.stop();
        if (song1Status == false) {
            song1.play();
            document.getElementById("nome").innerHTML = "Tocando Música do Petter Pan";
        }
    }
}


function modelLoaded() {
    console.log("Posenet foi Inicializado");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

        placarPunhoEsquerdo = results[0].pose.keypoints[9].score;
        console.log(placarPunhoEsquerdo);

        punhoDireitoX = results[0].pose.rightWrist.x;
        punhoEsquerdoX = results[0].pose.leftWrist.x;
        punhoDireitoY = results[0].pose.rightWrist.y;
        punhoEsquerdoY = results[0].pose.leftWrist.y;
        console.log(punhoDireitoX, punhoDireitoY);
        console.log(punhoEsquerdoX, punhoEsquerdoY);
    }
}