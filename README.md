# Snake Game

Are you working in a sitting position right now? Feeling pains about your stiff neck and tight shoulders? If so, you're gonna love our game! Now go to https://snake.tensor-game.tk/ and have a relax! 


## How to play? 
In this game, you have to use your head gestures to guide the snake to gain score as high as possible like this: <br/>
👇👇👇👇(A big THANK YOU to our demo tester [@codingwesley](https://github.com/codingwesley))
![demo](https://github.com/Hongyu-Li/Snake_Game/blob/master/figs/demo.gif)

Got interested? Four steps to start playing quickly:
* Step 1: Put your nose on the '+' of camera. 
* Step 2: Show your hand in front of camera to start/restart the game. 
* Step 3: Turn your head up, down, left and right to control your snake. 
* Step 4: Enjoy the game!

[BOUNUS] Notice `Change Game` button at the bottom of the instruction page? Click it and try to use your head to play **Tetris**.


## Development Environment

This demo was inspired by tensorflowjs [Pac-Man demo](https://www.tensorflow.org/js/demos/). 

* Model: We used the idea of *transfer learning* to train the model with **Tensorflow 2.0** on [Colab](https://colab.research.google.com/). The training process and the architecture of the model could be found in `/src/(Smaller)Snake-Game-Alpha.ipynb`. Our final training accuracy is 99.34% and validation accuracy is 98.14%. 
* UI: `Typescript ` + `React` + `Mobx`.  


## TODO

- [x] Deploy online

- [x] Recognize hand gesture to start/restart the game

- [x] SSL Certificate (open camera without configuring chrome)

- [ ] Prettier UI


## Core Members
<a href="https://github.com/TokenJan">
    <img src="https://avatars2.githubusercontent.com/u/11611658?s=400&v=4" width="45px">
</a>
<a href="https://github.com/Amuro1997">
    <img src="https://avatars0.githubusercontent.com/u/33740224?s=400&v=4" width="45px">
</a>
<a href="https://github.com/Hongyu-Li">
    <img src="https://avatars0.githubusercontent.com/u/31630932" width="45px">
</a>

## Acknowledge

Code borrows heavily from [Pac-Man](https://github.com/tensorflow/tfjs-examples/tree/master/webcam-transfer-learning).
