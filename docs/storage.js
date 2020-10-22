if (typeof Storage !== "undefined") {
  sessionStorage.setItem("outerHTML", document.documentElement.outerHTML);
}
document.documentElement.outerHTML = sessionStorage.getItem("outerHTML");
