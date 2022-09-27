function displayMenu() {
    let menu = document.querySelector("#left-content").style;

    if (menu.width == "60%") {
        menu.width = "0px";
    } else {
        menu.width = "60%";
    }
}