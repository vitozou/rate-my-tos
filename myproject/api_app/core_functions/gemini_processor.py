import google.generativeai as genai
import json
import os
from dotenv import load_dotenv
load_dotenv()

API_KEY = os.getenv('PROJECT_API_KEY')


def runGemini(currentPolicy: str) -> str:
    """
    Performs analysis on the Terms of Service and Privacy Policy with Google's Gemini LLM.
    
    Args:
        currentPolicy : str
            The text of the company's Terms of Service and Privacy Policy.
    
    Returns:
        response : str
            A JSON-formatted string with grading and comments.
    """

    print("Running Gemini \n\n")

    genai.configure(api_key=API_KEY)

    model = genai.GenerativeModel("gemini-1.5-flash")

    TOS_and_Privacy = currentPolicy

    json_structure = """
    {
        "Transparency": {
            "score": _,
            "comment": "___"
        }
        "User_Data_Privacy": {
            "score": _,
            "comment": "___"
        }
        "User_Rights_and_Ownership": {
            "score": _,
            "comment": "___"
        }
        "Termination_Conditions": {
            "score": _,
            "comment": "___"
        }
        "Third_Party_Data_Sharing": {
            "score": _,
            "comment": "___"
        }
        "Data_Security_and_Protections: {
            "score": _,
            "comment": "___"
        }
        "Red_Flags: {
            "Excessively_accesses_user_data": _,
            "Claims_ownership_of_user_content": _,
            "Right_to_sell_user_data": _,
            "Important_agreements_are_not_explicitly_mentioned": _,
            "Policy_changes_without_informing_user": _,
        }
        "Overall_score": _,
        "Summary": "___"
    }
    """

    prompt = f"""
    I will provide you with a company's TOS and privacy policy from their sign up page and I want you to grade them on several categories on a scale from 1 to 5. 
    1 is failing, 2 is poor, 3 is satisfactory, 4 is good, and 5 is excellent. 
    The categories are: "Transparency", "User Data Privacy", "User Rights and Ownership", "Termination Conditions", "Third Party Data Sharing", and "Data Security and Protections"
    After you grade them on each category, provide each grade with a short 1 sentence comment explaining the reason for the score.

    Then, I want you to check for the following red flags:
    1) The company accessing user data that the company has no reason to be accessing.
    2) The company owns any thing created or uploaded with their service.
    3) The company reserves the right to sell your data.
    4) The user must agree to something that isn't explicitly told to them.
    5) The company can amend their terms of service or privacy policy without informing the user.

    Lastly, I want you to give an average score by averaging the scores across the categories as well as deducting based on any red flags. Then provide a short 2-3 sentence summary.

    TOS and Privacy Policy: {TOS_and_Privacy}

    I want you to output your answer in JSON with this format:
    "score" should be an integer from 1 to 5, "comment" should be 1 sentence, "Red_Flags" should be set to true or false, "Overall_score" should be an integer from 1 to 5, and "Summary" should be 2-3 sentences.
    {json_structure}
    """

    response = model.generate_content(prompt)
    response = response.text
    response_lines = response.splitlines()[1:-1]
    response = "\n".join(response_lines)

    return response