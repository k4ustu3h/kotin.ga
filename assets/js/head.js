"use strict";
var endpoint = "https://www.jsonstore.io/98090d5a2f0e65870c1b1d4044419ad461181ac75909e5420d9893f7872fe65a",
  ebox = document.getElementById("erbox"),
  fetchJSON = function e(t)
  {
    var a = new XMLHttpRequest;
    return a.open("GET", t, !1), a.onreadystatechange = function (e)
    {
      4 === a.readyState && (200 === a.status || (ebox.style.display = "block", ebox.innerHTML = "network seems to be offline"))
    }, a.onerror = function ()
    {
      ebox.style.display = "block", ebox.innerHTML = "network error"
    }, a.send(), a.responseText
  },
  isURL = function e(t)
  {
    var a;
    return !!/^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/.test(t)
  },
  hashh = window.location.hash.substr(1);
if ("" != window.location.hash)
{
  var res = JSON.parse(fetchJSON("".concat(endpoint, "/").concat(hashh))),
    data = res.result;
  null != data && isURL(data) && (window.location.href = data)
}
