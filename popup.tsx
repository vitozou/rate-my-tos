import { useState, useEffect } from "react";

import '@fontsource/roboto/300.css';
import splashart from "./assets/splashart.png";
import "./popup.css";

function IndexPopup() {
  const [data, setData] = useState("")

  const [currentURL, setCurrentURL] = useState("");

  useEffect(
    () =>
      chrome.tabs.query(
        {
          active: true,
          currentWindow: true,
        },
        function (tabs) {
          const tab = tabs[0];
          if (tab.url) {
            setCurrentURL(tab.url);
          }
        },
      ),
    [chrome],
  );

  console.log(currentURL);

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
