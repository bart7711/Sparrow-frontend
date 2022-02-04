export default () => {
    generateNavBar();
  };

  async function editNavbar(){
    const navbar = document.querySelector(".navbar-nav");
    const logoutNav = document.createElement("li");
    logoutNav.classList.add("nav-item");
    const logoutLink = document.createElement("a");
    logoutLink.classList.add("nav-link");
    logoutLink.classList.add("text-dark");
    logoutLink.innerText = "Logout";
    logoutNav.appendChild(logoutLink);
    navbar.appendChild(logoutNav);
    logoutLink.href = "/";
    logoutLink.addEventListener("click", logout);
  }

  async function generateNavBar() {
    fetch('./pages/navbar/navbar.html').then(function (response) {
      return response.text();
    }).then(function (html) {
      const header = document.querySelector("header");
      header.innerHTML = html;
    }).catch(function (err) {
      console.warn('Something went wrong.', err);
    }).then(editNavbar);
  }
  
  function logout() {
    localStorage.removeItem("user");
  }