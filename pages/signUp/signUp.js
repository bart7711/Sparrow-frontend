export default () => {
    const content = document.querySelector(".content");
  
    return fetch("./pages/signUp/signUp.html")
      .then((response) => response.text())
      .then((signUpHtml) => {
        content.innerHTML = signUpHtml;
        handleLoginFunctionality();
      });
  };
  
  function handleLoginFunctionality() {
    const form = document.querySelector("form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if(document.querySelector('#Password').value === document.querySelector('#RepeatedPassword').value){

      fetch(`${window.apiUrl}api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: document.querySelector('#Email').value,
          username: document.querySelector('#Username').value,
          role: null,
          password: document.querySelector('#Password').value,
          descritpion: document.querySelector('#Description').value
        }),
      })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            if(data.error){
              alert(data.error)
            }else{
              alert(data.message)
              window.router.navigate("/");
            }
        });
      }
    });
  }
  