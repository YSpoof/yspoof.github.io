"use strict";

import { displayError, onPageLoad, swRegister } from "./example.js";

/*
We should probably create an array like to store functions to be 
executed on page load, those can be imported or added by other
scripts via window.FunctionName see example.js

function loadFunctions() {
  let arrayOfFunctions = [doABarrellRoll, doTheHarlemShake, doTheMacarena];
  arrayOfFunctions.forEach((func) => {
    func();
  });
}

*/
function dontIntercept(e) {
  // This is a PDF file, let the browser handle it.
  if (e.destination.url.includes("pdf")) {
    return true;
  }

  return (
    !e.canIntercept ||
    // If this is just a hashChange,
    // just let the browser handle scrolling to the content.
    e.hashChange ||
    // If this is a download,
    // let the browser perform the download.
    e.downloadRequest ||
    // If this is a form submission,
    // let that go to the server.
    e.formData
  );
}

onPageLoad();

// Register SW
swRegister();

// self-loader
(() => {
  if (!window.navigation) {
    console.error("💀 GambiRouter -> NOT loaded: API unavailable...");
    return;
  }

  console.log("🧙‍♂️ GambiRouter -> loaded");

  navigation.addEventListener("navigate", (event) => {
    if (dontIntercept(event)) return;

    const url = new URL(event.destination.url);

    event.intercept({
      async handler() {
        console.log("🛥️ Navigating to: " + url.pathname);
        let result = await fetch(url);
        if (!result.ok) {
          let status = result.status;
          let text = await result.text();
          displayError(`${status} - ${text}`);

          return;
        }

        let html = await result.text();
        let newDom = new DOMParser().parseFromString(html, "text/html");

        event.scroll();
        if (document.startViewTransition) {
          document
            .startViewTransition(() => {
              document
                .getElementById("mainContent")
                .replaceWith(newDom.getElementById("mainContent"));
              document.title = newDom.title;
            })
            .finished.then(() => {
              onPageLoad();
              // we can also load more functions here
              // loadFunctions();
            });
        } else {
          document
            .getElementById("mainContent")
            .replaceWith(newDom.getElementById("mainContent"));
          document.title = newDom.title;
          onPageLoad();
          // we can also load more functions here
          // loadFunctions();
        }
      },
    });
  });
})();
