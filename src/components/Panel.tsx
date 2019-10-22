import React from 'react';
import './Panel.css';
import * as tf from '@tensorflow/tfjs';
import * as tfd from '@tensorflow/tfjs-data';
import { inject, observer } from 'mobx-react';
import GameStore from '../stores/gameStore';
import * as faceapi from 'face-api.js';
import * as handTrack from 'handtrackjs';

interface GameProps {
  game?: GameStore
}

@inject("game")
@observer
export default class Panel extends React.Component<GameProps> {
    webcam : any;
    model : tf.LayersModel;
    mobilenet: tf.LayersModel;

    componentDidMount() {
      this.init();
    }
  
    async init() {
      try {
        this.webcam = await tfd.webcam(document.getElementById("webcam") as HTMLVideoElement);
      } catch (e) {
        console.log(e);
      }
      this.mobilenet = await this.loadTruncatedMobileNet();
      this.model = await this.loadAddonModel();
      // await faceapi.nets.ssdMobilenetv1.loadFromUri('/weights');
      // await faceapi.nets.faceLandmark68Net.loadFromUri('/weights');
      // await faceapi.nets.faceExpressionNet.loadFromUri('/weights');
      setInterval(()=> {this.detectHeadDirection()}, 300);
      // setInterval(() => {this.detectMouse()}, 300);
      this.detectHands();
    }

    async detectMouse() {
      if(this.props.game.isStart){
        return;
      }
        const input = document.getElementById('webcam') as HTMLVideoElement
        const canvas = document.getElementById('dummy_canvas') as HTMLCanvasElement
        try {
          const detectionsWithLandmarksAndExpressions = await faceapi.detectSingleFace(input).withFaceLandmarks().withFaceExpressions()
          const displaySize = { width: input.width, height: input.height }
          faceapi.matchDimensions(canvas, displaySize)
          if (detectionsWithLandmarksAndExpressions.expressions.surprised > 0.9) {
            this.play();
          }
        } catch (e) {
          console.log(e);
        }
    }

    detectHands() {
      const video = document.getElementById('webcam');
      const modelParams = {
        flipHorizontal: false,   // flip e.g for video 
        imageScaleFactor: 1,  // reduce input image size for gains in speed.
        maxNumBoxes: 1,        // maximum number of boxes to detect
        iouThreshold: 0.5,      // ioU threshold for non-max suppression
        scoreThreshold: 0.5,    // confidence threshold for predictions.
      }
      // Load the model.
      console.log("loading handtrack model......")
      handTrack.load(modelParams).then(model => {
        // detect objects in the image.
        console.log("handtrack model loaded")
        setInterval(() => {
          if(this.props.game.isStart){
            return;
          }
          model.detect(video).then(predictions => {
            if (predictions.length !== 0) {
              this.play();
            }
          });
        }, 300);
      });
    }

    async loadTruncatedMobileNet() {
        const mobilenet = await tf.loadLayersModel(
            'https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_1.0_224/model.json');
      
        // Return a model that outputs an internal activation.
        const layer = mobilenet.getLayer('conv_pw_13_relu');
        return tf.model({inputs: mobilenet.inputs, outputs: layer.output});
      }
  
    async loadAddonModel() {
      console.log('Loading model......');
      try {
        const model = await tf.loadLayersModel("./tfjs_model/model.json");
        document.getElementById("status").style.display = "none";
        document.getElementById("main").style.display = "block";
        console.log('Done loading pretrained model.');
        return model;
      } catch (err) {
        console.log(err.message);
      }
    }
  
    async getImage() {
      const img = await this.webcam.capture();
      
      const processedImg =
          tf.tidy(() => img.expandDims(0).toFloat().div(127.5).sub(1));
      img.dispose();
      return processedImg;    
    }
  
    async detectHeadDirection() {
      const img = await this.getImage();
      const temp = this.mobilenet.predict(img) as tf.Tensor;
      const predictions = this.model.predict(temp) as tf.Tensor;

      const predictedClass = predictions.as1D().argMax();
      const classId = (await predictedClass.data())[0];
      this.handleButton(classId);
      img.dispose();
    }
  
    handleButton(label: number) {
      const CONTROLS = ['up-btn', 'down-btn', 'left-btn', 'right-btn'];
      const CONTROL_CODES = [38, 40, 37, 39]
      if (label > 0) {
        CONTROLS.forEach(control => {
          const btn = document.getElementById(control);
          if (btn.classList.contains("is-primary")) {
            btn.classList.remove("is-primary");
          }
        })
        const button = document.getElementById(CONTROLS[label-1]);
        button.classList.add("is-primary");
        this.props.game.handle_key(CONTROL_CODES[label-1]);
      }
    }
  
    play = () => {
      this.props.game.restart("snake")
    }

    render() {
        return(
            <div id="game-panel">
                <div id="webcam-controller">
                    <video autoPlay playsInline muted id="webcam" width="224" height="224"></video>
                <div id="direction-panel">
                    <div id="top-panel">
                        <span className="fill"></span>
                        <button className="nes-btn scroll-btn top" id="up-btn"><span>&lt;</span></button>
                    </div>
                    <div id="middle-panel">
                        <button className="nes-btn left" id="left-btn"><span>&lt;</span></button>
                        <span className="fill"></span>
                        <button className="nes-btn" id="right-btn"><span>&gt;</span></button>
                    </div>
                    <div id="bottom-panel">
                        <span className="fill"></span>
                        <button className="nes-btn scroll-btn" id="down-btn"><span>&gt;</span></button>
                    </div>
                </div>
                </div>
                <div className="col-container">
                  <button className="nes-btn" id="shot">Shot</button>
                  <button className="nes-btn" onClick={this.play} id="play">Play</button>
                  <button className="nes-btn" onClick={()=>this.props.game.restart("snake")} id="play">restart</button>
                </div>
                <canvas id="dummy_canvas" width="224" height="224" ></canvas>
            </div>
        )
    }
}