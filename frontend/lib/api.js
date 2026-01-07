const API_BASE_URL = "http://localhost:8000";

/* ---------- LOGS ---------- */
export async function getLogs() {
  const res = await fetch(`${API_BASE_URL}/projects/logs`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch logs");
  }

  return res.json();
}

/* ---------- PROJECTS (already used) ---------- */
export async function getProjects() {
  const res = await fetch(`${API_BASE_URL}/projects`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }

  return res.json();
}


export async function getProjectById(projectId) {
  const res = await fetch(`${API_BASE_URL}/projects/${projectId}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch project");
  return res.json();
}


export async function createProject(name, goal) {
  const res = await fetch(`${API_BASE_URL}/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, goal }),
  });

  if (!res.ok) {
    throw new Error("Failed to create project");
  }

  return res.json();
}

export async function deleteProject(projectId) {
  const res = await fetch(`${API_BASE_URL}/projects/${projectId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete project");
  }

  return res.json();
}


export async function runProject(projectId) {
  const res = await fetch(
    `${API_BASE_URL}/projects/${projectId}/run`,
    { method: "POST" }
  );

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || `Failed to run AI: ${res.status}`);
  }

  return res.json();
}


export default API_BASE_URL;
