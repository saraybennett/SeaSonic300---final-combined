console.log("hi");

//close and return
document
  .getElementById("closeAndReturnBtn")
  .addEventListener("click", function () {
    // Attempt to close the current tab.
    // This will likely only work if the tab was opened programmatically (e.g., via window.open()).
    window.close();

    // Attempt to navigate back in the browser history.
    // This will work if there's a previous page in the history.
    history.back();
  });
