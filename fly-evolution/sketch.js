const LIFE_SPAN = 800; //HOW LONG THE FLIES LIVE
const POP_SIZE = 500 //HOW MANY FLIES DO WE WANT
const REWARD_MULTI = 1000; //WHAT IS THE REWARD FOR FINDING FOOD
const PUNISH_DIV = 3; //WHAT IS THEIR PUNISHMENT FOR HITTING SOMETHING
const MUTATION_RATE = 0.1; //WHAT IS THE RATE AT WHICH FLIES MUTATE

let count = 0;
let generation = 0;
let averageFit = 0;
let successRate = 0;





function setup() {
    console.log('Hello');

    createCanvas(640, 480);


    population = new Population(LIFE_SPAN, POP_SIZE, REWARD_MULTI, PUNISH_DIV)

}

function draw() {
    background(56, 88, 120);

    textSize(28);
    fill(245, 239, 188);
    text("Generation: " + generation, 10, 50);
    text("Average Fitness: " + averageFit, 10, 90)
    text("Success Rate: " + successRate + "%", 10, 130)

    population.run(count)
    count ++;

    if (count == LIFE_SPAN) {
        population.evaluate();

        averageFit = population.findAverageFitness();
        successRate = population.successRate
        
        let newFlies = population.generateNewPopulation(MUTATION_RATE);

        population = new Population(LIFE_SPAN, POP_SIZE, REWARD_MULTI, PUNISH_DIV, newFlies)



        count = 0
        generation++
    }

}