import { createContext } from "react";

const boardContext = createContext({
    activeToolItem : "",
    toolActionType: "",
    elements : [],
    history : [[]],
    index : 0,
    changeToolItemClick : ()=>{},
    boardMouseDownHandler : ()=>{},
    boardMouseMoveHandler : ()=>{},
    boardMouseUpHandler : ()=>{},
}
);

export default boardContext;