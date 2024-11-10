import React from "react";

function DetailsComponent({ jsonData }) {
  // Check if there are any true values in Red_Flags
  const hasRedFlags = Object.values(jsonData.Red_Flags).some(flag => flag);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="shadow-lg rounded-lg p-6">
        <div className="card-body">
          <h5 className="text-2xl font-bold text-gray-800 mb-4">
            Overall Score: <span className="text-indigo-600 font-normal">{jsonData.Overall_score} / 5</span>
          </h5>
          <p className="text-gray-700 mb-6">{jsonData.Summary}</p>

          <h5 className="text-xl font-bold text-gray-800 mt-8 mb-4">Policy Details</h5>
          <div className="space-y-8 text-gray-700">
            <div className="mb-4">
              <p className="font-bold inline">Transparency:</p>
              <span className="ml-2 text-gray-600">{jsonData.Transparency.score} / 5</span>
              <p>{jsonData.Transparency.comment}</p>
            </div>

            <div className="mb-4">
              <p className="font-bold inline">User Data Privacy:</p>
              <span className="ml-2 text-gray-600">{jsonData.User_Data_Privacy.score} / 5</span>
              <p>{jsonData.User_Data_Privacy.comment}</p>
            </div>

            <div className="mb-4">
              <p className="font-bold inline">User Rights and Ownership:</p>
              <span className="ml-2 text-gray-600">{jsonData.User_Rights_and_Ownership.score} / 5</span>
              <p>{jsonData.User_Rights_and_Ownership.comment}</p>
            </div>

            <div className="mb-4">
              <p className="font-bold inline">Termination Conditions:</p>
              <span className="ml-2 text-gray-600">{jsonData.Termination_Conditions.score} / 5</span>
              <p>{jsonData.Termination_Conditions.comment}</p>
            </div>

            <div className="mb-4">
              <p className="font-bold inline">Third Party Data Sharing:</p>
              <span className="ml-2 text-gray-600">{jsonData.Third_Party_Data_Sharing.score} / 5</span>
              <p>{jsonData.Third_Party_Data_Sharing.comment}</p>
            </div>

            <div className="mb-4">
              <p className="font-bold inline">Data Security and Protections:</p>
              <span className="ml-2 text-gray-600">{jsonData.Data_Security_and_Protections.score} / 5</span>
              <p>{jsonData.Data_Security_and_Protections.comment}</p>
            </div>
          </div>

          {hasRedFlags && (
            <div className="mt-8">
              <h5 className="text-xl font-bold text-red-600 mb-4" style={{color: "red"}}>Red Flags:</h5>
              <div className="text-red-600" style={{color: "red"}}>
                {Object.keys(jsonData.Red_Flags).map(
                  (flag, index) =>
                    jsonData.Red_Flags[flag] && (
                      <p key={index}>- {flag.replaceAll('_', ' ')}</p>
                    )
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailsComponent;
