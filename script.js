const clickyButton = document.getElementById("clicky-button");
const answerBox = document.getElementById('answer-box');
const startElements = document.querySelectorAll(".start-screen");
const nextElements = document.querySelectorAll(".next-screen");
const input = document.getElementById('answer-input');
const questionH1 = document.getElementById('question');
const neighbor = document.getElementById('neighbor');
const fade = document.getElementById('fade-image');
const mainImg = document.getElementById('mexican-verity');
const skeletonImg = document.getElementById('skeleton');
const submitBtn = document.getElementById('regular-button');
const bell = new Audio('bell_sound.mp3');
const yay = new Audio('yay.mp3');
const subscribe = new Audio('hello_neighbor_subscribe.mp3');
const drumRoll = new Audio('drum_roll.mp3');
const adrian = new Audio('adrian.mp3');
const enrique = new Audio('enrique.mp3');
const foxy = new Audio('foxy.mp3');
const foghorn = new Audio('foghorn.mp3');
let correct = '';
let numCorrect = 0;
const wrongImgs = [
    'dog_eyes_closed.jpg',
    'old_guy.jpg',
    'hands_on_face.jpg',
    'shut_up.png',
    'larp.png',
    'chopped_trick.png',
    'dude.png',
    'freddy.jpg',
    'curry_moon.jpg',
    'time_limit_talking.jpg'
];
const rightImgs = [
    'veriharvard.png',
    'geek.png',
    'smiley.jpg',
    'angel_tung.jpg',
    'breaking_free.jpg',
    'lebron_1.jpg',
    'lebron_phone.jpg',
    'wolf.jpg',
    'geeked_patrick.jpg'
];
let currentImg = '';
let questionList = [
    ['De repente, tu ___ (opened) la puerta.','abriste'],
    ['Cuando yo ___ (was) joven...','era'],
    ['Yo siempre ___ (visited) a mis abuelos.','visitaba'],
    ['Mis abuelos ___ (lived) en una casa pequena.','vivian'],
    ['La mesa ___ (was) enfrente de la puerta.','estaba'],
    ['Ellos ___ (prepared) una comida grande.','preparaban'],
    ['Una vez, ellos me ___ (asked)','preguntaron'],
    ['Yo ___ (went) a su casa.','fui'],
    ['Tu siempre ___ (ate) mi comida.','comias'],
    ['___ (It was) el sabado por la noche.','era']
];
function askAquestion() {
    const i = Math.floor(Math.random() * questionList.length);
    questionH1.textContent = correct + questionList[i][0];
    return(i)
};
function helloNeighbor() {
    const neighborLoop = setInterval(() => {
        if (Math.random() > 0.5) {
            neighbor.src = 'subscribe_hello_neighbor.gif';
            subscribe.currentTime = 0;
            subscribe.play();
            neighbor.classList.remove('hidden');
            setTimeout(() => {
                neighbor.classList.add('hidden');
            }, 5740);
        };
    }, 11480);
    return(neighborLoop);
};
function skeleton() {
    const skeletonLoop = setInterval(() => {
        if (Math.random() > 0.5) {
            skeletonImg.src = 'skeleton.gif';
            skeletonImg.classList.remove('hidden');
            setTimeout(() => {
                if (Math.random > 0.5) {
                    enrique.currentTime = 0;
                    enrique.play();
                } else {
                    adrian.currentTime = 0;
                    adrian.play();
                };
            }, 500);
            setTimeout(() => {
                skeletonImg.classList.add('hidden');
            }, 2930);
        };
    }, 14650);
    return(skeletonLoop);
};
async function fadeImg(image_source) {
    fade.src = image_source;
    fade.classList.remove('hidden');
    fade.style.opacity = '1';
    const animation = fade.animate(
        [{ opacity: 1 }, { opacity: 0 }],
        { duration: 2000, easing: 'ease', fill: 'forwards' }
    );
    await animation.finished;
    fade.classList.add('hidden');
}
input.addEventListener('input', () => {
    input.setAttribute('value', input.value);
});
answerBox.addEventListener('submit', (event) => {
    event.preventDefault();
});
clickyButton.addEventListener("click", async () => {
    bell.play().then(() => {
        bell.pause();
        bell.currentTime = 0;
        bell.playbackRate = 0.8;
    });
    yay.play().then(() => {
        yay.pause();
        yay.currentTime = 0;
    });
    subscribe.play().then(() => {
        subscribe.pause();
        subscribe.currentTime = 0;
    });
    drumRoll.play().then(() => {
        drumRoll.pause();
        drumRoll.currentTime = 0;
    });
    adrian.play().then(() => {
        adrian.pause();
        adrian.currentTime = 0;
    });
    enrique.play().then(() => {
        enrique.pause();
        enrique.currentTime = 0;
    });
    foxy.play().then(() => {
        foxy.pause();
        foxy.currentTime = 0;
    });
    foghorn.play().then(() => {
        foghorn.pause();
        foghorn.currentTime = 0;
    });
    for (const element of startElements) {
        element.classList.add('hidden');
    };
    for (const element of nextElements) {
        element.classList.remove('hidden');
    };
    const neighhhhbor = helloNeighbor();
    const didYouSeeThat = skeleton();
    do {
        const index = askAquestion();
        input.value = '';
        const event = await new Promise((resolve) => {
            function handler(event) {
                if (event.type === 'click' || event.key === 'Enter') {
                    input.removeEventListener('keydown', handler);
                    submitBtn.removeEventListener('click', handler);
                    resolve(event);
                };
            };
            input.addEventListener('keydown', handler);
            submitBtn.addEventListener('click', handler);
        });
        if (event.target.value.trim().toLowerCase() === questionList[index][1]) {
            correct = 'Correct! ';
            yay.currentTime = 0;
            yay.play();
            while (true) {
                const index = Math.floor(Math.random() * rightImgs.length);
                if (rightImgs[index] !== currentImg) {
                    currentImg = rightImgs[index];
                    break;
                };
            };
            fadeImg(currentImg);
            while (true) {
                const index = Math.floor(Math.random() * rightImgs.length);
                if (rightImgs[index] !== currentImg) {
                    mainImg.src = rightImgs[index]
                    break;
                };
            };
            numCorrect += 1;
        } else {
            correct = 'FALS(ity)! ';
            bell.currentTime = 0;
            bell.play();
            bell.playbackRate += 0.2;
            bell.preservesPitch = false;
            while (true) {
                const index = Math.floor(Math.random() * wrongImgs.length);
                if (wrongImgs[index] !== currentImg) {
                    currentImg = wrongImgs[index];
                    break;
                };
            };
            fadeImg(currentImg);
            while (true) {
                const index = Math.floor(Math.random() * wrongImgs.length);
                if (wrongImgs[index] !== currentImg) {
                    mainImg.src = wrongImgs[index]
                    break;
                };
            };
        };
        questionList.splice(index, 1);
    } while (questionList.length > 0);
    clearInterval(neighhhhbor);
    clearInterval(didYouSeeThat);
    for (const element of nextElements) {
        element.classList.add('hidden');
    };
    mainImg.classList.add('hidden');
    questionH1.textContent = 'You got...';
    questionH1.classList.remove('hidden');
    questionH1.style.fontSize = '100px';
    drumRoll.play();
    setTimeout(() => {
        if (numCorrect < 8) {
            foghorn.currentTime = 0;
            foghorn.play();
            questionH1.textContent = 'You got ' + numCorrect + ' correct. Quit this class lil bro.';
        } else {
            yay.currentTime = 0;
            yay.play();
            questionH1.textContent = 'You got ' + numCorrect + ' correct! Holy tuffness';
        }
    }, 4500);
    setTimeout(() => {
        skeletonImg.src = 'foxy.gif';
        skeletonImg.style.opacity = 1;
        skeletonImg.classList.remove('hidden');
        foxy.play()
        setTimeout(() => {
            skeletonImg.classList.add('hidden');
            questionH1.classList.add('hidden');
        }, 920);
    }, 9000);
});