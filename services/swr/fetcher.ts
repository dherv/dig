export const fetcher = (
  resource: RequestInfo,
  init?: RequestInit
): Promise<Response> => fetch(resource, init).then((res) => res.json());
