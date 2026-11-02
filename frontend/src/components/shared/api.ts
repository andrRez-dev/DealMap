type ApiErrorResponse = {
  message?: string;
};

export function getRequestHeaders(): HeadersInit {
  const token = import.meta.env.VITE_FRONTEND_TOKEN;
  const userToken = localStorage.getItem("client_token");

  if (!token || !userToken) {
    throw new Error("Unable to retrieve the authorization token.");
  }

  return {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    "X-Client-Token": userToken,
  };
}

function isApiErrorResponse(value: unknown): value is ApiErrorResponse {
  return (
    typeof value === "object" &&
    value !== null &&
    "message" in value &&
    (typeof value.message === "string" || value.message === undefined)
  );
}

export async function readResponse<T>(
  response: Response,
  action: string,
): Promise<T> {
  let data: unknown;

  try {
    data = await response.json();
  } catch {
    throw new Error(`${action}: the server returned an invalid response.`);
  }

  if (!response.ok) {
    const message = isApiErrorResponse(data) ? data.message : undefined;
    throw new Error(message || `${action} (status ${response.status}).`);
  }

  return data as T;
}
