import renderLogin from "./pages/login/login.js";
import renderMain from "./pages/main/main.js";
import renderSignUp from "./pages/signUp/signUp.js";


export default function () {
  window.router = new Navigo("/", { hash: true });

  router
    .on({
      "/": () => {
        renderLogin().then(router.updatePageLinks);
      },
      main: ()=>{
        renderMain();
      },
      signup: ()=>{
        renderSignUp();
      }
    })
    .resolve();
}
