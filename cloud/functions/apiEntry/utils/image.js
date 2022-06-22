function getClipImageUrl(url, size) {
  return (url || "").replace(/\/(\d+x\d+)bb\./, '/' + size + 'x' + size + 'bb.');
}

module.exports = {
  getClipImageUrl,
}
