class Dino {
    constructor(playerControlled, brain) {
        this.originalWidth = 30;
        this.originalHeight = 50;
        this.width = this.originalWidth;
        this.height = this.originalHeight;
        
        this.pos = createVector(width/4, height - height/4 -this.height/2);
        this.vel = createVector();

        this.playerControlled = playerControlled

        this.isAlive = true;

        this.brain = brain;

        this.score = 0;

    }

    calcGroundPosition(){
        return (height-height/4-this.height/2);  // Position of our ground - Half the height of the dinosaur
    }



    update(closestCactus, score){

        this.score = score;

        this.vel.y += -0.7; //Strength of Gravity
        this.pos.y -= this.vel.y; // Apply Gravity to Dino

        let groundPos = this.calcGroundPosition();


        if(this.pos.y >= groundPos){
            this.pos.y = groundPos;
            this.vel.y = 0;

        }
        if(this.hitCactus(closestCactus)){
            this.isAlive = false;
        }

        if(!this.playerControlled){
            this.think(closestCactus);
        }
    }


    think(cactus){
        
        let distance = cactus.pos.x - cactus.width/2 - this.pos.x + this.width/2;

        if(distance <= 0){
            distance = 0;
        }

        let actions = this.brain.predict([distance, cactus.count]);

        let choice = actions.indexOf(Math.max(...actions)); // Get the index of the best prediction

        if(choice == 0){
            // Jump
            this.unDuck();
            this.jump();
        }else if(choice == 1){
            // Duck
            this.duck();
        }else{
            // Do Nothing
            this.unDuck();
        }   
    }

    jump(){
        if(this.pos.y == this.calcGroundPosition() && this.height > this.originalWidth){ // Not Crouched
            this.vel.y = 15; // Jump Strength
        }
    }

    duck(){
        if(this.pos.y == this.calcGroundPosition()){
            this.height = this.originalWidth;
            this.width = this.originalHeight;

        }
    }

    unDuck(){
        this.height = this.originalHeight;
        this.width = this.originalWidth;

    }

    show(){
        push();
        noStroke();
        translate(this.pos.x, this.pos.y);
        if(this.playerControlled){
            fill(0, 0, 0, 100);
        
        }else{
            fill(0, 100, 0, 100);
        }
        rectMode(CENTER);
        rect(0, 0, this.width, this.height);
        pop();
    }

    hitCactus(cactus) {
        let cactusWidth = ((cactus.width + cactus.spacing) * cactus.count) - cactus.spacing; // Calculate Full Width of Cactus

        if (this.pos.x + this.width / 2 > cactus.pos.x - cactus.width / 2 && this.pos.x - this.width / 2 < cactus.pos.x + cactusWidth) { // Check X
            if (this.pos.y + this.height / 2 > cactus.pos.y - cactus.height / 2) {
                return true;
            }
        }
        return false;
    }

} 