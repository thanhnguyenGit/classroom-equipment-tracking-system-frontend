import React, { useRef, useState, useEffect } from "react";
import Popup from 'reactjs-popup'
import ClickableText from "./ClickableText";
import "../styles/NewDevicesMenu.scss"
function NewDevicesMenu() {
  const ref = useRef<any>(null);
  const exit = () => ref.current.close();
  return (
    <Popup
      ref={ref}
      trigger={<ClickableText text="Add devices" onClick={() => { }} />}
      modal
      nested
    >
      <div className="modal">
        <div className="header"> Add devices </div>
        <div className="content">
        </div>
        <div className="actions">
          <button className="savebutton" onClick={() => { }}>SAVE</button>
          <button
            className="exitbutton"
            onClick={exit}
          >
            Thoat
          </button>
        </div>
      </div>
    </Popup>
  );
}

export default NewDevicesMenu
