export function sendJson(res, statusCode, payload) {
  if (typeof res?.status === 'function') {
    return res.status(statusCode).json(payload);
  }

  res.statusCode = statusCode;
  if (typeof res?.setHeader === 'function') {
    res.setHeader('Content-Type', 'application/json');
  }

  if (typeof res?.end === 'function') {
    res.end(JSON.stringify(payload));
  }

  return payload;
}
