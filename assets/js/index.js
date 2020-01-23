"use strict";
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault"),
  _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator")),
  _asyncToGenerator2 = _interopRequireDefault(
    require("@babel/runtime/helpers/asyncToGenerator")
  ),
  urlinput = document.getElementById("urlinput"),
  custominput = document.getElementById("custominput"),
  sbtn = document.getElementById("sbtn"),
  status = document.getElementById("status"),
  erbox = document.getElementById("erbox"),
  output = document.getElementById("output"),
  alias = document.getElementById("alias"),
  shortenedURL = document.getElementById("shortenedURL"),
  sucess = document.getElementById("sucess"),
  qr = document.getElementById("qr"),
  pushJSON = function e(t, n) {
    var o = new XMLHttpRequest();
    o.open("POST", t, !0),
      o.setRequestHeader("Content-Type", "application/json; charset=UTF-8"),
      o.send(JSON.stringify(n));
  },
  cinp = function e() {
    var t = custominput.value,
      n,
      o = JSON.parse(fetchJSON("".concat(endpoint, "/").concat(t))).result;
    return null == o && (null == o || void 0);
  },
  geturl = function e() {
    var t;
    return urlinput.value;
  },
  getrandom = function e() {
    for (
      var t = "",
        n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
        o = 0;
      o < 5;
      o++
    )
      t += n.charAt(Math.floor(Math.random() * n.length));
    return t;
  },
  genhash = function e() {
    "" == custominput.value
      ? ((window.location.hash = getrandom()), check_is_unique())
      : (window.location.hash = custominput.value);
  },
  check_is_unique = function e() {
    var t = window.location.hash.substr(1),
      n,
      o;
    null != JSON.parse(fetchJSON("".concat(endpoint, "/").concat(t))).result &&
      genhash();
  },
  copyer = function e(t) {
    var n = document.getElementById(t);
    if (document.selection)
      if ("input" === n.nodeName.toLowerCase())
        n.select(), document.execCommand("copy");
      else {
        var o = document.body.createTextRange();
        o.moveToElementText(n), o.select(), document.execCommand("copy");
      }
    else if (window.getSelection)
      if ("input" === n.nodeName.toLowerCase())
        n.select(), document.execCommand("copy");
      else {
        var r = document.createRange();
        r.selectNode(n),
          window.getSelection().removeAllRanges(),
          window.getSelection().addRange(r),
          document.execCommand("copy");
      }
  },
  createFrame = function e(t) {
    return "<a href='"
      .concat(t, "' target='_blank'><img src='")
      .concat(t, "' alt='QR code'></a>");
  },
  send_request = function e(t) {
    var n = t,
      o = "".concat(endpoint, "/").concat(window.location.hash.substr(1));
    pushJSON(o, n),
      (urlinput.value = ""),
      (custominput.value = ""),
      (status.innerHTML = "shorten"),
      (output.style.display = "block"),
      (shortenedURL.value = window.location.href),
      copyer("shortenedURL"),
      (sucess.innerHTML = "short url copied to clipboard"),
      (qr.innerHTML = createFrame(
        "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=".concat(
          shortenedURL.value
        )
      ));
  },
  sleep = function e(t) {
    return new Promise(function(e) {
      return setTimeout(e, t);
    });
  },
  shorturl = (function() {
    var t = (0, _asyncToGenerator2.default)(
      _regenerator.default.mark(function e() {
        var n, o, r, a;
        return _regenerator.default.wrap(function e(t) {
          for (;;)
            switch ((t.prev = t.next)) {
              case 0:
                return (
                  (status.innerHTML = "shortening..."),
                  (erbox.style.display = "none"),
                  (output.style.display = "none"),
                  (t.next = 5),
                  sleep(250)
                );
              case 5:
                (n = geturl()),
                  (r = /^([a-zA-Z0-9_-]+)$/),
                  (a = (o = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/).test(
                    n
                  ))
                    ? "" == custominput.value
                      ? (genhash(),
                        send_request(n),
                        (alias.innerHTML = "shortened"))
                      : r.test(custominput.value)
                      ? cinp()
                        ? (genhash(),
                          send_request(n),
                          (alias.innerHTML = "alias available"))
                        : ((custominput.value = ""),
                          (status.innerHTML = "shorten"),
                          (erbox.style.display = "block"),
                          (erbox.innerHTML =
                            "alias already in use, choose another"))
                      : ((custominput.value = ""),
                        (status.innerHTML = "shorten"),
                        (erbox.style.display = "block"),
                        (erbox.innerHTML =
                          "invalid optional custom alias, use only alphanumerics & underscore"))
                    : ((status.innerHTML = "shorten"),
                      (erbox.style.display = "block"),
                      (erbox.innerHTML = "invalid url"));
              case 10:
              case "end":
                return t.stop();
            }
        }, e);
      })
    );
    return function e() {
      return t.apply(this, arguments);
    };
  })();
sbtn.addEventListener("click", shorturl);
