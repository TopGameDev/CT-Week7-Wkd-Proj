let diceSet = []
let totalScore = 0


function createDice(number){
    const circleMatrix = {
        1: [
            [50, 50]
        ],
        2: [
            [20, 20],
            [80, 80]
        ],
        3: [
            [20, 20],
            [50, 50],
            [80, 80]
        ],
        4: [
            [20, 20],
            [20, 80],
            [80, 20],
            [80, 80]
        ],
        5: [
            [20, 20],
            [20, 80],
            [50, 50],
            [80, 20],
            [80, 80]
        ],
        6: [
            [20, 20],
            [20, 80],
            [50, 20],
            [50, 80],
            [80, 20],
            [80, 80]
        ]
    }

    const dice = document.createElement("div");
    dice.classList.add("dice");

    for (const circlePos of circleMatrix[number]){
        const circle = document.createElement("div");

        circle.classList.add("dice-circle");
        circle.style.setProperty("--top", circlePos[0] + "%");
        circle.style.setProperty("--left", circlePos[1] + "%");
        dice.appendChild(circle);

    }

    return dice;
}

function randomDice(diceContainer, diceAmount){
    diceContainer.innerHTML = "";
    
    for (let i = 0; i < diceAmount; i++) {
        const random = Math.floor((Math.random() * 6) + 1);
        const dice = createDice(random);
        
        diceContainer.appendChild(dice);
        diceSet.push(random)
    }
    
}

function clearDice(){
    for (let i=0; i < diceSet.length; i++){
        diceSet.splice(i, diceSet.length)
    }
}

function updateScore(arr){
    let numOne = 0
    let numTwo = 0
    let numThree = 0
    let numFour = 0
    let numFive = 0
    let numSix = 0
    let roundScore = 0

    for (let i = 0; i < arr.length; i++){
        if (arr[i] === 1){
            numOne += 1
        } else if (arr[i] === 2){
            numTwo += 1
        } else if (arr[i] === 3){
            numThree += 1
        } else if (arr[i] === 4){
            numFour += 1
        } else if (arr[i] === 5){
            numFive += 1
        } else if (arr[i] === 6){
            numSix += 1
        }
    }
    
    switch (numOne) {
        case 1:
            roundScore += 100
            break;
        case 2:
            roundScore += 200
            break;
        case 3:
            roundScore += 1000
            break;
        case 4:
            roundScore += 1100
            break;
        case 5:
            roundScore += 1200
            break;
        case 6:
            roundScore += 2000
            break;
        default:
            roundScore += 0
            break;
    }
    switch (numTwo) {
        case 3:
            roundScore += 200
            break;
        case 4:
            roundScore += 200
            break;
        case 5:
            roundScore += 200
            break;
        case 6:
            roundScore += 400
            break;
        default:
            roundScore += 0
            break;
    }
    switch (numThree) {
        case 3:
            roundScore += 300
            break;
        case 4:
            roundScore += 300
            break;
        case 5:
            roundScore += 300
            break;
        case 6:
            roundScore += 600
            break;
        default:
            roundScore += 0
            break;
    }
    switch (numFour) {
        case 3:
            roundScore += 400
            break;
        case 4:
            roundScore += 400
            break;
        case 5:
            roundScore += 400
            break;
        case 6:
            roundScore += 800
            break;
        default:
            roundScore += 0
            break;
    }
    switch (numFive) {
        case 1:
            roundScore += 50
            break;
        case 2:
            roundScore += 100
            break;
        case 3:
            roundScore += 500
            break;
        case 4:
            roundScore += 550
            break;
        case 5:
            roundScore += 600
            break;
        case 6:
            roundScore += 1000
            break;
        default:
            roundScore += 0
            break;
    }

    console.log(roundScore)
    const rScore = document.querySelector(".round-score")
    rScore.getElementsByTagName("h1")[0].innerHTML = `${roundScore}`

    totalScore += roundScore
    const tScore = document.querySelector(".total-score")
    tScore.getElementsByTagName("h1")[0].innerHTML = `${totalScore}`
    
}

function gameOver(){
    if (totalScore >= 10000){
        jsConfetti.addConfetti({
            emojis: ['⭐️'],
            confettiNumber: 300,
            emojiSize: 25
        })
        btnRoll.disabled = true;
        const banner = document.getElementById('banner-visible');
        banner.style.display = 'block';
    }
}

const diceContainer = document.querySelector(".dice-container");
const btnRoll = document.querySelector(".btn-roll");


const resetButton = document.querySelector('.btn-reset');
const jsConfetti = new JSConfetti()


randomDice(diceContainer, 6);
clearDice()

btnRoll.addEventListener('click', () => {
    const interval = setInterval(() => {
        randomDice(diceContainer, 6);
    }, 50)
    setTimeout(() => {
        clearInterval(interval)
        clearDice()
        randomDice(diceContainer, 6);
        console.log(diceSet)
        updateScore(diceSet)
        gameOver()
        clearDice()
    }, 1000)
    
})

resetButton.addEventListener('click', () => {
    location.reload(true)
})


// diceContainer.appendChild(createDice(6));



  