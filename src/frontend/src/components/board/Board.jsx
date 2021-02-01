import React from 'react'
import './style.css'

class Board extends React.Component {

    constructor(props) {
        super(props)

        // var canvas = document.querySelector("#canvas")
        // var ctx = canvas.getContext("2d")
        this.state = {
            tooltype: 'draw'
        }
    }

    componentDidMount() {
        this.canvas = document.querySelector('#canvas');
        this.ctx = this.canvas.getContext("2d");
        this.drawCanvas()
    }

    drawCanvas() {
        var that = this;
        var ctx = this.ctx;
        var canvasx = document.querySelector("#canvas").offsetLeft;
        var canvasy = document.querySelector("#canvas").offsetTop;
        var last_mousex = 0;
        var last_mousey = 0;
        var mousex = 0;
        var mousey = 0;
        var mousedown = false;
        //Mousedown
        document.querySelector("#canvas").addEventListener('mousedown', function(e) {
            last_mousex = mousex = parseInt(e.clientX-canvasx);
            last_mousey = mousey = parseInt(e.clientY-canvasy);
            mousedown = true;
        });
        //Mouseup
        document.querySelector("#canvas").addEventListener('mouseup', function(e) {
            mousedown = false;
        });
        
        //Mousemove
        document.querySelector("#canvas").addEventListener('mousemove', function(e) {
            mousex = parseInt(e.clientX-canvasx);
            mousey = parseInt(e.clientY-canvasy);
            if(mousedown) {
                ctx.beginPath();
                if(that.state.tooltype=='draw') {
                    ctx.globalCompositeOperation = 'source-over';
                    ctx.strokeStyle = 'black';
                    ctx.lineWidth = 30;
                } else {
                    ctx.globalCompositeOperation = 'destination-out';
                    ctx.lineWidth = 20;
                }
                ctx.moveTo(last_mousex,last_mousey);
                ctx.lineTo(mousex,mousey);
                ctx.lineJoin = 'round';
                ctx.lineCap = 'round';
                ctx.stroke();
            }
            last_mousex = mousex;
            last_mousey = mousey;
            
        });
    }

     tool(t){
        this.setState({
            tooltype: t
        })
    }
    clearCanvas() {
        window.alert("Sure?");
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    render() {
        return (
            <>
            
            <canvas id="canvas" width="1000" height="500"></canvas>
            <input type="button" value="draw" onClick={() => this.tool('draw')} />
            <input type="button" value="erase" onClick={() => this.tool('erase')} />
            <input type="button" value="clear" onClick={() => this.clearCanvas()} />
            </>
        )
    }
}

export default Board