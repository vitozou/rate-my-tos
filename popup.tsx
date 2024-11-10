import { useState } from "react";

import '@fontsource/roboto/300.css';
import splashart from "./assets/splashart.png";
import "./popup.css";
import DetailsComponent from "./DetailsComponent";

function IndexPopup() {
  const [data, setData] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  //const result = fetch("http://127.0.0.1:8000/api/run-script/")
  //console.log(result)
  
  const handleDetailsClick = () => {
    setShowDetails(true);
  };

  const handleBackClick = () => {
    setShowDetails(false);
  };

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
          </>
        )}

      </div>
    </>
  );
}

export default IndexPopup
