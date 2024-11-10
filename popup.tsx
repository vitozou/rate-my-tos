import { useState, useEffect } from "react";

import '@fontsource/roboto/300.css';
import splashart from "./assets/splashart.png";
import "./popup.css";
import DetailsComponent from "./DetailsComponent";

function IndexPopup() {
  const API_HOST = "http://127.0.0.1:8000/api";

  const [currentURL, setCurrentURL] = useState("");
  const [data, setData] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleDetailsClick = () => {
    setShowDetails(true);
  };

  const handleBackClick = () => {
    setShowDetails(false);
  };

  const spawnLoadingWheel = () => {
    return (
      <div role="status">
        <svg
          aria-hidden="true"
          className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  };

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
      if (currentURL) {
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
      <div id="popup" className="p-4">
        <img src={splashart} />

        {!showDetails && (
          <>
            <h2 className="text-lg font-bold mb-4"> Detecting terms of service conditions...</h2>
            <button onClick={handleDetailsClick} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-lg">Details</button>
            {/* <input onChange={(e) => setData(e.target.value)} value={data} /> */}
          </>
        )}

        {showDetails && (
          <>
            <DetailsComponent />
            <button onClick={handleBackClick} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded shadow-md mt-4">Back</button>
            {isLoading && (
              <div>
                {spawnLoadingWheel()}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default IndexPopup
