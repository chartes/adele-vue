const getCookie = function  (cname) {
  const name = cname + "=";
  const ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export {
  getCookie
}