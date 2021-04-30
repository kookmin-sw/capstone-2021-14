//import * as tf from "@tensorflow/tfjs@2.4.0/dist/tf.min.js";
//import * as dfd from "danfojs@0.1.2/dist/index.min.js";
import * as dfd from "danfojs-node";
import * as tf from "@tensorflow/tfjs";
const model = tf.loadGraphModel('./DeepLearningModel/my-model.json');
model.summary();
dfd.read_csv('./dataset/norm-all-data.csv').then(function(DATA) {
    input = DATA.loc({rows: 3});
    input.print();
    //model.predict(inpu).print();
});

