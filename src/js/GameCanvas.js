import React, { Component } from 'react';

class GameCanvas extends Component{
    constructor(){
        super();
        this.state = {
            backgroundColor: "green",
            width: 700,
            height: 420
        };
    }
    render(){
        return (
            <canvas width={this.state.width} height={this.state.height} ref="canvas"></canvas>
        );
    }

    componentDidMount(){
        this.updateCanvas(this.state);
    }

    componentDidUpdate(){
        this.updateCanvas(this.state);
    }

    updateCanvas(state){
        var context = this.refs.canvas.getContext('2d');
        
        //context.fillStyle = this.state.backgroundColor;
        //context.fillRect(0,0,this.state.width, this.state.height);
        let img = new Image();
        img.src = require("../img/background-grass.png");
        img.onload = function() {
            context.clearRect(0,0,state.width, state.height);
            context.drawImage(this, 0, 0, state.width, state.height);
        };
        
    }


    
}

export default GameCanvas;