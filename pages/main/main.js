import renderNavBar from "/pages/navbar/navbar.js";
let apiKey = "";
let userJWTToken = "";

export default () => {
  userJWTToken = JSON.parse(localStorage.getItem("user"));
  if (isUser()) {
    const content = document.querySelector(".content");
    apiKey = `${window.apiUrl}api/`;

    fetch("./pages/main/main.html")
      .then((response) => response.text())
      .then((mainHtml) => {
        content.innerHTML = mainHtml;
        handleMainPage();
        renderNavBar();
      });
  } else {
    alert("You have to be loged in as user to access this site.");
    window.router.navigate("/");
  }
};

async function handleMainPage() {
  const form = document.querySelector("form");
  const postContainer = document.getElementById("messageContainer")
  const user = JSON.parse(localStorage.user).username;
  form.addEventListener("submit", (event) => {postMessage(event,user,postContainer)})
  generatePosts(postContainer,user)

}

async function generatePosts(container,user){
const initialPosts = await getPosts();
const posts = initialPosts.reverse();
posts.forEach(post=>generatePost(post,container,user))
  
}

function generatePost(post,con,user){
  const div0 = document.createElement('div');
  div0.setAttribute("class","tw-block-parent");
  con.appendChild(div0);
  const div1 = document.createElement('div');
  div1.setAttribute("class", "timeline-TweetList-tweet");
  div0.appendChild(div1);
  const div2 = document.createElement('div');
  div2.setAttribute("class","timeline-Tweet");
  div1.appendChild(div2);
  const divTrash = document.createElement("div");
  divTrash.setAttribute("class","timeline-Tweet-trash")
  const divAuthorCon = document.createElement("div");
  divAuthorCon.setAttribute("class","timeline-Tweet-author");
  const divTextCon = document.createElement("div");
  divTextCon.setAttribute("class", "timeline-Tweet-text");
  divTextCon.innerHTML=post.text;
  const divTimeCon = document.createElement("div");
  divTimeCon.setAttribute("class", "timeline-Tweet-metadata");
  const hashtagCon = document.createElement("a");
  hashtagCon.setAttribute("class", "timeline-Tweet-hashtags")
  hashtagCon.setAttribute("href", "/#/main")
  hashtagCon.innerHTML=post.hashtag;
  div2.appendChild(divTrash);
  div2.appendChild(divAuthorCon);
  div2.appendChild(divTextCon);
  div2.appendChild(divTimeCon);
  div2.appendChild(hashtagCon);

  if(user===post.user.username){
    const trashIcon = document.createElement("a");
    trashIcon.setAttribute("class","Icon Icon--twitter");
    trashIcon.setAttribute("role","button");
    trashIcon.addEventListener("click", () => deletePost(post.id,con,user));
    divTrash.appendChild(trashIcon);
  }

  const divAuthor = document.createElement("div");
  divAuthor.setAttribute("class", "TweetAuthor");
  divAuthorCon.appendChild(divAuthor);
  const span0 = document.createElement("span");
  span0.setAttribute("class", "TweetAuthor-avatar")
  divAuthor.appendChild(span0);
  const divAvatar = document.createElement("div");
  divAvatar.setAttribute("class", "Avatar")
  span0.appendChild(divAvatar);
  const spanName = document.createElement("span");
  spanName.setAttribute("class","TweetAuthor-name")
  spanName.innerHTML=post.user.username;
  if(post.user.username===user){spanName.innerHTML="(YOU): "+spanName.innerHTML}
  divAuthor.appendChild(spanName);
  const time = document.createElement("span");
  time.setAttribute("class", "timeline-Tweet-timestamp");
  const timeArray = post.createDateTime;
  const date = timeArray[0]+"-"+ timeArray[1]+"-"+ timeArray[2]+" "+ timeArray[3]+":"+timeArray[4];
  time.innerHTML=date;
  divTimeCon.appendChild(time);
  
}

function postMessage(event,user,con){
  event.preventDefault();
  const input = document.getElementById('post');
  
  fetch(`${window.apiUrl}api/post/user/${user}`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: input.value,
  }).then(() => {
    input.value="";
    relodePosts(con,user);
    
  })
  .catch((error) => {
    console.log(error);
  });
}

function getPosts() {
  const key = apiKey + "post";
  const posts = fetch(key, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((post) => post.json())
    .catch((error) => {
      console.log(error);
    });
  return posts;
}

function deletePost(id,con,user){
  let key = apiKey+"post/"+id;
    fetch(key, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
    })
      .then(() => {
        relodePosts(con,user)
      })
      .catch((error) => {
        console.log(error);
      });
}

function relodePosts(con,user){
con.innerHTML="";
generatePosts(con,user);
}



function isUser() {
  //Function to check if the user has an user role.
  if (userJWTToken == null) {
    return false;
  }
  return userJWTToken.roles.includes("ROLE_USER");
}
