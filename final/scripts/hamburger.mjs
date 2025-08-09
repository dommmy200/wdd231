export function getHamburgerButton() {
    let hamburger = document.querySelector('#ham-btn');
    hamburger.addEventListener('click', () => {
        // Toggle the hamburger menu icon
        hamburger.classList.toggle('show');
        // Toggle the navigation menu
        let nav = document.querySelector('.taste-nav');
        if (nav.classList.contains('show')) {
            nav.classList.remove('show');
            hamburger.setAttribute('aria-expanded', 'false');
        } else {
            nav.classList.add('show');
            hamburger.setAttribute('aria-expanded', 'true');
        }
    });
}
export function storeFormData() {
    document.getElementById("form-action").addEventListener("submit", function(event) {
      event.preventDefault();

      const formData = new FormData(this);
      const data = {};

      formData.forEach((value, key) => {
        data[key] = value;
      });

      // Save form data in localStorage
      localStorage.setItem("formData", JSON.stringify(data));

      alert("Form data saved!");
      this.reset();
    });
}