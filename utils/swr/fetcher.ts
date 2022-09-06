export const fetcher = (
  resource: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> => fetch(resource, init).then((res) => res.json());
