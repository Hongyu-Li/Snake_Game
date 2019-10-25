# Snake Game

Are you working in a sitting position right now? Feeling pains about your stiff neck and tight shoulders? If so, you're gonna love our game! 


## How to play? 

In this game, you have to use your head gestures to guide the snake to gain score as high as possible. 

**[Placeholder] ONLINE DEMO URL** AND **VIDEO DEMO**


## Development Environment

This demo was inspired by tensorflowjs [Pac-Man demo](https://www.tensorflow.org/js/demos/). 

* Model: We used the idea of *transfer learning* to train the model with **Tensorflow 2.0** on [Colab](https://colab.research.google.com/). The training process and the architecture of the model could be found in `/src/(Smaller)Snake-Game-Alpha.ipynb`. Our final training accuracy is 99.34% and validation accuracy is 98.14%. 
* UI: `Typescript ` + `React` + `Mobx`  


## TODO

- [x] Deploy online

- [x] Recognize hand gesture to start/restart the game

- [x] SSL Certificate (open camera without configuring chrome)

- [ ] Prettier UI


## Acknowledge

Code borrows heavily from [Pac-Man](https://github.com/tensorflow/tfjs-examples/tree/master/webcam-transfer-learning).
