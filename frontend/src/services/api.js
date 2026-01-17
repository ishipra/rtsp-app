const API_BASE = "http://127.0.0.1:5000";

export async function getOverlays() {
  const response = await fetch(`${API_BASE}/api/overlays`);
  return response.json();
}

export async function updateOverlay(id, data) {
  await fetch(`${API_BASE}/api/overlays/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
}

export async function deleteOverlay(id) {
  await fetch(`http://127.0.0.1:5000/api/overlays/${id}`, {
    method: "DELETE"
  });
}


export async function createOverlay() {
  const response = await fetch("http://127.0.0.1:5000/api/overlays", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      type: "text",
      content: "New Overlay",
      x: 100,
      y: 100,
      width: 200,
      height: 60
    })
  });

  return response.json();
}
