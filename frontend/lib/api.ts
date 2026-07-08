const API_URL = "http://127.0.0.1:8000";

async function request(url: string, options?: RequestInit) {
  const response = await fetch(`${API_URL}${url}`, options);

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
}

export async function analyzeRepository(githubUrl: string) {
  return request("/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      github_url: githubUrl,
    }),
  });
}

export async function askRepository(question: string) {
  return request("/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question,
    }),
  });
}

export async function getRepositoryTree() {
  return request("/tree");
}

export async function getFileContent(path: string) {
  return request(`/file?path=${encodeURIComponent(path)}`);
}

export async function getRepositoryFiles() {
  return request("/files");
}

export async function getRepositoryDependencies() {
  return request("/dependencies");
}

export async function getRepositorySymbols() {
  return request("/symbols");
}

export async function getRepositoryCallGraph() {
  return request("/call-graph");
}

export async function getArchitectureGraph() {
  return request("/architecture-graph");
}

export async function getSecurityReport() {
  return request("/security-report");
}

async function fileAI(
  endpoint: string,
  fileName: string,
  code: string
) {
  return request(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      file_name: fileName,
      code,
    }),
  });
}

export const explainFile = (
  fileName: string,
  code: string
) => fileAI("/explain", fileName, code);

export const reviewFile = (
  fileName: string,
  code: string
) => fileAI("/review", fileName, code);

export const generateTests = (
  fileName: string,
  code: string
) => fileAI("/tests", fileName, code);

export const optimizeCode = (
  fileName: string,
  code: string
) => fileAI("/optimize", fileName, code);

export async function reviewEntireRepository() {
  return request("/repository-review", {
    method: "POST",
  });
}