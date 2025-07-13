import { createCardView, createListView } from "./utilities.mjs";

function toggleSwitching() {
    const toggleSwitch = document.getElementById('toggle-switch');
    toggleSwitch.addEventListener('change', () => {
        if (toggleSwitch.checked) {
            console.log('Switch in ON')
            createCardView();
        } else {
            console.log('Switch in OFF')
            createListView();
        }
    });
}
toggleSwitching();