// src/config/api.ts
export const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

export const handleApiResponse = async (response: Response) => {
  const data = await response.json();

  if (!response.ok) {
    throw {
      code: response.status,
      message: data.message || "An error occurred",
      errors: data.errors,
    };
  }

  return data;
};

export const createApiClient = (token?: string) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return {
    headers,
    get: async (endpoint: string) => {
      // const paramsQuery = `search=${requestPayload.search}&published_date=${requestPayload.published_date}&source=${requestPayload.source}&author=${requestPayload.author}`
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers,
      });
      return handleApiResponse(response);
    },
    post: async (endpoint: string, data: unknown) => {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      });
      return handleApiResponse(response);
    },
  };
};

