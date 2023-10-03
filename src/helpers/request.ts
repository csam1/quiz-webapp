export default async function request<T>(args: RequestArgs): Promise<T> {
  const { path, payload, method } = args;
  const response = await fetch(path, {
    method,
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
  return response;
}

interface RequestArgs {
  path: string;
  payload?: Record<string, unknown>;
  method: string;
}
