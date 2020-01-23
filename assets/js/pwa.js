"use strict";
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault"),
  _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator")),
  _asyncToGenerator2 = _interopRequireDefault(
    require("@babel/runtime/helpers/asyncToGenerator")
  );
"serviceWorker" in navigator &&
  window.addEventListener("load", function() {
    navigator.serviceWorker.register("/sw.js");
  });
var pwaInstalled = "yes" == localStorage.getItem("pwaInstalled");
window.matchMedia("(display-mode: standalone)").matches &&
  (localStorage.setItem("pwaInstalled", "yes"), (pwaInstalled = !0)),
  !0 === window.navigator.standalone &&
    (localStorage.setItem("pwaInstalled", "yes"), (pwaInstalled = !0)),
  (document.getElementById("installPWA").style.display = pwaInstalled
    ? "none"
    : "block");
var deferredPrompt = null;
function installPWA() {
  return _installPWA.apply(this, arguments);
}
function _installPWA() {
  return (_installPWA = (0, _asyncToGenerator2.default)(
    _regenerator.default.mark(function e() {
      return _regenerator.default.wrap(function e(t) {
        for (;;)
          switch ((t.prev = t.next)) {
            case 0:
              deferredPrompt &&
                (deferredPrompt.prompt(),
                deferredPrompt.userChoice.then(function(e) {
                  var t;
                  "accepted" === e.outcome
                    ? console.log("Your PWA has been installed")
                    : console.log("User chose to not install your PWA"),
                    (deferredPrompt = null);
                }));
            case 1:
            case "end":
              return t.stop();
          }
      }, e);
    })
  )).apply(this, arguments);
}
window.addEventListener("beforeinstallprompt", function(e) {
  deferredPrompt = e;
}),
  window.addEventListener("appinstalled", function(e) {
    localStorage.setItem("pwaInstalled", "yes"),
      (pwaInstalled = !0),
      (document.getElementById("installPWA").style.display = "none");
  });
