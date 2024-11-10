import { useState, useEffect } from "react";

import '@fontsource/roboto/300.css';
import splashart from "./assets/splashart.png";
import star from "./assets/star.svg";
import "./popup.css";
import DetailsComponent from "./DetailsComponent";

function IndexPopup() {
  const API_HOST = "http://127.0.0.1:8000/api";

  const [currentURL, setCurrentURL] = useState("");
  const [data, setData] = useState();
  const [showDetails, setShowDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [rating, setRating] = useState();

  const handleDetailsClick = () => {
    setShowDetails(true);
  };

  const handleBackClick = () => {
    setShowDetails(false);
  };

  const spawnLoadingWheel = () => {
    return (
      <div className="flex justify-center mt-4 space-x-2" role="status">
        <svg
          aria-hidden="true"
          className="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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

  const spawnStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <img
          key={i}
          src={star}
          alt={star}
          className={`w-6 h-6 ${i <= rating ? 'filter-yellow' : 'filter-gray'}`}
        />
      );
    }
    return stars;
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
          setIsLoading(true);
          setData(undefined);
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

          const response_data = await response.json();
          console.log(response_data);

          if (response.ok) {
            const data_obj = JSON.parse(response_data["result"]);
            setData(data_obj);
            setRating(data_obj["Overall_score"]);
          } else {
            console.error("Error:", response_data.error);
          }
        } catch (error) {
          console.error("Error:", error);
        } finally {
          setIsLoading(false)
        }
      }
    };

    scrapeTOS();
  }, [currentURL]);

  console.log(data);

  return (
    <>
      <div id="popup" className="p-4">
        <div className="flex justify-center mb-4">
          <img src={splashart} />
        </div>

        {!showDetails && (
          <>
            <h2 className="text-lg text-center">
              {isLoading ? "Detecting terms of service conditions..." : "Overall Rating"}</h2>
            {isLoading ? (
              spawnLoadingWheel()
            ) : (
              <div className="text-center mt-4">
                <div className="flex justify-center space-x-2 mb-6">{spawnStars(rating)}</div>
                <button onClick={handleDetailsClick} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-lg">Details</button>
              </div>
            )}
          </>
        )}

        {showDetails && (
          <>
            <DetailsComponent jsonData={data}/>
            {!isLoading && (
              <div className="text-center mt-4">
                <button onClick={handleBackClick} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded shadow-md mt-4">Back</button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default IndexPopup
