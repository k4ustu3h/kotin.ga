"use strict";
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault"),
  _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator")),
  _asyncToGenerator2 = _interopRequireDefault(
    require("@babel/runtime/helpers/asyncToGenerator")
  ),
  erbox = document.getElementById("erbox"),
  keyinput = document.getElementById("key"),
  output = document.getElementById("output"),
  status = document.getElementById("status"),
  alias = document.getElementById("alias"),
  sucess = document.getElementById("sucess"),
  shortenedURL = document.getElementById("shortenedURL"),
  dbtn = document.getElementById("dbtn"),
  getkey = function e() {
    var t;
    return document.getElementById("key").value;
  },
  delKey = function e(t, n) {
    fetch("".concat(endpoint, "/").concat(t), { method: "DELETE" }),
      (keyinput.value = ""),
      (status.innerHTML = "delete"),
      (output.style.display = "block"),
      (alias.innerHTML = "alias found"),
      (shortenedURL.value = n),
      (sucess.innerHTML = "url deleted");
  },
  check_is_unique_alias = function e() {
    var t = keyinput.value,
      n,
      r = JSON.parse(fetchJSON("".concat(endpoint, "/").concat(t))).result;
    null != r
      ? delKey(t, r)
      : ((keyinput.value = ""),
        (status.innerHTML = "delete"),
        (erbox.style.display = "block"),
        (erbox.innerHTML = "alias not found"));
  },
  sleep = function e(t) {
    return new Promise(function(e) {
      return setTimeout(e, t);
    });
  },
  deleteurl = (function() {
    var t = (0, _asyncToGenerator2.default)(
      _regenerator.default.mark(function e() {
        var n, r;
        return _regenerator.default.wrap(function e(t) {
          for (;;)
            switch ((t.prev = t.next)) {
              case 0:
                return (
                  (status.innerHTML = "deleting..."),
                  (erbox.style.display = "none"),
                  (output.style.display = "none"),
                  (t.next = 5),
                  sleep(250)
                );
              case 5:
                (n = getkey()),
                  (r = /^([a-zA-Z0-9_-]+)$/),
                  "" == keyinput.value
                    ? ((status.innerHTML = "delete"),
                      (erbox.style.display = "block"),
                      (erbox.innerHTML = "invalid alias"))
                    : r.test(keyinput.value)
                    ? check_is_unique_alias()
                    : ((keyinput.value = ""),
                      (status.innerHTML = "delete"),
                      (erbox.style.display = "block"),
                      (erbox.innerHTML =
                        "invalid custom alias, use only alphanumerics & underscore"));
              case 8:
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
dbtn.addEventListener("click", deleteurl);
