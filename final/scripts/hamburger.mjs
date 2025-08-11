// export function getHamburgerButton() {
//     let hamburger = document.querySelector('#ham-btn');
//     hamburger.addEventListener('click', () => {
//         // Toggle the hamburger menu icon
//         hamburger.classList.toggle('show');
//         // Toggle the navigation menu
//         let nav = document.querySelector('.taste-nav');
//         if (nav.classList.contains('show')) {
//             nav.classList.remove('show');
//             hamburger.setAttribute('aria-expanded', 'false');
//         } else {
//             nav.classList.add('show');
//             hamburger.setAttribute('aria-expanded', 'true');
//         }
//     });
// }
export function storeFormData() {
  document.querySelector("#form-action").addEventListener("submit", function(e) {
  e.preventDefault();
  const formData = new FormData(this);
  const data = {};
  formData.forEach((value, key) => data[key] = value);
  localStorage.setItem("formData", JSON.stringify(data));
  window.location.href = "./form-action.html";



  // document.getElementById("form-action").addEventListener("submit", async (event) => {
  //   event.preventDefault();

  //   const formData = new FormData(event.target);
  //   const data = {};

  //   formData.forEach((value, key) => {
  //     data[key] = value;
  //   });

  //   // Save form data in localStorage
  //   localStorage.setItem("formData", JSON.stringify(data));

  //   alert("Form data saved!");
  //   window.location.href = './form-action.html';
  });
}

// ***************** Testing Hamburger ***************
export function testingHamburger() {
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const navLinks = document.getElementById("navLinks");
    
    hamburgerBtn.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    });
}