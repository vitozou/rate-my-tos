import React from "react";

const jsonData = {
    "Transparency": { "score": 1, "comment": "The TOS and Privacy Policy are extremely vague and do not provide any meaningful information." },
    "User_Data_Privacy": { "score": 1, "comment": "The company explicitly states they will not secure user privacy." },
    "User_Rights_and_Ownership": { "score": 1, "comment": "The company does not mention any user rights or ownership." },
    "Termination_Conditions": { "score": 1, "comment": "No information is provided about termination conditions." },
    "Third_Party_Data_Sharing": { "score": 1, "comment": "There is no information about third party data sharing." },
    "Data_Security_and_Protections": { "score": 1, "comment": "The company explicitly states they will not secure user privacy." },
    "Red_Flags": {
      "accessing_unnecessary_user_data": true,
      "claims_ownership_of_user_content": true,
      "right_to_sell_user_data": true,
      "agreement_without_informing_user": true,
      "hidden_policy_amendments": true
    },
    "Overall_score": 1,
    "Summary": "This company has extremely concerning policies. They explicitly state their intention to sell user data and disregard privacy. These policies are alarmingly opaque and lack any mention of user rights or data security."
  };

  
function DetailsComponent() {
    return (

        <div className="container">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Overall Score: {jsonData.Overall_score}</h5>
            <p className="card-text"><strong>Summary:</strong> {jsonData.Summary}</p>
            
            <h5 className="card-title">Policy Details</h5>
            <div className="card-text">
              <p><strong>Transparency:</strong> {jsonData.Transparency.score}</p>
              <p>{jsonData.Transparency.comment}</p>
              
              <p><strong>User Data Privacy:</strong> {jsonData.User_Data_Privacy.score}</p>
              <p>{jsonData.User_Data_Privacy.comment}</p>
              
              {/* Continue with other fields similarly */}
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