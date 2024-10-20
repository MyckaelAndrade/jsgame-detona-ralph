const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        target: document.querySelector(".target"),
        time: document.querySelector("#time"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives"),
    },
    values: {
        gameVelocity: 1000,
        hitPosition:0,
        result: 0,
        currentTime: 60,
        life: 3,
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId:setInterval(countDown, 1000),
    }
};

function countDown() {
    state.values.currentTime--;
    state.view.time.textContent = state.values.currentTime;
    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("Game Over! Score:" + state.values.result);
    }
}

function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}

function randomSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove("target");
    });
    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("target");
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            } else {
                state.values.life--;
                state.view.lives.textContent = state.values.life;
                state.values.hitPosition = null;
                if (state.values.life <= 0) {
                    clearInterval(state.actions.countDownTimerId);
                    clearInterval(state.actions.timerId);
                    alert("Game Over! Score:" + state.values.result);
                }
            }
        });
    });
}

function main(){
    addListenerHitBox();
}

main();

