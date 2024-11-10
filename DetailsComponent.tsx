import React from "react";

function DetailsComponent({ jsonData }) {
  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Overall Score: {jsonData.Overall_score}</h5>
          <p className="card-text">
            <strong>Summary:</strong> {jsonData.Summary}
          </p>

          <h5 className="card-title">Policy Details</h5>
          <div className="card-text">
            <p><strong>Transparency:</strong> {jsonData.Transparency.score}</p>
            <p>{jsonData.Transparency.comment}</p>

            <p><strong>User Data Privacy:</strong> {jsonData.User_Data_Privacy.score}</p>
            <p>{jsonData.User_Data_Privacy.comment}</p>

            <p><strong>User Rights and Ownership:</strong> {jsonData.User_Rights_and_Ownership.score}</p>
            <p>{jsonData.User_Rights_and_Ownership.comment}</p>

            <p><strong>Termination Conditions:</strong> {jsonData.Termination_Conditions.score}</p>
            <p>{jsonData.Termination_Conditions.comment}</p>

            <p><strong>Third Party Data Sharing:</strong> {jsonData.Third_Party_Data_Sharing.score}</p>
            <p>{jsonData.Third_Party_Data_Sharing.comment}</p>

            <p><strong>Data Security and Protections:</strong> {jsonData.Data_Security_and_Protections.score}</p>
            <p>{jsonData.Data_Security_and_Protections.comment}</p>
          </div>

          <h5 className="card-title">Red Flags</h5>
          <ul>
            {Object.keys(jsonData.Red_Flags).map((flag, index) => (
              jsonData.Red_Flags[flag] && <li key={index}>{flag.replaceAll('_', ' ')}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DetailsComponent;