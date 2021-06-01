import React from 'react'
import LocalStorageService from "../../services/LocalStorage";
import { websocketUrl } from "../../config"
import ReconnectingWebSocket from "reconnecting-websocket";
import './style.css'
import EraserIcon from "../../icons/Eraser"
import PencilIcon from "../../icons/Pencil";
import DustbinIcon from "../../icons/Dustbin";
import styled from "styled-components";
import CameraIcon from "../../icons/Camera";

const BoxContainer = styled.div`
  height: calc(var(--vh, 1vh) * 100);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

class Board extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            tooltype: 'draw',
            brushSize: 30,
            strokeStyle: 'black'
        }
        const OPTIONS = {
            connectionTimeout: 1000,
            maxRetries: 3,
        };
        const endpoint = "/canvas/" + this.props.roomId + "/?token=" + LocalStorageService.getAccessToken();
        this.client = new ReconnectingWebSocket(websocketUrl + endpoint, [], OPTIONS);
    }

    componentDidMount() {
        this.canvas = document.querySelector('#canvas');
        this.ctx = this.canvas.getContext("2d");
        this.ctx.translate(0.5, 0.5);
        this.socketEvents()
        this.drawCanvas()
    }

    socketEvents(){
        this.client.onopen = () => {
            console.log("connected...");
        }
        this.client.onmessage = (event) => {
            const data = JSON.parse(event.data)
            if(data["code"] === 400 || data["code"] === 401) console.log(data["message"])
            else {
                if (typeof (data["message"]) === "string") {
                    console.log(JSON.parse(data["message"]));
                } else if (data["message"]["host"] === true) {
                    this.setState({
                        host: true
                    })
                } else if (data["message"]["host"] === false) {
                    this.setState({
                        host: false
                    })
                }
                else {
                    const draw_event_ws = data["message"];
                    console.log(draw_event_ws)
                    const ctx = this.ctx;
                    if (draw_event_ws.clear === true) ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                    else {
                        ctx.beginPath();
                        if (draw_event_ws.erase === true) {
                            ctx.globalCompositeOperation = 'destination-out';
                            // ctx.lineWidth = this.state.brushSize;
                            ctx.lineWidth = 30;
                        } else {
                            ctx.globalCompositeOperation = 'source-over';
                            // ctx.strokeStyle = this.state.strokeStyle;
                            ctx.strokeStyle = 'black';
                            // ctx.lineWidth = this.state.brushSize;
                            ctx.lineWidth = 30;
                        }
                        ctx.moveTo(draw_event_ws.prev_coord.x, draw_event_ws.prev_coord.y);
                        ctx.lineTo(draw_event_ws.x, draw_event_ws.y);
                        ctx.lineJoin = 'round';
                        ctx.lineCap = 'round';
                        ctx.stroke();
                    }
                }
            }
        }
        this.client.onclose = () => {
            console.log("close")
        }
    }

    drawCanvas() {
        var that = this;
        var canvasx = document.querySelector("#canvas").offsetLeft;
        var canvasy = document.querySelector("#canvas").offsetTop;
        var last_mousex = 0;
        var last_mousey = 0;
        var mousex = 0;
        var mousey = 0;
        var mousedown = false;
        //Mousedown
        document.querySelector("#canvas").addEventListener('mousedown', function(e) {
            if (that.state.host === true) {
                last_mousex = mousex = parseInt(e.clientX - canvasx);
                last_mousey = mousey = parseInt(e.clientY - canvasy);
                mousedown = true;
            }
        });
        //Mouseup
        document.querySelector("#canvas").addEventListener('mouseup', function(e) {
            if (that.state.host === true) {
                mousedown = false;
            }
        });
        //Mousemove
        document.querySelector("#canvas").addEventListener('mousemove', function(e) {
            if (that.state.host === true) {
                mousex = parseInt(e.clientX - canvasx);
                mousey = parseInt(e.clientY - canvasy);
                if(mousedown) {
                    let draw_event = {
                        prev_coord: {
                            x: last_mousex,
                            y: last_mousey
                        },
                        erase: that.state.tooltype === 'erase',
                        x: mousex,
                        y: mousey,
                    };
                    that.client.send(JSON.stringify(draw_event));
                }
                last_mousex = mousex;
                last_mousey = mousey;
            }
        });
    }

     tool(t){
         if (this.state.host === true) {
            this.setState({
                tooltype: t
            })
         }
    }
    captureCanvas() {
        console.log(this.canvas.toDataURL())
    }
    clearCanvas() {
        if (this.state.host === true) {
            window.alert("Sure?");
            this.client.send(JSON.stringify({clear: true}))
        }
    }

    render() {
        return (
            <BoxContainer>
                <div className="toolbar">
                    <div className="whiteboard-tool" onClick={() => this.tool('draw')}>
                        <PencilIcon width={30} height={30}/>
                    </div>
                    <div className="whiteboard-tool" onClick={() => this.tool('erase')}>
                        <EraserIcon width={30} height={30}/>
                    </div>
                    <div className="whiteboard-tool" onClick={() => this.clearCanvas()}>
                        <DustbinIcon width={30} height={30}/>
                    </div>
                    <div className="whiteboard-tool" onClick={() => this.captureCanvas()}>
                        <CameraIcon width={30} height={30}/>
                    </div>
                </div>
                <div className="clearfloat"/>
                <canvas id="canvas" width={window.innerWidth} height={window.innerHeight} />
            </BoxContainer>
        )
    }
}

export default Board