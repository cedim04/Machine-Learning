class NeuralNetwork {
    constructor(a, b, c, d) {

        if(a instanceof tf.Sequential){
            this.model = a;
            this.inputNodes = b;
            this.hiddenNodes = c;
            this.outputNodes = d;

        }else{
            this.inputNodes = a;
            this.hiddenNodes = b;
            this.outputNodes = c;
            this.model = this.createModel();

        }
    }

    createModel(){
        // Unsupervised Dense Neural Network
        const model = tf.sequential();
        const hidden = tf.layers.dense({
            units: this.hiddenNodes,
            inputShape: [this.inputNodes],
            activation: 'sigmoid'

        });
        model.add(hidden);
        
        const output = tf.layers.dense({
            units: this.outputNodes,
            activation: 'softmax'
        });
        model.add(output)

        return model;
    }

    dispose(){
        this.model.dispose();
    }

    predict(inputs){
        return tf.tidy(() => {
            const xs = tf.tensor2d([inputs]); // [[]] lives on the GPU
            
            const ys = this.model.predict(xs); //Predict using our inputs

            const outputs = ys.dataSync(); //Convert sensor to Array

            return outputs;
        });
    }

    copy(){
        return tf.tidy(() => {

            const modelCopy = this.createModel();
        
            modelCopy.setWeights(this.model.getWeights());

            return new NeuralNetwork(modelCopy, this.inputNodes, this.hiddenNodes, this.outputNodes);

        });
    }

    mutate(rate){
        tf.tidy(() => {

            const weights = this.model.getWeights();
            const mutatedWeights = [];

            for(let i = 0; i < weights.length; i++){
                let tensor = weights [i];// Grab Tensor
                let shape = weights[i].shape;// Get Tensor Shape
                let values = tensor.dataSync();// Copy Tensor values


                for(let j = 0; j < values; j++){
                    if(random(1) < rate){
                        let w = values[j];
                        values[j] = w + randomGaussian(); // Add random number around 0 
                    }
                }

                let newTensor = tf.tensor(values, shape);

                mutatedWeights[i] = newTensor;
            }
            this.model.setWeights(mutatedWeights);

        });
    }
}