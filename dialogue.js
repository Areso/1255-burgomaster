var canvas = document.getElementById("myDCanvas");
function myCanvas(sceneText,answerTextOne,answerTextTwo,imageName) {
    var ctx = canvas.getContext("2d");
    mystyle = 'position: absolute; left: 20px; top: 100px; border:1px solid black;';
    document.getElementById("myDCanvas").style=mystyle+'z-index:99';
    img1sizeX     = 0;
    img1sizeY     = 0;
    imageOffsetX  = 10;
    imageOffsetY  = 30;
    if (imageName !== '') {
        var src   = imageName;
        img1      = loadImage(src, composite);
    } else {
        ctx.fillStyle     = "rgb(255, 255, 255)"
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.globalAlpha   = 0.8;
        ctx.fillStyle     = "white"
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        placeText();
    }
    function composite() {
        ctx.fillStyle     = "rgb(255, 255, 255)"
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.globalAlpha   = 0.8;
        ctx.fillStyle     = "white"
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha   = 1;
        ctx.drawImage(img1, imageOffsetX, imageOffsetY);
        ctx.globalAlpha   = 0.8;
        img1sizeX         = img1.width;
        img1sizeY         = img1.length;
        placeText();
    }
    function loadImage(src, fonload) {
        var img    = new Image();
        img.onload = fonload;
        img.src    = src;
        return img;
    }
    function placeText() {
        ctx.fillStyle     = 'black';
        ctx.font          = "14px Calibri";
        sceneTextArray    = sceneText.split("\n");
        sceneTextLength   = sceneTextArray.length;
        sceneLines        = 0;
        sceneOffsetX      = img1sizeX + 20;
        sceneOffsetY      = 40;
        ctx.globalAlpha   = 1;
        while (sceneLines < sceneTextLength) {
            ctx.fillText(sceneTextArray[sceneLines], sceneOffsetX, sceneOffsetY + sceneLines*20);
            sceneLines    = sceneLines+1;
        }
        buttonsOffsetY    = sceneOffsetY + sceneLines*20 + 20;
        buttonOneLength   = answerTextOne.length*6 + 20;
        buttonTwoLength   = answerTextTwo.length*6 + 20;
        ctx.fillStyle     = '#bbc2c9';
        buttonOneOffsetX  = img1sizeX + imageOffsetX + 10;
        buttonTwoOffsetX  = buttonOneOffsetX+buttonOneLength + 50;
        ctx.globalAlpha   = 0.8;
        ctx.fillRect(buttonOneOffsetX, buttonsOffsetY, buttonOneLength, 20);
        ctx.fillRect(buttonTwoOffsetX, buttonsOffsetY, buttonTwoLength, 20);
        ctx.fillStyle     = 'black';
        ctx.globalAlpha   = 1;
        ctx.fillText(answerTextOne,buttonOneOffsetX+5,buttonsOffsetY+14);
        ctx.fillText(answerTextTwo,buttonTwoOffsetX+5,buttonsOffsetY+14);
    }
    canvas.addEventListener("touchstart", tap);
    canvas.addEventListener("mousedown", tap);
    count = 0;
}

window.onload = load;
function load() {
}

function raiseQuestion() {
    myCanvas('Would you like to cruelly execute your fellow citizen in front of townsfolk,\n my lord?',
        'Yessss, in the most bloody way!','No', 'trapdoor.png');
}
function raiseQuestionImageless () {
    myCanvas('Would you like to cruelly execute your fellow citizen in front of townsfolk,\n my lord?',
        'Yessss, in the most bloody way!','No', '');
}
count = 0;
answer = 0;
function getElementPosition (element) {
    //thanks to William Alone
    var parentOffset,
        pos = {
            x: element.offsetLeft,
            y: element.offsetTop
        };

    if (element.offsetParent) {
        parentOffset = getElementPosition(element.offsetParent);
        pos.x += parentOffset.x;
        pos.y += parentOffset.y;
    }
    return pos;
}
function tap (e) {
    pos = getElementPosition(canvas);
    loc = {};
    tapX = e.targetTouches ? e.targetTouches[0].pageX : e.pageX;
    tapY = e.targetTouches ? e.targetTouches[0].pageY : e.pageY;
    canvasScaleRatio = canvas.width / canvas.offsetWidth;
    loc.x = (tapX - pos.x) * canvasScaleRatio;
    loc.y = (tapY - pos.y) * canvasScaleRatio;
    console.log(loc.x, loc.y);
    if (loc.x >= buttonOneOffsetX && loc.x <= buttonOneOffsetX+buttonOneLength) {
        if (loc.y >= buttonsOffsetY && loc.y <= buttonsOffsetY+20) {
            console.log("first button pressed");
            document.getElementById("myDCanvas").style=mystyle+'z-index:-2';
            userAnswer = 0;
        }
    }
    if (loc.x >= buttonTwoOffsetX && loc.x <= buttonTwoOffsetX+buttonTwoLength) {
        if (loc.y >= buttonsOffsetY && loc.y <= buttonsOffsetY+20) {
            console.log("second button pressed");
            document.getElementById("myDCanvas").style=mystyle+'z-index:-2';
            userAnswer = 1;
        }
    }

}