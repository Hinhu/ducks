import React, { Component } from 'react';

class GameCanvas extends Component{
    constructor(props){
        super(props);
        this.GRAVITY = 0.420420;
        this.DUCKS_BASE_NUM = 4;
        this.state = {
            backgroundColor: "green",
            width: 700,
            height: 420,
            isFinished: false,
            level: 1,
            score: 0,
            bonusPoints: 0,
            missedDucks: 0,
            ducks: [],
            bonusDucks: [],
            bow: {
                x: 105,
                y: 300,
                rotation: 0,
                power: 0,
                powerIncrease: 1.5,
                isStretching: false,
            },
            arrows: []
        };
    }

    componentDidMount(){
        this.startGame();
    }

    componentDidUpdate(){
        this.updateCanvas();
    }

    startGame(){
        this.initCanvas(this.refs.canvas.getContext('2d'));
        this.initDucks();
        this.startAnimation();
    }

    startAnimation(){
        console.log(this.state)
        requestAnimationFrame(()=>{
            this.loop();
        });
    }

    finishGame(){
        /* darken the canvas and let the player know that he lost */
        let context = this.refs.canvas.getContext('2d');
        context.fillStyle = "rgba(0, 0, 0, 0.4)";
        context.fillRect(0, 0, this.state.width, this.state.height);
        context.fillStyle = "white";
        context.font = "72px Comic Sans MS"
        context.fillText("YOU LOST", this.state.width/2-180, this.state.height/2);
    }

    loading(){
        /* show loading screen while waiting setState to finish */
        let context = this.refs.canvas.getContext('2d');
        context.fillStyle = "rgba(0, 0, 0, 0.4)";
        context.fillRect(0, 0, this.state.width, this.state.height);
        context.fillStyle = "white";
        context.font = "60px Comic Sans MS"
        context.fillText("Loading...", this.state.width/2-120, this.state.height/2);
    }

    retryGame(){
        /* reset scores and so on */
        this.setState({
            level: 1,
            score: 0,
            bonusPoints: 0,
            missedDucks: 0,
            isFinished: false
        })
        /* show loading screen */
        requestAnimationFrame(() => this.loading());
        /* let the setState finish, so the game won't start with higher level */
        setTimeout(() => this.startGame(), 1000); 
    }

    initDucks(){
        let ducksArray = [];
        let bonusDucksArray = [];

        /* create regular ducks */
        for(let i=0; i<this.DUCKS_BASE_NUM+2*this.state.level; i++)
            ducksArray.push({
                x: this.state.width+(Math.random()*70+i*200+40*this.state.level),
                y: (Math.random()*100+20),
                speed: (Math.random()*0.05*this.state.level+0.2*this.state.level+1.2)
            });
        
        /* create bonus ducks */
        for(let i=0; i<Math.random()*Math.random()*3; i++)
            bonusDucksArray.push({
                x: this.state.width+(Math.random()*500+i*600+40*this.state.level+1500),
                y: Math.random()*100+20,
                speed: (Math.random()*0.05*this.state.level+0.2*this.state.level+2)
            })
        this.setState({
            ducks: ducksArray,
            bonusDucks: bonusDucksArray
        })
    }

    initImages(context){
        let state = this.state;
        /* init images */
        this.backgroundImg = new Image();
        this.duckImg = new Image();
        this.bonusDuckImg = new Image();
        this.bowImg = new Image();
        this.arrowImg = new Image();

        /* get background from settings */
        switch(localStorage.getItem("map")) {
            case "lake": this.backgroundImg.src = require("../img/background-beach.png"); break;
            case "city": this.backgroundImg.src = require("../img/background-dark.png"); break;
            default: this.backgroundImg.src = require("../img/background-grass.png"); break;
        }
        /* load images */
        this.duckImg.src = require("../img/duck.png");
        this.bonusDuckImg.src = require("../img/bonus-duck.png");
        this.bowImg.src = require("../img/bow.png");
        this.arrowImg.src = require("../img/arrow.png");
        this.backgroundImg.onload = function() {
            context.clearRect(0,0,state.width, state.height);
            context.drawImage(this, 0, 0, state.width, state.height);
        };
        this.duckImg.onload = function(){
            //context.clearRect(0,0,state.width, state.height);
            context.drawImage(this, state.width-100, 100);
        };
        this.bowImg.onload = function(){
            context.drawImage(this, 100, 100);
        };
        /*this.arrowImg.onload = function(){
            context.drawImage(this, 200, 200);
        }*/

    }

    initCanvas(context){
        this.initImages(context);
        console.log('init canvas');
    }

    updateCanvas(){
        if(this.state.isFinished)
            return;
        let context = this.refs.canvas.getContext('2d');

        /* draw background */
        context.drawImage(this.backgroundImg, 0, 0);

        /* draw bow */
        this.drawBow(context);

        /* draw regular ducks */
        this.state.ducks.forEach(element => {
            context.drawImage(this.duckImg, element.x, element.y);
        });

        /* draw bonus ducks */
        this.state.bonusDucks.forEach(element => {
            context.drawImage(this.bonusDuckImg, element.x, element.y);
        })

        /* draw arrows */
        this.state.arrows.forEach(element => {
            this.drawArrow(context, element);
        })

        /* draw power bar */
        if(this.state.bow.isStretching)
            this.drawPowerBar(context);
    }

    handleMouseMove(event){
        this.rotateBow(event);
    }

    handleMouseUp(event){
        this.releaseArrow(event);
    }
    
    handleMouseDown(event){
        this.startStretching(event);
    }

    /* get bow rotation from mouse Y-position */
    rotateBow(event){
        let bow = {...this.state.bow};
        bow.rotation = this.calculateAngle(event.screenY);
        this.setState({bow})
    }

    releaseArrow(event){
        let arrows = this.state.arrows;
        let bow = {...this.state.bow};
        let newArrow = {
            x: 150,
            y: 300,
            vx: Math.sin(bow.rotation)*bow.power/2.5,
            vy: Math.cos(bow.rotation)*bow.power/2.5,
            rotation: this.state.bow.rotation,
        };
        arrows.push(newArrow);
        bow.isStretching = false;
        bow.power = 0;
        this.setState({bow});
        this.setState({arrows});
        //console.log(this.state)
    }

    startStretching(event){
        let bow = {...this.state.bow};
        bow.isStretching = true;
        this.setState({bow});
    }

    drawBow(context){
        context.save();
        context.translate(this.state.bow.x*1.5, this.state.bow.y);
        context.rotate(this.state.bow.rotation);
        context.translate(-this.state.bow.x*1.5, -this.state.bow.y);
        context.drawImage(this.bowImg, this.state.bow.x, this.state.bow.y);
        context.restore();
    }

    drawArrow(context, arrow){
        context.save();
        context.translate(arrow.x*1.0, arrow.y);
        context.rotate(arrow.rotation);
        context.translate(-arrow.x*1.0, -arrow.y);
        context.drawImage(this.arrowImg, arrow.x, arrow.y);
        context.restore();
    }

    drawPowerBar(context){
        context.fillStyle = "#FF0000";
        context.fillRect(200, 300, 20, 100);
        context.fillStyle = "#000000";
        context.fillRect(200, 300, 20, 100-this.state.bow.power);
    }

    calculateAngle(mouseY){
        return Math.PI/24*39+mouseY/250;
    }

    checkCollisions(arrow){
        // arrow is out of map
        if(arrow.x>this.state.width || arrow.x < 0)
            return;

        let ducks = this.state.ducks;
        let bonusDucks = this.state.bonusDucks;

        /* get all regular ducks alive */
        const aliveDucks = ducks.filter(duck => 
            !(arrow.y <= duck.y+this.duckImg.height && arrow.y >= duck.y 
                && arrow.x+this.arrowImg.width/2 >= duck.x && arrow.x+this.arrowImg.width/2 <= duck.x+this.duckImg.width))
        
        /* get all bonus ducks alive */
        const aliveBonusDucks = bonusDucks.filter(duck => 
            !(arrow.y <= duck.y+this.bonusDuckImg.height && arrow.y >= duck.y 
                && arrow.x+this.arrowImg.width/2 >= duck.x && arrow.x+this.arrowImg.width/2 <= duck.x+this.bonusDuckImg.width))

        /* calculate number of dead ducks */
        let deadDucks = ducks.length - aliveDucks.length;
        let deadBonusDucks = bonusDucks.length - aliveBonusDucks.length;

        /* update stats if something is shot */
        if(deadDucks+deadBonusDucks>0)
            this.props.onPointsChange(this.state.score+deadDucks, this.state.bonusPoints+deadBonusDucks);

        this.setState((state) => ({
            ducks: aliveDucks,
            bonusDucks: aliveBonusDucks,
            score: state.score += deadDucks,
            bonusPoints: state.bonusPoints += deadBonusDucks
        }))
    }

    loop(){
        this.setState((state) => {
            /* update ducks regular position */
            const ducksArray = state.ducks.map(duck => ({
                x: duck.x - duck.speed,
                y: duck.y,
                speed: duck.speed
            }))

            /* update bonus ducks position */
            const bonusDucksArray = state.bonusDucks.map(bonusDuck => ({
                x: bonusDuck.x - bonusDuck.speed,
                y: bonusDuck.y,
                speed: bonusDuck.speed
            }))

            /* update arrows position and rotation*/
            const arrowsArray = state.arrows.map(arrow => ({
                x: arrow.x + arrow.vx,
                y: arrow.y - arrow.vy,
                vy: arrow.vy - this.GRAVITY,
                vx: arrow.vx,
                rotation: Math.sign(arrow.vx)*Math.PI/2-Math.atan(arrow.vy/arrow.vx) 
            }))

            /* get rid of arrows that fell below the map */
            const arrowsInMap = arrowsArray.filter(arrow => arrow.y < this.state.height)
            return {
                ducks: ducksArray, 
                bonusDucks: bonusDucksArray,
                arrows: arrowsInMap   
            };
        });

        /* check collisions and update score */
        this.state.arrows.forEach(arrow => this.checkCollisions(arrow));

        /* update power bar */
        if(this.state.bow.isStretching){
            let bow = {...this.state.bow};
            if(bow.power > 100)
                bow.power = 0;
            else
                bow.power += this.state.bow.powerIncrease;
            
            this.setState({bow});
        }

        /* update missing ducks */
        const missedDucks = this.state.ducks.filter(duck => duck.x < -30).length

        /* check if player lost */
        if(missedDucks === this.props.maxDucksMissed)
            this.setState({isFinished: true})

        /* update number of missed ducks */
        if(missedDucks !== this.state.missedDucks){
            this.setState({missedDucks: missedDucks});
            this.props.onDuckMissed(missedDucks);
        }

        /* check if all ducks are dead or have flown away, so the level can be increased */
        if(this.state.ducks.concat(this.state.bonusDucks).filter(duck => duck.x > -100).length === 0){
            this.setState((state) => ({
                level: state.level+1
            }))

            /* create new ducks */
            this.initDucks(this.state);

            /* update level stat */
            this.props.onLevelUp(this.state.level);

            /* debug */
            console.log('leveled up', this.state.level);
            console.log('score', this.state.score);
            console.log('bonus points', this.state.bonusPoints);
        }

        /* animate only if player hasn't lost */
        if(!this.state.isFinished)
            requestAnimationFrame(this.loop.bind(this));
        else 
            this.finishGame();
    }



    render(){
        return (
            <canvas width={this.state.width} height={this.state.height} ref="canvas" 
                    onMouseMove={this.handleMouseMove.bind(this)}
                    onMouseUp={this.handleMouseUp.bind(this)}
                    onMouseDown={this.handleMouseDown.bind(this)}></canvas>
        );
    }
    
}

export default GameCanvas;