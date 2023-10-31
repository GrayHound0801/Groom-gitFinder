const $userNameInput = document.getElementById("usernameInput");
const $userImgContainer = document.getElementById("userImgContainer");
const $userInfoContainer1 = document.getElementById("userInfoContainer1");
const $userInfoTable = document.getElementById("userInfoTable");
const $box2Wrapper = document.getElementById("box2-wrapper");
const $reposWrapper = document.getElementById("repos-wrapper");
document.addEventListener("DOMContentLoaded", () => {
  const savedUsername = localStorage.getItem("githubUsername");
  if (savedUsername) {
    $userNameInput.value = savedUsername;
  }
});

$userNameInput.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    getUserData();
    getRepos();
    saveToLocalStorage();
  }
});

const getUserData = () => {
  const UserUrl = `https://api.github.com/users/${$userNameInput.value}`;

  fetch(UserUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("userData", data);
      createMainEl(data);
    })
    .catch((error) => {
      console.log("userData 에러", error.message);
    });
};

const getRepos = () => {
  const reposUrl = `https://api.github.com/users/${$userNameInput.value}/repos`;
  fetch(reposUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("repos", data);
      createLatestRepos(data);
    })
    .catch((error) => {
      console.log("repos 에러", error.message);
    });
};

const saveToLocalStorage = () => {
  localStorage.setItem("githubUsername", $userNameInput.value);
};

const createMainEl = (data, reposData) => {
  const userImg = document.createElement("img");
  userImg.classList.add("user-img");
  userImg.src = data.avatar_url;

  const publicRepos = document.createElement("div");
  publicRepos.classList.add("infoBox", "public-repos");
  publicRepos.textContent = `Public Repos: ${data.public_repos}`;
  console.log("publicRepos", data.public_repos);

  const publicGists = document.createElement("div");
  publicGists.classList.add("infoBox", "public-gists");
  publicGists.textContent = `Public Gists: ${data.public_gists}`;

  const followers = document.createElement("div");
  followers.classList.add("infoBox", "followers");
  followers.textContent = `Followers: ${data.followers}`;

  const following = document.createElement("div");
  following.classList.add("infoBox", "following");
  following.textContent = `Following: ${data.following}`;

  const company = document.createElement("tr");
  const companyTd = document.createElement("td");
  companyTd.classList.add("tableTd", "company");
  companyTd.textContent = `Company: ${data.company}`;
  company.appendChild(companyTd);

  const blog = document.createElement("tr");
  const blogTd = document.createElement("td");
  blogTd.classList.add("tableTd", "blog");
  blogTd.textContent = `Blog: ${data.blog}`;
  blog.appendChild(blogTd);

  const location = document.createElement("tr");
  const locationTd = document.createElement("td");
  locationTd.classList.add("tableTd", "location");
  locationTd.textContent = `Location: ${data.location}`;
  location.appendChild(locationTd);

  const Member = document.createElement("tr");
  const memberTd = document.createElement("td");
  memberTd.classList.add("tableTd", "member-since");
  memberTd.textContent = `Member Since: ${data.create_at}`;
  Member.appendChild(memberTd);

  const view = document.createElement("div");
  view.classList.add("view");
  view.textContent = "View Profile";

  $box2Wrapper.appendChild(view);
  $userImgContainer.append(userImg);
  $userInfoContainer1.append(publicRepos);
  $userInfoContainer1.append(publicGists);
  $userInfoContainer1.append(followers);
  $userInfoContainer1.append(following);
  $userInfoTable.append(company);
  $userInfoTable.append(blog);
  $userInfoTable.append(location);
  $userInfoTable.append(Member);
};

const createLatestRepos = (data) => {
  const reposContainer = document.createElement("div");
  reposContainer.classList.add("repos-container");

  data.forEach((repo) => {
    const reposbox = document.createElement("div");
    reposbox.classList.add("repos-box");
    reposContainer.appendChild(reposbox);

    const repoDiv = document.createElement("div");
    repoDiv.classList.add("repo");
    repoDiv.textContent = repo.name;
    reposbox.appendChild(repoDiv);

    const repoInfoContainer = document.createElement("div");
    repoInfoContainer.classList.add("repo-info-container");
    reposbox.appendChild(repoInfoContainer);

    const stars = document.createElement("div");
    stars.classList.add("stars");
    stars.textContent = `Stars: ${repo.stargazers_count}`;
    repoInfoContainer.appendChild(stars);

    const watchers = document.createElement("div");
    watchers.classList.add("watchers");
    watchers.textContent = `Watchers: ${repo.watchers_count}`;
    repoInfoContainer.appendChild(watchers);

    const forks = document.createElement("div");
    forks.classList.add("forks");
    forks.textContent = `Forks: ${repo.forks_count}`;
    repoInfoContainer.appendChild(forks);
  });

  $reposWrapper.append(reposContainer);
};
