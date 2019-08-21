const LIFE_SPAN = 600; //HOW LONG THE FLIES LIVE
const POP_SIZE = 500 //HOW MANY FLIES DO WE WANT
const REWARD_MULTI = 10; //WHAT IS THE REWARD FOR FINDING FOOD
const PUNISH_DIV = 3; //WHAT IS THEIR PUNISHMENT FOR HITTING SOMETHING
const MUTATION_RATE = 0.1; //WHAT IS THE RATE AT WHICH FLIES MUTATE

let count = 0;


function setup() {
    console.log('Hello');

    createCanvas(640, 480);


    population = new Population(LIFE_SPAN, POP_SIZE, REWARD_MULTI, PUNISH_DIV)

}

function draw() {
    background(56, 88, 120);
    population.run(count)


    count ++;

    if (count == LIFE_SPAN) {
        count = 0
    }

}