"use strict";
var imgCoords = '0';
var rsp = {
    ROCK: '0',
    SCISSORS: '-142px',
    PAPER: '-284px'
};
var score = {
    ROCK: 0,
    SCISSORS: 1,
    PAPER: -1
}; // to prevent this const can be used another way.
function computerChoice(imgCoords) {
    return Object.keys(rsp).find(function (k) { return rsp[k] === imgCoords; }); //Object.keys() = makes the array which is made of property names. In this case, ['ROCK','PAPER','SCISSORS'/ .find = detect the first element that satisfies the precondition in the array. 
} // Object.keys(rsp) is ['ROCK','SCISSORS','PAPER'], but in this case, typescript consider this as the array that comprise strings. Therefore, I add "as ['ROCK','SCISSORS','PAPER']" to mention this is the array. But, .find is declared T | undefined by other programmer. So I add "!" which means I am convinced this cord has no fallacious point so just run it.
var timeline;
document.querySelectorAll('.btn').forEach(function (btn) {
    btn.addEventListener('click', function (p) {
        clearInterval(timeline); // ID = timeline which is used as stopper in this function.
        setTimeout(intervalMaker, 2000); // Start rotation again after 2 second.
        var myChoice = this.textContent; // In this case, "this.textContent" === "parameter.target.textContent" / in typescript, I should determine the type of "this" which is "HTMLButtonElement" and "parameter:Event"
        var myScore = score[myChoice];
        var computerScore = score[computerChoice(imgCoords)];
        var diff = myScore - computerScore;
        var matchResult = document.querySelector('#result');
        if (diff === 0) { // it means the option that I and computer chose is the same
            matchResult.textContent = 'It is tie';
        }
        else if ([-1, 2].includes(diff)) { //I express this which menas is there "diff result" in [-1,2]? . I can express this in another way like "diff=== =1 || diff ===2"
            matchResult.textContent = 'You win';
        }
        else {
            matchResult.textContent = 'Computer win';
        }
    });
});
function interval() {
    if (imgCoords === rsp.ROCK) { //In other words, if imgCoords is 0,         
        imgCoords = rsp.SCISSORS; // imgCoords' property is -142px
    }
    else if (imgCoords === rsp.SCISSORS) {
        imgCoords = rsp.PAPER;
    }
    else {
        imgCoords = rsp.ROCK;
    }
    if (document.querySelector('#computer')) { // it is equal to "if document.querySelector('#computer') is exist or !== null." The reason why I put this "if" order is that in typescript type definition, querySelector can be null.
        document.querySelector('#computer').style.background = "url(https://en.pimg.jp/023/182/267/1/23182267.jpg) " + imgCoords + " 0";
    } // the reason why I put the "as HTMLDivElement" is that in typescript definition, style doesn't exist on type "Element"
}
function intervalMaker() {
    timeline = setInterval(interval, 100);
}
intervalMaker();
