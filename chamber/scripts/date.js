const currentYear = document.getElementById("currentyear");
currentYear.innerText = new Date().getFullYear();

const lastModifiedElement = document.querySelector("#lastmodified");
if (lastModifiedElement) {
    lastModifiedElement.innerHTML = `Last modified: ${document.lastModified}`;
}