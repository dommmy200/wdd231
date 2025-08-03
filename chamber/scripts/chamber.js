(async () => {
    const { places } = await import("../data/lagos-place.mjs");
    
    if (document.querySelector('.wrapper')) {
        const util = await import("./utilities.mjs");
        util.displayLagosPlaces(places);
    }
    if (document.getElementById('toggle-switch')) {
        const util = await import("./utilities.mjs");
        util.toggleSwitching();
    }
    if (document.getElementById('open-dialog-btn')) {
        const util = await import("./visits.mjs");
        util.footerDialog();
    }
    if (document.querySelector('#current-weather' || document.querySelector('#weather-forecast'))) {
        const util = await import("./weather.mjs");
        util.updateCurrentWeather();
        util.updateForecastWeather();
    }
    if (document.getElementById('home-cards')) {
        const util = await import("./utilities.mjs");
        util.displayHomePageCards();
    }
    if (document.querySelector('#modal-close')) {
        const util = await import("./visits.mjs");
        util.visitorsButton();
    }

    const util = await import("./dates.mjs");
    util.insertTextAndModifiedDate();
})();