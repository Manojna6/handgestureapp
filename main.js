//https://teachablemachine.withgoogle.com/models/nYcSyhH-T/
Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
});


Webcam.attach('#webcam');
function take_snapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("picturediv").innerHTML = '<img id="capture_image" src="'+data_uri+'"/>';
    });
}
console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/nYcSyhH-T/model.json', modelLoaded);
function modelLoaded(){
    console.log("model loaded");
}
function check() {
    console.log('check');
    img=document.getElementById("capture_image");
    classifier.classify(img, gotResult);
}
function gotResult(error, results) {
    console.log(results);
    if(error){
        console.log(error);
    } else {
        prediction = results[0].label;
        console.log(prediction);
        document.getElementById("prediction").innerHTML=prediction;
        if (prediction == 'ILY') {
        emoji = 'ILY' + '&#129311;';
        } else if (prediction == 'NO') {
        emoji = 'NO' + '&#128078;';
        } else if (prediction == 'YES'){
        emoji = 'YES' + '&#128077;';
        } else if (prediction == 'RESTROOM'){
        emoji = 'RESTROOM' + '&#9970;';
        } else if (prediction == 'STOP'){
        emoji = 'STOP' + '&#128400;';
            } else if (prediction == 'ME TOO'){
        emoji = 'ME TOO' + '&#128076;';
        } else if (prediction == 'HELP'){
        emoji = 'HELP' + '&#10071;';
        }

    }
}
function speak() {
    var synth = window.speechSynthesis;
    speak_data = "The prediction is "+prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}