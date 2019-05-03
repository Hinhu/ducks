import React, { Component } from 'react';

class GameCanvas extends Component{
    constructor(){
        super();
        this.DUCKS_BASE_NUM = 4;
        this.state = {
            backgroundColor: "green",
            width: 700,
            height: 420,
            level: 1,
            ducks: [],
            /*duck: {
                x: 700+Math.floor(Math.random()*10),
                y: 100,
                speed: 2.5
            }*/
        };
        
    }

    componentDidMount(){
        this.initCanvas(this.state, this.refs.canvas.getContext('2d'));
        this.initDucks(this.state);
        requestAnimationFrame(()=>{
            this.loop();
        });
    }

    componentDidUpdate(){
        this.updateCanvas(this.state);
    }

    initDucks(state){
        let ducksArray = [];
        for(let i=0; i<this.DUCKS_BASE_NUM+2*state.level; i++)
            ducksArray.push({
                x: state.width+Math.floor(Math.random()*70+i*200+40*state.level),
                y: Math.floor(Math.random()*100+20),
                speed: Math.floor(Math.random()*0.05*state.level+0.2*state.level+1.2)
            });
        this.setState({
            ducks: ducksArray
        });
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
        let context = this.refs.canvas.getContext('2d');
        context.drawImage(this.backgroundImg, 0, 0);

        state.ducks.forEach(element => {
            context.drawImage(this.duckImg, element.x, element.y);
        });
        //context.drawImage(this.duckImg, state.duck.x, state.duck.y);
    }

    drawArrow(context){

    }

    loop(){
        //console.log('loop: ', this.state.duck);
        this.setState((state) => {
            const ducksArray = state.ducks.map(duck => ({
                x: duck.x - duck.speed,
                y: duck.y,
                speed: duck.speed
            }))

            //const ducksOnScreen = state.ducks.filter(duck => duck.x > 0)

            return {
                ducks: ducksArray,    
                //level: ducksOnScreen.length > 0 ? state.level : state.level+1
            };
        });
        
        if(this.state.ducks.filter(duck => duck.x > -100).length === 0){
            this.setState((state) => ({
                level: state.level+1
            }))
            this.initDucks(this.state)
            console.log('leveled up', this.state.level)
        }

        
        requestAnimationFrame(this.loop.bind(this));
    }



    render(){
        return (
            <canvas width={this.state.width} height={this.state.height} ref="canvas"></canvas>
        );
    }
    
}

export default GameCanvas;