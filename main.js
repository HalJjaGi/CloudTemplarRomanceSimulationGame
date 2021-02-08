//canvas
const canvas = $("#canvas")[0];
const ctx = canvas.getContext("2d");
const canvasBG = $("#canvasBackground")[0];
const ctxBG = canvasBG.getContext("2d");
const canvasP1 = $("#canvasP1")[0];
const ctxP1 = canvasP1.getContext("2d");
const canvasP2 = $("#canvasP2")[0];
const ctxP2 = canvasP2.getContext("2d");
const canvasP3 = $("#canvasP3")[0];
const ctxP3 = canvasP3.getContext("2d");
const canvasP4 = $("#canvasP4")[0];
const ctxP4 = canvasP4.getContext("2d");
const canvasP5 = $("#canvasP5")[0];
const ctxP5 = canvasP5.getContext("2d");
const canvasP6 = $("#canvasP6")[0];
const ctxP6 = canvasP6.getContext("2d");
//etc
let nthOfPlace = 0; // json 장소 몇번째
let nthOfText = 0; // json text 내에서의 몇번째
let length = 0; //텍스트애니메이션에 사용
let num = 1; //텍스트애니메이션에 사용
const textAnimSpeed = 50; //텍스트애니메이션 속도
let whoIsBefore = ["a", "a"]; //방금전까지 말하고 있던사람, 이사람은 다른사람이 말할때 회색빛, 어둡게? 약간 그렇게 보임
let whoIsFocus = ["나", "a"];
let isFirst = true; //첫 실행인지
let resetOn = false;
//json
const mainScript = $("#mainScript");
const script = JSON.parse(mainScript.html());
let scriptShortcut = script.script[nthOfPlace].text[nthOfText];
//textbox
const textBoxHeight = 350;
const textWhoStart = [363, 800];
const textWhoSize = "40";
const textTextStart = [363, 860];
const textTextSize = "30";
const choiceBoxStart = {"up" : [363, 878], "down" : [363, 964]};
const choiceBoxSize = [1194, 66];
const choiceTextStart = {"up" : [960, 911], "down" : [960, 997]};
const choiceTextSize = "30";
//color
const defaultBackground = "#D9F9A5";
const defaultStroke = "#68534D";
const choiceBox = "#F4FEC1";
//choice
let doneChoice = false;
let choiceNum = 0;
let reactionNum = 0;
//etc
let mode = "";
let answer = 2;

window.onload = function () {
    const dummyDiv = $(".forFont");
    dummyDiv.hide();
    

    
    //인물미리 그려놓기
    drawPerson();

    $("#canvasP1").hide();
    $("#canvasP2").hide();
    $("#canvasP3").hide();
    $("#canvasP4").hide();
    $("#canvasP5").hide();
    $("#canvasP6").hide();

    const start = setInterval(playGame, 1);

    //playGame();



};

function playGame() {  

    //canvas 초기화
    ctx.clearRect(0, 0, 1920, 1080);
    //전체배경
    drawBackground();
    //인물
    showPerson();
    //글상자 배경
    drawTextboxBackground();
    //텍스트 출력
    if(scriptShortcut.isChoice) {
        //선택지 있는 텍스트
        drawChoice();
    }
    else {
        //선택지 없는 텍스트
        drawText();
    }
}

function drawBackground() {
    let img = new Image();
    img.src = script.script[nthOfPlace].backgroundPath;
    img.onload = function () {
        ctxBG.drawImage(img, 0, 200, 1920, 1080, 0, 0, 1920, 1080);
    }
}

function drawTextboxBackground() {
    ctx.fillStyle = defaultBackground;
    ctx.fillRect(0, 1080-textBoxHeight, 1920, textBoxHeight);
    ctx.beginPath();
    ctx.moveTo(0, 1080-textBoxHeight-1);
    ctx.lineTo(1920, 1080-textBoxHeight-1);
    ctx.lineWidth = 2;
    ctx.strokeStyle = defaultStroke;
    ctx.stroke();    
}

function drawChoice() {
    if(doneChoice) {
        drawText();
    }
    else {
        //선택지 출력
        //선택지 박스?버튼? 그리기
        ctx.fillStyle = choiceBox;
        ctx.strokeStyle = defaultStroke;
        ctx.fillRect(choiceBoxStart.up[0], choiceBoxStart.up[1], choiceBoxSize[0], choiceBoxSize[1]);
        ctx.strokeRect(choiceBoxStart.up[0], choiceBoxStart.up[1], choiceBoxSize[0], choiceBoxSize[1]);
        ctx.fillRect(choiceBoxStart.down[0], choiceBoxStart.down[1], choiceBoxSize[0], choiceBoxSize[1]);
        ctx.strokeRect(choiceBoxStart.down[0], choiceBoxStart.down[1], choiceBoxSize[0], choiceBoxSize[1]);
        //나머지 텍스트
        ctx.fillStyle = defaultStroke;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = textWhoSize + "pt 'paybooc-Bold'";
        ctx.fillText(scriptShortcut.question, 960, textWhoStart[1]);
        ctx.font = choiceTextSize + "pt 'paybooc-Medium'";
        ctx.fillText(scriptShortcut.choice[0], choiceTextStart.up[0], choiceTextStart.up[1]);
        ctx.font = choiceTextSize + "pt 'paybooc-Medium'";
        ctx.fillText(scriptShortcut.choice[1], choiceTextStart.down[0], choiceTextStart.down[1]);
        ctx.textAlign = "start";
        ctx.textBaseline = "alphabetic";
    }
}

function drawText() {
    //처리하기는 선택지 있는거랑 없는거랑 다 처리하긴 함
    let name;
    let result;
    if(scriptShortcut.isChoice) {
        //선택문일때
        try {
            name = scriptShortcut.reaction[choiceNum][reactionNum].who;
            result = scriptShortcut.reaction[choiceNum][reactionNum].text.slice(0, num);
            if(num == 1) {
                length = scriptShortcut.reaction[choiceNum][reactionNum].text.length;
            }
        } catch (error) {

        }
    }
    else {
        //선택문 아닐때
        name = scriptShortcut.who;
        result = scriptShortcut.text.slice(0, num);
        if(num == 1) {
            length = scriptShortcut.text.length;
        }
    }
    
    ctx.fillStyle = defaultStroke;
    ctx.font = textWhoSize + "pt 'paybooc-Bold'";
    ctx.fillText(name, textWhoStart[0], textWhoStart[1]);
    ctx.font = textTextSize + "pt 'paybooc-Bold'";
    ctx.fillText(result, textTextStart[0], textTextStart[1]);
    if (num != 1) {
        let wakeUpTime = Date.now() + textAnimSpeed;
        while (Date.now() < wakeUpTime) {}
    }
    if(num != length) {
        if(scriptShortcut.isChoice) {
            num+=1;
        }
        else {
            num+=1;
        }
    }
}


//여기 논리를 싹다 고쳐야 할듯
/*
function drawPerson() {

    if(scriptShortcut.isChoice) {

    }
    else {

        if (whoIsFocus[0] == scriptShortcut.who) {

        }
        else {
            whoIsFocus[1] = whoIsFocus[0];
            whoIsFocus[0] = scriptShortcut.who;
        }
    
        if(whoIsFocus[0] == whoIsBefore[0] && whoIsFocus[1] == whoIsBefore[1]) {
        }
        else {
            ctxP.clearRect(0, 0, 1920, 1080);
    
            if(whoIsFocus[0] == "나") {
                let img1 = new Image();
                let img2 = new Image();
                //아직까지는 사람이 '나'랑 '클템'밖에 없어서 이렇게 처리 했지만 나중에 사람이 늘어나면 바꿔야함
                //지금 말하는 사람
                img1.src = "./lib/" + whoIsFocus[0] + ".png";
                img1.onload = function () {
                    callback();
                }
                function callback() {
                    ctxP.filter = "brightness(100%)";
                    ctxP.drawImage(img1, 0, 0, 1920, 1273, 800, 190, 960, 636.5);
    
                }
                //방금 말한 사람
                if(isFirst) {
        
                }
                else {
                    img2.src = "./lib/" + whoIsFocus[1] + ".png";
                    img2.onload = function () {
                        ctxP.filter = "brightness(100%)";
                        ctxP.drawImage(img1, 0, 0, 1920, 1273, 800, 190, 960, 636.5);
                        ctxP.filter = "brightness(50%)";
                        ctxP.drawImage(img, 0, 0, 1920, 1080, 78, 153, 1024, 576);
                    }
                }
            }
            else if (whoIsFocus[0] == "클템"){
                let img1 = new Image();
                let img2 = new Image();
                //아직까지는 사람이 '나'랑 '클템'밖에 없어서 이렇게 처리 했지만 나중에 사람이 늘어나면 바꿔야함
                img1.src = "./lib/" + whoIsFocus[0] + ".png";
                img1.onload = function () {
                    ctxP.filter = "none";
                    ctxP.drawImage(img1, 0, 0, 1920, 1080, 78, 153, 1024, 576);
                }
                //방금 말한 사람
                if(isFirst) {
                    isFirst = false;
                    whoIsFocus[1] = "나";
                }
                img2.src = "./lib/" + whoIsFocus[1] + ".png";
                img2.onload = function () {
                    ctxP.filter = "brightness(50%)";
                    ctxP.drawImage(img2, 0, 0, 1920, 1273, 800, 190, 960, 636.5);
                }
            }
        }
        whoIsBefore[0] = whoIsFocus[0];
        whoIsBefore[1] = whoIsFocus[1];
    }
}
*/

function drawPerson() {
    const source = {
        "img1" : "./lib/나.png",
        "img2" : "./lib/클템.png",
        "img3" : "./lib/smileRB.png",
        "img4" : "./lib/badRB.png"
    };
    let image = {};
    let i = 0;
    for (let src in source) {
        image[src] = new Image();
        image[src].onload = function () {  
            if (++i>=4) {
                callback(image);
            }
        }
        image[src].src = source[src];
    }

    function callback() {  
        //아무무만 나옴
        ctxP1.filter = "brightness(100%)";
        ctxP1.drawImage(image.img1, 0, 0, 1920, 1273, 800, 190, 960, 636.5);
        //클템포커스
        ctxP2.filter = "none";
        ctxP2.drawImage(image.img2, 0, 0, 1920, 1080, 78, 153, 1024, 576);
        ctxP2.filter = "brightness(50%)";
        ctxP2.drawImage(image.img1, 0, 0, 1920, 1273, 800, 190, 960, 636.5);
        //웃는 클템반응
        ctxP3.filter = "none";
        ctxP3.drawImage(image.img3, 0, 0, 1920, 1080, 128, 243, 1024-160, 576-90);
        ctxP3.filter = "brightness(50%)";
        ctxP3.drawImage(image.img1, 0, 0, 1920, 1273, 800, 190, 960, 636.5);
        //인상쓰는 클템 반응
        ctxP4.filter = "none";
        ctxP4.drawImage(image.img4, 0, 0, 1920, 1080, 28, 153, 1024, 576);
        ctxP4.filter = "brightness(50%)";
        ctxP4.drawImage(image.img1, 0, 0, 1920, 1273, 800, 190, 960, 636.5);
        //둘다 아웃포커스
        ctxP5.filter = "brightness(50%)";
        ctxP5.drawImage(image.img2, 0, 0, 1920, 1080, 78, 153, 1024, 576);
        ctxP5.filter = "brightness(50%)";
        ctxP5.drawImage(image.img1, 0, 0, 1920, 1273, 800, 190, 960, 636.5);
        //아무무 포커스
        ctxP6.filter = "brightness(50%)";
        ctxP6.drawImage(image.img2, 0, 0, 1920, 1080, 78, 153, 1024, 576);
        ctxP6.filter = "brightness(100%)";
        ctxP6.drawImage(image.img1, 0, 0, 1920, 1273, 800, 190, 960, 636.5);
    }
    
}

function showPerson() {
    $("#canvasP1").hide();
    $("#canvasP2").hide();
    $("#canvasP3").hide();
    $("#canvasP4").hide();
    $("#canvasP5").hide();
    $("#canvasP6").hide();

    let nameBefore, nameAfter;


    if(scriptShortcut.isChoice) {
        //선택문일때
        try {
            if(reactionNum == 0) {
                nameBefore = scriptShortcut.reaction[choiceNum][reactionNum].who;
            }
            else {
                nameBefore = scriptShortcut.reaction[choiceNum][reactionNum-1].who;
            }
            nameAfter = scriptShortcut.reaction[choiceNum][reactionNum].who;
        } catch (error) {
            
        }
    }
    else {
        //선택문 아닐때
        if(nthOfText == 0) {
            nameBefore = "";
        }
        else {
            nameBefore = script.script[nthOfPlace].text[nthOfText-1].who;
        }
        nameAfter = scriptShortcut.who;
        if(nameBefore == undefined) {
            if(nameAfter == "클템") {
                nameBefore = "나";
            }
            else if(nameAfter == "나") {
                nameBefore = "클템";
            }
        }
    }

    if(nameBefore == "" && nameAfter == "나" && isFirst) {
        $("#canvasP1").show();
    }
    else if(nameBefore == "나" && nameAfter == "나" && isFirst) {
        $("#canvasP1").show();
    }
    else if(nameBefore == "나" && nameAfter == "나") {
        $("#canvasP6").show();
    }
    else if(nameBefore == "클템" && nameAfter == "나") {
        $("#canvasP6").show();
        isFirst = false;
    }
    else if(nameBefore == "나" && nameAfter == "클템") {
        $("#canvasP2").show();
    }
    else if(nameAfter == "클템" && mode == "smile") {
        $("#canvasP3").show();
    }
    else if(nameAfter == "클템" && mode == "bad") {
        $("#canvasP4").show();
    }
    else if(!doneChoice && scriptShortcut.isChoice) {
        $("#canvasP5").show();
    }
}

$("body").mousemove(function (e) { 
    e.preventDefault();

    if(!doneChoice && scriptShortcut.isChoice) {
        let rect = canvas.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        
        if(x >= 181.5 && x <= 778.5 && y >= 439 && y <= 472) {
            //1번선택지
            $("body").attr("style", "cursor: pointer;");
        }
        else if(x >= 181.5 && x <= 778.5 && y >= 482 && y <= 515) {
            //2번 선택지
            $("body").attr("style", "cursor: pointer;");
        }
        else {
            $("body").attr("style", "");
        }
    }
    else {
        $("body").attr("style", "");
    }
});

$("body").click(function (e) { 
    e.preventDefault();

    if(!doneChoice && scriptShortcut.isChoice) {
        let rect = canvas.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

       
        
        if(x >= 181.5 && x <= 778.5 && y >= 439 && y <= 472) {
            //1번선택지
            if(scriptShortcut.answer == 0) {
                mode = "smile";
            }
            else {
                mode = "bad";
            }
            choiceNum = 0;
            doneChoice = true;
        }
        else if(x >= 181.5 && x <= 778.5 && y >= 482 && y <= 515) {
            //2번 선택지
            if(scriptShortcut.answer == 1) {
                mode = "smile";
            }
            else {
                mode = "bad";
            }
            choiceNum = 1;
            doneChoice = true;
        }
    }
    else if(scriptShortcut.isChoice && doneChoice) {
        try {
            if(reactionNum >= scriptShortcut.reaction[choiceNum].length-1) {
                nthOfText+=1;
                length = 0;
                num = 1;
                scriptShortcut = script.script[nthOfPlace].text[nthOfText];
                doneChoice = false;
            }
            else {
                mode = "";
                reactionNum+=1;
                num = 1;
            }
        } catch (error) {
            
        }
    }
    else if(!scriptShortcut.isChoice){
        nthOfText+=1;
        length = 0;
        num = 1;
        scriptShortcut = script.script[nthOfPlace].text[nthOfText];
    }
});
//마우스 좌표를 가져와서 버튼위치에 있으면 캔버스에 cursor: pointer;추가