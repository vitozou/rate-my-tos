import { useState } from "react";

import '@fontsource/roboto/300.css';
import splashart from "./assets/splashart.png";
import "./popup.css";

function IndexPopup() {
  const [data, setData] = useState("")

  return (
    <>
      <div
        id="popup"
      >
        <img
          src={splashart}
        />
        <h2>
          Detecting terms of service conditions...
        </h2>
        {/* <input onChange={(e) => setData(e.target.value)} value={data} /> */}
      </div>
    </>
  )
}

export default IndexPopup
