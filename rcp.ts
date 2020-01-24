let imgCoords : RSP[keyof RSP] = '0';

//interface RSP {
//    readonly ROCK : string;
//      readonly SCISSORS : string;
//      readonly PAPER : string;
//} about interface, If the property has a wide range of declariation like string, number .... I can put readonly to make as const.
// and between interface, they can inherit each other. For example,
// interface Example extends RSP = "Example" has the same type declaration.
// and when I want to modify existent types which other people made before, I could use the same name of Type. For example, If there is RSP, and I can add other type declaration by reuse the name of RSP like "RSP{a:b}"
//type Hello ={ROCK,PAPPER,SCISSORS}
// if I could not be convinced that what the next key is, I could type like that "interface Example{a:1; b:2; [key: stirng]:number;"


// Tip. First, write the codes like JS, then add "as ~~~" to strictly declare the types.

interface RSP {
    readonly ROCK : '0';
    readonly SCISSORS : '-142px';
    readonly PAPER : '-284px';
}

const rsp : RSP = {
    ROCK : '0',
    SCISSORS : '-142px',
    PAPER : '-284px',
}

const score = {
    ROCK : 0,
    SCISSORS : 1,
    PAPER : -1,
} as const; // to prevent this const can be used another way.

function computerChoice(imgCoords : RSP[keyof RSP]) : keyof RSP{ //by declairing the result type, "const computer" has 0|1|-1 type. + I already declare the type of RSP and the keys of RSP is ROCK, SCISSORS and PAPPER so i can reuse this by using "keyof"
    return (Object.keys(rsp) as ['ROCK','SCISSORS','PAPER']).find((k)=>rsp[k] === imgCoords)!; //Object.keys() = makes the array which is made of property names. In this case, ['ROCK','PAPER','SCISSORS'/ .find = detect the first element that satisfies the precondition in the array. 
} // Object.keys(rsp) is ['ROCK','SCISSORS','PAPER'], but in this case, typescript consider this as the array that comprise strings. Therefore, I add "as ['ROCK','SCISSORS','PAPER']" to mention this is the array. But, .find is declared T | undefined by other programmer. So I add "!" which means I am convinced this cord has no fallacious point so just run it.


let timeline : number;
document.querySelectorAll('.btn').forEach((btn) =>{
    btn.addEventListener('click',function(this:HTMLButtonElement, p:Event){        
        clearInterval(timeline); // ID = timeline which is used as stopper in this function.
        setTimeout(intervalMaker, 2000); // Start rotation again after 2 second.
        const myChoice = this.textContent as keyof RSP; // In this case, "this.textContent" === "parameter.target.textContent" / in typescript, I should determine the type of "this" which is "HTMLButtonElement" and "parameter:Event"
        const myScore = score[myChoice];
        const computerScore = score[computerChoice(imgCoords)];
        const diff = myScore - computerScore;
        const matchResult = document.querySelector('#result') as HTMLHeadingElement; 
        if(diff === 0){ // it means the option that I and computer chose is the same
            matchResult.textContent = 'It is tie';            
        }else if([-1,2].includes(diff)){ //I express this which menas is there "diff result" in [-1,2]? . I can express this in another way like "diff=== =1 || diff ===2"
            matchResult.textContent = 'You win';            

        }else{
            matchResult.textContent = 'Computer win';           
        }

    });
});

function interval(){ // to make image rotation
    if (imgCoords === rsp.ROCK){//In other words, if imgCoords is 0,         
        imgCoords = rsp.SCISSORS; // imgCoords' property is -142px
    }else if (imgCoords === rsp.SCISSORS){
        imgCoords = rsp.PAPER;
    }else {
        imgCoords = rsp.ROCK;
    }
    if(document.querySelector('#computer')){ // it is equal to "if document.querySelector('#computer') is exist or !== null." The reason why I put this "if" order is that in typescript type definition, querySelector can be null.
    (document.querySelector('#computer') as HTMLDivElement).style.background = `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoords} 0`;} // the reason why I put the "as HTMLDivElement" is that in typescript definition, style doesn't exist on type "Element"
}

function intervalMaker(){
    timeline = setInterval(interval,100);
}

intervalMaker();