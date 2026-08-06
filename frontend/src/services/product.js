const API_BASE = import.meta.env.VITE_API_URL || "/api";
const DEFAULT_TIMEOUT_MS = 8000;

class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

function buildQuery(params) {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value) searchParams.set(key, value);
  }
  return searchParams.toString();
}

async function request(path, { timeout = DEFAULT_TIMEOUT_MS } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(`${API_BASE}${path}`, {
      signal: controller.signal,
    });

    if (!res.ok) {
      let detail = `Request failed with status ${res.status}`;
      try {
        const body = await res.json();
        if (body && typeof body.detail === "string" && body.detail) {
          detail = body.detail;
        }
      } catch {
        // Non-JSON error body; keep the status-based message.
      }
      throw new ApiError(res.status, detail);
    }

    return res.json();
  } catch (err) {
    if (err.name === "AbortError") {
      const timeoutError = new Error("Request timed out");
      timeoutError.name = "TimeoutError";
      throw timeoutError;
    }
    if (err.name === "TypeError") {
      const networkError = new Error("Network request failed");
      networkError.name = "NetworkError";
      throw networkError;
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

export function fetchProducts({ search = "", category = "" } = {}) {
  const query = buildQuery({ search, category });
  return request(`/products${query ? `?${query}` : ""}`);
}

export function fetchCategories() {
  return request("/categories");
}

export function fetchProduct(id) {
  return request(`/products/${id}`);
}
