export function healthcheckHandler(req, res) {
  res.status(200).end('<html><head></head><body><p>Success</p></body></html>');
}
