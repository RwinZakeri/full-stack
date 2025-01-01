const NotFound = (req, res) => {
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.write("not found");
  res.end();
};

module.exports = NotFound;
