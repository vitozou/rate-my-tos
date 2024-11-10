import { useState, useEffect } from "react";

import '@fontsource/roboto/300.css';
import splashart from "./assets/splashart.png";
import "./popup.css";

function IndexPopup() {
  const API_HOST = "http://127.0.0.1:8000/api";

  const [currentURL, setCurrentURL] = useState("");
  const [data, setData] = useState("");

  useEffect(() => {
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
    );
  }, [chrome]);

  useEffect(() => {
    const scrapeTOS = async () => {
      if(currentURL){
        try {
          const response = await fetch(`${API_HOST}/run-script/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ url: currentURL }),
          });
    
          const data = await response.json();
          console.log(data);

          if (response.ok) {
            setData(data["response"]);
          } else {
            console.error("Error:", data.error);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };

    scrapeTOS();
  }, [currentURL]);  

  return (
    <>
      <div id="popup">
        <img src={splashart}/>
        <h2>
          Detecting terms of service conditions...
          {data}
        </h2>
        {/* <input onChange={(e) => setData(e.target.value)} value={data} /> */}
      </div>
    </>
  )
}

export default IndexPopup
