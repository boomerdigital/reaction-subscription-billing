var htmlReg = /<\/?([a-z][a-z0-9]*)\b[^>]*>?/gi;
module.exports = strip;

function strip(html){
  html = html || '';
  return html.replace(htmlReg, '').trim();
}
