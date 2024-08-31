import { useContext, useLayoutEffect, useEffect, useRef } from "react";
import rough from "roughjs";
import boardContext from "../../store/board-context";
import { TOOL_ACTION_TYPES, TOOL_ITEMS } from "../../constants";
import toolboxContext from "../../store/toolbox-context";
import classes from "./index.module.css";

function Board() {
  const canvasRef = useRef();
  const textAreaRef = useRef();
  const { elements, toolActionType, boardMouseDownHandler, boardMouseMoveHandler, boardMouseUpHandler, textAreaBlurHandler, undo, redo, handleDownload } = useContext(boardContext);

  const { toolboxState } = useContext(toolboxContext);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    
  }, []);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext("2d"); // Use lowercase "2d"
    // if (!context) return;

    context.save();

    const roughCanvas = rough.canvas(canvas);

    elements.forEach((element) => {
    switch (element.type) {
      case TOOL_ITEMS.LINE:
      case TOOL_ITEMS.RECTANGLE:
      case TOOL_ITEMS.CIRCLE:
      case TOOL_ITEMS.ARROW:
        roughCanvas.draw(element.roughEle);
        break;
      case TOOL_ITEMS.BRUSH:
        context.fillStyle = element.stroke;
        context.fill(element.path);
        context.restore();
        break;
      case TOOL_ITEMS.TEXT : {
        context.textBaseline = "top";
        context.font = `${element.size}px Caveat`;
        context.fillStyle = element.stroke;
        context.fillText(element.text, element.x1, element.y1);
        context.restore();
        break;
      }
      default :
        throw new Error("Type not recognized");
      }
    });

    return () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [elements]);

  useEffect(()=>{
    const textArea = textAreaRef.current;
    if(toolActionType === TOOL_ACTION_TYPES.WRITING){
      setTimeout(()=>{
        textArea.focus();
      }, 0)
    }
  }, [toolActionType]);

  useEffect(()=>{
    function handleKeyDown (event){
      if(event.ctrlKey && event.key === 'z'){
        undo(); 
      }
      else if(event.ctrlKey && event.key === 'y'){
        redo();
      }
      else if(event.ctrlKey && event.key === 's'){
        handleDownload();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return ()=>{
      document.removeEventListener("keydown", handleKeyDown);
    }   

  }, [undo, redo, handleDownload]);

  const handleMouseDown = (event) => {
    boardMouseDownHandler(event, toolboxState);
  };

  const handleMouseMove = (event) => {
      boardMouseMoveHandler(event, toolboxState);
  };

  const handleMouseUp = ()=>{
    boardMouseUpHandler();
  }

  return (
    <>
      {toolActionType === TOOL_ACTION_TYPES.WRITING && <textarea
        type = "text"
        ref={textAreaRef}
        className={classes.textElementBox}
        style={{
          top : elements[elements.length-1].y1,
          left : elements[elements.length-1].x1,
          fontSize: `${elements[elements.length - 1]?.size}px`,
          color: elements[elements.length - 1]?.stroke,
        }}
        onBlur={(event) => textAreaBlurHandler(event.target.value, toolboxState)}
      />}
      <canvas 
        ref={canvasRef} 
        id = "canvas"
        onMouseDown={handleMouseDown} 
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
    </>
  );
}

export default Board;
