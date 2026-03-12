import axios from "axios";

// fetchers/commonFetcher.ts
export const commonFetcher = async (url: string, options?: { method?: string; body?: any }) => {
  const token = localStorage.getItem('serviceToken');

  // default to GET if no body/method is provided
  const method = options?.method || (options?.body ? 'POST' : 'GET');

  const res = await fetch(url, {
    method,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    ...(options?.body ? { body: JSON.stringify(options.body) } : {}), // only include body if provided
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || 'Network response was not ok');
  }

  return res.json();
};
