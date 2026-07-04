const resolveUrl = (path) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const base = (import.meta.env.VITE_API_BASE_URL || '').trim();

  if (!base) {
    return normalizedPath;
  }

  return `${base}${normalizedPath}`;
};

export async function requestJson(path, options = {}) {
  const response = await fetch(resolveUrl(path), {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });

  let data = {};
  try {
    data = await response.json();
  } catch {
    data = {};
  }

  return {
    ok: response.ok,
    status: response.status,
    data
  };
}

export { resolveUrl };
