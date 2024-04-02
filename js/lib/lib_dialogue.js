var canvas = document.getElementById("myDCanvas");
var alphaValue = 0.9
userAnswer = 0;

function myCanvas(imageName, thefunction, sceneText, answerTextOne,answerTextTwo) {
    var ctx = canvas.getContext("2d");
    mystyle = 'position: absolute; left: 20px; top: 100px;';
    document.getElementById("myDCanvas").classList.add('active-modal');
    userAnswer    = 0;
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
        ctx.globalAlpha   = alphaValue;
        ctx.fillStyle     = "white"
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        placeText();
    }
    function returnAnswer() {
        thefunction();
    }
    myCanvas.returnAnswer = returnAnswer;
    function composite() {
        ctx.fillStyle     = "rgb(255, 255, 255)"
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha   = alphaValue;
        ctx.fillStyle     = "white"
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha   = 1;
        ctx.drawImage(img1, imageOffsetX, imageOffsetY);
        ctx.globalAlpha   = alphaValue;
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
        ctx.fillStyle = 'black';
        ctx.font = "15px Calibri";
        const sceneTextArray = sceneText.split("\n");
        const sceneTextLength = sceneTextArray.length;
        const isSingleLine = sceneTextLength === 1;
        let nextLine;
    
        if (isSingleLine) {
            nextLine = sceneText.lastIndexOf(" ", 80);
        }
    
        let sceneLines = 0;
        const sceneOffsetX = img1sizeX + 20;
        const sceneOffsetY = 40;
        ctx.globalAlpha = 1;
    
        while (sceneLines < sceneTextLength) {
            ctx.fillText(sceneTextArray[sceneLines], sceneOffsetX, sceneOffsetY + sceneLines * 20);
            sceneLines++;
        }
    
        const buttonsOffsetY  = sceneOffsetY + sceneLines * 20 + 20;
        const buttonOneLength = answerTextOne.length * 7.5 + 20;
        const buttonTwoLength = answerTextTwo.length * 7.5 + 20;
        ctx.fillStyle = '#bbc2c9';

        const buttonOneOffsetX = img1sizeX + imageOffsetX + 10;
        const buttonTwoOffsetX = buttonOneOffsetX + buttonOneLength + 50;

        ctx.globalAlpha = alphaValue;
        ctx.fillRect(buttonOneOffsetX, buttonsOffsetY, buttonOneLength, 20);
    
        if (answerTextTwo !== '') {
            ctx.fillRect(buttonTwoOffsetX, buttonsOffsetY, buttonTwoLength, 20);
        }
    
        ctx.fillStyle = 'black';
        ctx.globalAlpha = 1;
        ctx.fillText(answerTextOne, buttonOneOffsetX + 5, buttonsOffsetY + 14);
        ctx.fillText(answerTextTwo, buttonTwoOffsetX + 5, buttonsOffsetY + 14);
        
    }
    
    canvas.addEventListener("touchstart", tap);
    canvas.addEventListener("mousedown", tap);
}
function clearCanvas() {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    myCanvas.returnAnswer();
}

function raiseQuestion(imageSrc = 'trapdoor.png') {
    myCanvas('Would you like to cruelly execute your fellow citizen in front of townsfolk,\n my lord?',
        'Yessss, in the most bloody way!', 'No', imageSrc);
}

function raiseQuestionImageless() {
    raiseQuestion('');
}

let answer = 0;

function getElementPosition(element) {
    let pos = {
        x: element.offsetLeft,
        y: element.offsetTop
    };
    let parent = element.offsetParent;
    while (parent) {
        pos.x += parent.offsetLeft;
        pos.y += parent.offsetTop;
        parent = parent.offsetParent;
    }
    return pos;
}

function tap(e) {
    const pos = getElementPosition(canvas);
    const loc = {};
    const tapX = e.targetTouches ? e.targetTouches[0].pageX : e.pageX;
    const tapY = e.targetTouches ? e.targetTouches[0].pageY : e.pageY;
    const canvasScaleRatio = canvas.width / canvas.offsetWidth;
    loc.x = (tapX - pos.x) * canvasScaleRatio;
    loc.y = (tapY - pos.y) * canvasScaleRatio;

    const checkButton = (offsetX, length, answer) => {
        return loc.x >= offsetX && loc.x <= offsetX + length &&
            loc.y >= buttonsOffsetY && loc.y <= buttonsOffsetY + 20;
    };

    if (checkButton(buttonOneOffsetX, buttonOneLength, 2)) {
        document.getElementById("myDCanvas").classList.remove('active-modal');
        answer = 2;
        clearCanvas();
        dialogShown = false;
    }

    if (checkButton(buttonTwoOffsetX, buttonTwoLength, 3)) {
        document.getElementById("myDCanvas").classList.remove('active-modal');
        answer = 3;
        clearCanvas();
        dialogShown = false;
    }
}
