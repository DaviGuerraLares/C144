var img = ""
objects = []
modelStatus = ""
function preload() {
    img = loadImage("luffy zoro e sanji.jpg")
}
function setup() {
    canvas = createCanvas(500, 750)
    canvas.center()
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "detectando personagens e objetos"
}
function modelLoaded() {
    console.log("Modelo Carregado")
    modelStatus = true
    objectDetector.detect(img, gotResults)
}
function gotResults(error, results) {
    if (error) {
        console.log(error)
    }
    console.log(results)
    objects = results
}
function draw() {
    image(img, 0, 0, 500, 750)
    if (modelStatus != "") {
        for (var i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "o personagem foi detectado"
            fill("blue")
            percent = floor(objects[i].confidence * 100)
            text (objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15)
            noFill()
            stroke("blue")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
        }
    }
}