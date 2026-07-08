import os

from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise RuntimeError(
        "GEMINI_API_KEY not found in environment variables."
    )

genai.configure(api_key=api_key)

model = genai.GenerativeModel("gemini-2.5-flash")


def ask_gemini(prompt: str):

    try:

        response = model.generate_content(prompt)

        if not response.text:
            raise RuntimeError("Gemini returned an empty response.")

        return response.text

    except Exception as e:

        raise RuntimeError(
            f"Gemini API Error: {str(e)}"
        )