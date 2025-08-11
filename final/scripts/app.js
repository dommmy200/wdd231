(async () => {

    if (document.getElementById("welcome")) {
        const util = await import("./utilities.mjs");
        util.displayFormAction();
    }
    // if (document.querySelector('#ham-btn')) {
    //     const util = await import("./hamburger.mjs");
    //     util.getHamburgerButton();;
    // }
    if (document.querySelector("#last-modified")) {
        const util = await import("./utilities.mjs");
        util.getModifiedDate();
    }
    if (document.querySelector('.taste-menu')) {
        const util = await import("./utilities.mjs");
        util.displayMenuCards();
    }
    if (document.getElementById("visit")) {
        const util = await import("./utilities.mjs");
        util.displayVisits();
    }
    if (document.getElementById("form-action")) {
        const util = await import("./hamburger.mjs");
        util.storeFormData();
    }
    if (document.getElementById("hamburgerBtn")) {
        const util = await import("./hamburger.mjs");
        util.testingHamburger();
    }
    
})();