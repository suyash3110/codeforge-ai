const API_URL = "http://127.0.0.1:8000";

export async function analyzeRepository(githubUrl: string) {
  const response = await fetch(`${API_URL}/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      github_url: githubUrl,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to analyze repository");
  }

  return response.json();
}

export async function askQuestion(question: string) {
  const response = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to get AI response");
  }

  return response.json();
}