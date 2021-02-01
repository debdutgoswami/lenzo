import React from 'react'
import { FaPencilAlt } from 'react-icons/fa'
import { FaEraser } from 'react-icons/fa'
import { FaTrash } from 'react-icons/fa'
import { FaStepBackward } from 'react-icons/fa'
import { FaStepForward } from 'react-icons/fa'
import { FaCheck } from 'react-icons/fa'
import slider from '../../slider.svg'

import './style.css'

function ContainerTest() {
    return (
        <>
        <div id="whiteboardContainer"></div>
        <div id="toolbar" style={{position: "absolute", top: "10px", left: "500px"}}>
            <div class="btn-group whiteboard-edit-group">
                <button
                    tool="pen"
                    title="Take the pen"
                    type="button"
                    class="whiteboard-tool active"
                >
                <FaPencilAlt />
                </button>
                <button tool="eraser" title="take the eraser" type="button" class="whiteboard-tool">
                <FaEraser />
                </button>
            </div>
            <div class="btn-group whiteboard-edit-group">
                <button id="whiteboardTrashBtn" title="Clear the whiteboard" type="button">
                    <FaTrash/>
                </button>
                <button
                    style={{position: "absolute", left: "0px", top: "0px", width: "46px", display: "none"}}
                    id="whiteboardTrashBtnConfirm"
                    title="Confirm clear..."
                    type="button"
                >
                    <FaCheck />
                </button>
                <button id="whiteboardUndoBtn" title="Undo your last step" type="button">
                    <FaStepBackward />
                </button>
                <button id="whiteboardRedoBtn" title="Redo your last undo" type="button">
                 <FaStepForward />
                </button>
            </div>
            <div class="btn-group whiteboard-edit-group">
                <button style={{width: "190px", cursor: "default"}}>
                    {/* <div
                        class="activeToolIcon"
                        style={{position: "absolute", top: "2px", left: "2px", fontSize: "0.6 + em"}}
                    >
                         <FaPencilAlt />
                    </div> */}
                    <img
                        style=
                            {{position: "absolute",
                            left: "11px",
                            top: "16px",
                            height: "14px",
                            width: "130px"}}
                        
                        src={slider}
                        alt=""
                    />
                    <input
                        title="Thickness"
                        id="whiteboardThicknessSlider"
                        style={{position: "absolute", left: "9px", width: "130px", top: "15px"}}
                        type="range"
                        min="1"
                        max="50"
                        defaultValue="3"
                    />
                    <div
                        id="whiteboardColorpicker"
                        style={{
                            position: "absolute",
                            left: "155px",
                            top: "10px",
                            width: "26px",
                            height: "23px",
                            borderRadius: "3px",
                            border: "1px solid black"
                        }}
                        data-color="#000000"
                    ></div>
                </button>
            </div>
        </div>
        </>
    )
}
export default ContainerTest