import React, { useContext} from 'react';
import classes from "./index.module.css";
import cx from "classnames";

import {
  FaSlash,
  FaRegCircle,
  FaArrowRight,
  FaPaintBrush,
  FaEraser,
  FaUndoAlt,
  FaRedoAlt,
  FaFont,
  FaDownload,
} from "react-icons/fa";
import { LuRectangleHorizontal } from "react-icons/lu";
import boardContext from '../../store/board-context';
import { TOOL_ITEMS } from '../../constants';

const Toolbar = () => {
  const {activeToolItem, changeToolItemClick, undo, redo, handleDownload} = useContext(boardContext);

  return (
    <div className={classes.container}>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === TOOL_ITEMS.BRUSH,
        })}
        onClick={() => changeToolItemClick(TOOL_ITEMS.BRUSH)}
      >
        <FaPaintBrush />
      </div>
      <div className={cx(classes.toolItem, {[classes.active] : activeToolItem===TOOL_ITEMS.LINE})} onClick={()=>changeToolItemClick(TOOL_ITEMS.LINE)}>
        <FaSlash/>
      </div>
      <div className={cx(classes.toolItem, {[classes.active] : activeToolItem===TOOL_ITEMS.RECTANGLE})} onClick={()=>changeToolItemClick(TOOL_ITEMS.RECTANGLE)}>
        <LuRectangleHorizontal/>
      </div>
      <div className={cx(classes.toolItem, {[classes.active] : activeToolItem===TOOL_ITEMS.CIRCLE})} onClick={()=>changeToolItemClick(TOOL_ITEMS.CIRCLE)}>
        <FaRegCircle/>
      </div>
      <div className={cx(classes.toolItem, {[classes.active] : activeToolItem===TOOL_ITEMS.ARROW})} onClick={()=>changeToolItemClick(TOOL_ITEMS.ARROW)}>
        <FaArrowRight/>
      </div>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === TOOL_ITEMS.TEXT,
        })}
        onClick={() => changeToolItemClick(TOOL_ITEMS.TEXT)}
      >
        <FaFont />
      </div>
      <div className={cx(classes.toolItem, {[classes.active] : activeToolItem===TOOL_ITEMS.ERASER})} onClick={()=>changeToolItemClick(TOOL_ITEMS.ERASER)}>
        <FaEraser/>
      </div>
      <div className={classes.toolItem} onClick={undo}>
        <FaUndoAlt/>
      </div>
      <div className={classes.toolItem} onClick={redo}>
        <FaRedoAlt/>
      </div>
      <div className={classes.toolItem} onClick={handleDownload}>
        <FaDownload/>
      </div>
      
    </div>
  )
}

export default Toolbar