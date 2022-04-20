const onPageLoad = () => {
  if (location.pathname == "/") {
    const statusId = document.getElementById("browserSupportStatus");
    const viewID = document.getElementById("viewTransitionSupport");
    const sinceSupports = document.getElementById("sinceSupports");
    if (window.navigation) {
      statusId.innerHTML = "supports";
      statusId.style.backgroundColor = "green";
    } else {
      statusId.innerHTML = "doesn't support";
      statusId.style.backgroundColor = "red";
      sinceSupports.innerHTML =
        "You can still normally <a href='/whoami'>navigate here on the site</a>, but it'll few the traditional way.";
    }

    if (document.startViewTransition) {
      viewID.classList.remove("hidden");
    }
  }
};

const swRegister = () => {
  if (!("serviceWorker" in navigator)) {
    console.error("Service Worker not supported");
    return;
  }
  navigator.serviceWorker
    .register("/service-worker.js", { scope: "/" })
    .catch((err) => {
      console.error("Service Worker registration failed: ", err);
    });
};

// A function added to window object

window.destroyTheCache = async () => {
  await caches.delete("cache");
  console.log("Cache destroyed");
  alert("Cache destroyed");
};

const displayError = (error) => {
  const dialog = document.getElementById("errorDialog");
  const errorInfo = document.getElementById("errorInfo");

  dialog.showModal();
  errorInfo.innerHTML = error;
};

export { displayError, onPageLoad, swRegister };
