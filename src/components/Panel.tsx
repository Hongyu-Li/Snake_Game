import React from 'react';
import './Panel.css';
import * as tf from '@tensorflow/tfjs';
import * as tfd from '@tensorflow/tfjs-data';
import { inject, observer } from 'mobx-react';
import GameStore from '../stores/gameStore';
import * as faceapi from 'face-api.js';
import * as handTrack from 'handtrackjs';
import RecordStore from '../stores/recordStore';
import resizeImageData from 'resize-image-data';
import { WEBCAM_WIDTH, WEBCAM_HEIGHT } from './snake-game/constant';
import { record } from '../GlobalStore';

interface GameProps {
  game?: GameStore,
  record?: RecordStore
}

@inject("game")
@inject("record")
@observer
export default class Panel extends React.Component<GameProps> {
    webcam : any;
    headModel : tf.LayersModel;
    mobilenet: tf.LayersModel;
    handModel: any;

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
      this.headModel = await this.loadAddonModel();
      this.handModel = await this.loadHandTrackModel();
      // await faceapi.nets.ssdMobilenetv1.loadFromUri('/weights');
      // await faceapi.nets.faceLandmark68Net.loadFromUri('/weights');
      // await faceapi.nets.faceExpressionNet.loadFromUri('/weights');
      // setInterval(() => {this.detectMouse()}, 300);
      setInterval(()=> {this.detectHeadDirection()}, 300);
      setInterval(()=> {this.detectHands()}, 300);
      // setInterval(() => {this.detectMouse()}, 300);
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

    loadHandTrackModel() {
      const modelParams = {
        flipHorizontal: false,   // flip e.g for video 
        imageScaleFactor: 1,  // reduce input image size for gains in speed.
        maxNumBoxes: 1,        // maximum number of boxes to detect
        iouThreshold: 0.5,      // ioU threshold for non-max suppression
        scoreThreshold: 0.98,    // confidence threshold for predictions.
      };
      return handTrack.load(modelParams);
    }

    detectHands() {
      if (this.props.game.isStart) {
        return;
      }
      const video = document.getElementById('webcam');
      this.handModel.detect(video).then(predictions => {
        if (predictions.length !== 0) {
          this.play();
        }
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
        const model = await tf.loadLayersModel("./tfjs_model_95/model.json");
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
      const predictions = this.headModel.predict(temp) as tf.Tensor;

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
  
    async play() {
      const shot = await this.webcam.capture(); 
      this.savePlayer(shot);
      this.props.game.restart("snake");
    }

    savePlayer = (shot) => {
      const imageData = new ImageData(WEBCAM_WIDTH, WEBCAM_WIDTH);
      const data = shot.dataSync();
      for (let i = 0; i < WEBCAM_HEIGHT * WEBCAM_WIDTH; ++i) {
        const j = i * 4;
        imageData.data[j + 0] = data[i * 3 + 0];
        imageData.data[j + 1] = data[i * 3 + 1];
        imageData.data[j + 2] = data[i * 3 + 2];
        imageData.data[j + 3] = 255;
      }
      const resizedImage = resizeImageData(imageData, 30, 30, 'biliniear-interpolation');
      const canvas = document.createElement('canvas') as any;
      canvas.width = 30;
      canvas.height = 30;
      const ctx = canvas.getContext('2d');
      ctx.putImageData(resizedImage, 0, 0);
      const dataURL = canvas.toDataURL();
      record.changePlayer(dataURL);
      canvas.remove();
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
                {/* <div className="col-container">
                  <button className="nes-btn" id="shot">Shot</button>
                  <button className="nes-btn" onClick={this.play} id="play">Play</button>
                  <button className="nes-btn" onClick={()=>this.props.game.restart("snake")} id="play">restart</button>
                </div> */}
                {/* <canvas id="dummy_canvas" width="224" height="224" ></canvas> */}
                <div id="instruction" className="nes-container">
                  <h1>Instruction</h1>
                  <p>Step 1: Show your hand in front of camera.</p>
                  <p>Step 2: Turn your head up, down, left and right to control your snake.</p>
                  <p>Step 3: Enjoy the game!</p>
                </div>
            </div>
        )
    }
}