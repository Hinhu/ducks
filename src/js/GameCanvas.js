import React, { Component } from 'react';

class GameCanvas extends Component{
    constructor(){
        super();
        this.state = {
            backgroundColor: "green",
            width: 700,
            height: 420,
            duck: {
                x: 700,
                y: 100,
                speed: 2.5
            }
        };
        
    }
    render(){
        return (
            <canvas width={this.state.width} height={this.state.height} ref="canvas"></canvas>
        );
    }

    componentDidMount(){
        this.initCanvas(this.state, this.refs.canvas.getContext('2d'));
        requestAnimationFrame(()=>{
            this.loop();
        });
    }

    componentDidUpdate(){
        this.updateCanvas(this.state);
    }

    initImages(state, context){
        this.backgroundImg = new Image();
        this.duckImg = new Image();
        this.backgroundImg.src = require("../img/background-grass.png");
        this.duckImg.src = require("../img/duck.png");
        this.backgroundImg.onload = function() {
            context.clearRect(0,0,state.width, state.height);
            context.drawImage(this, 0, 0, state.width, state.height);
        };

        this.duckImg.onload = function(){
            //context.clearRect(0,0,state.width, state.height);
            context.drawImage(this, state.width-100, 100);
        };
    }

    initCanvas(state, context){
        this.initImages(state, context);
        console.log('init canvas');
    }

    updateCanvas(state){
        //console.log('update canvas');
        var context = this.refs.canvas.getContext('2d');
        context.drawImage(this.backgroundImg, 0, 0);
        context.drawImage(this.duckImg, state.duck.x, state.duck.y);
    }

    loop(){
        //console.log('loop: ', this.state.duck);
        this.setState((state) => ({
            duck: {
                x: state.duck.x > - 60 ? state.duck.x - state.duck.speed : state.width,
                y: state.duck.y,
                speed: state.duck.speed
            }
        }));
        requestAnimationFrame(this.loop.bind(this));
    }


    
}

export default GameCanvas;