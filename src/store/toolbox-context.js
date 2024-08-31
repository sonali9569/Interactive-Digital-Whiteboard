import { createContext } from "react";

const toolboxContext = createContext({
    toolboxContext : {},
    changeStrokeHandler : ()=>{},
    changeFillHandler : ()=>{},
    changeSize : ()=>{},
    

});

export default toolboxContext;