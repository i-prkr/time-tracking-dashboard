import data from '../data.json';
import ellipsis from './assets/images/icon-ellipsis.svg';
import exerciseIcon from './assets/images/icon-exercise.svg';
import playIcon from './assets/images/icon-play.svg';
import selfCareIcon from './assets/images/icon-self-care.svg';
import socialIcon from './assets/images/icon-social.svg';
import studyIcon from './assets/images/icon-study.svg';
import workIcon from './assets/images/icon-work.svg';
import avatarImage from './assets/images/image-jeremy.png';

const createTiles = (area, activity, index) => {

  const dashboardContainer = document.querySelector(".dashboard-container");
  const tileIcons = [workIcon, playIcon, studyIcon, exerciseIcon, socialIcon , selfCareIcon];
  const backgroundIconDimensions = {width: 78, height: 78};
  const menuEllipsisDimensions = {width: 5, height: 21};

  for(const timeframe in activity.timeframes) {

    // create tile
    const newTile = document.createElement("article");
    newTile.classList.add("tile__container");
    newTile.style.gridArea = area;
    newTile.dataset.timeframe = timeframe;

    // create tile background
    const tileBackground = document.createElement("div");
    tileBackground.classList.add("tile__background");
    tileBackground.dataset.activity = activity.title;

    const tileBackgroundIcon = document.createElement("img");
    tileBackgroundIcon.classList.add("tile__background-icon");
    tileBackgroundIcon.setAttribute("src", tileIcons[index]);
    tileBackgroundIcon.setAttribute("height", backgroundIconDimensions.height);
    tileBackgroundIcon.setAttribute("width", backgroundIconDimensions.width);
    tileBackgroundIcon.setAttribute("alt", "");

    tileBackground.appendChild(tileBackgroundIcon);

    // create tile content

    const tileBody = document.createElement("div");
    tileBody.classList.add("tile__body", "text-white");

    const tileHeader = document.createElement("header");
    tileHeader.classList.add("tile__header");

    const tileTitle = document.createElement("h3");
    tileTitle.classList.add("tile__title", "text-weight-500");
    tileTitle.textContent = activity.title;

    const tileMenuIcon = document.createElement("img");
    tileMenuIcon.classList.add("tile__menu-icon");
    tileMenuIcon.setAttribute("src", ellipsis);
    tileMenuIcon.setAttribute("height", menuEllipsisDimensions.height);
    tileMenuIcon.setAttribute("width", menuEllipsisDimensions.width);
    tileMenuIcon.setAttribute("alt", "ellipsis to open tile menu");

    const tileContent = document.createElement("div");
    tileContent.classList.add("tile__content");

    const tileHours = document.createElement("p");
    tileHours.classList.add("tile__hours", "text-xlarge");
    tileHours.textContent = `${activity.timeframes[timeframe].current}hrs`;

    const tileText = document.createElement("p");
    tileText.classList.add("tile__text", "text-gray");
    tileText.textContent = `Last Week - ${activity.timeframes[timeframe].previous}hrs`

    // put tile together and add to DOM

    newTile.appendChild(tileBackground);
    tileBackground.appendChild(tileBackgroundIcon);

    newTile.appendChild(tileBody);
    tileBody.appendChild(tileHeader);
    tileHeader.appendChild(tileTitle);
    tileHeader.appendChild(tileMenuIcon);
    tileBody.appendChild(tileContent);
    tileContent.appendChild(tileHours);
    tileContent.appendChild(tileText);

    dashboardContainer.appendChild(newTile);
  }
}

const createTitleTile = () => {
  const dashboardContainer = document.querySelector(".dashboard-container");
  const avatarDimensions = {width: 85, height: 85};

  // create tile
  const newTile = document.createElement("article");
  newTile.classList.add("tile__container", "tile__container-title");
  newTile.style.gridArea = "title";

  // create tile content

  const tileBackground = document.createElement("div");
  tileBackground.classList.add("tile__background", "tile__background-title");

  const tileSelections = document.createElement("div");
  tileSelections.classList.add("tile__selections");

  const dailyText = document.createElement("p");
  dailyText.classList.add("tile__text", "tile__text-selection");
  dailyText.innerText = 'Daily';

  const weeklyText = document.createElement("p");
  weeklyText.classList.add("tile__text", "tile__text-selection");
  weeklyText.innerText = 'Weekly';

  const monthlyText = document.createElement("p");
  monthlyText.classList.add("tile__text", "tile__text-selection");
  monthlyText.innerText = 'Monthly';

  const tileBody = document.createElement("div");
  tileBody.classList.add("tile__body", "tile__body-title");

  const tileContent = document.createElement("div");
  tileContent.classList.add("tile__content", "tile__content-title");

  const avatar = document.createElement("img");
  avatar.classList.add("tile__avatar");
  avatar.setAttribute("src", avatarImage);
  avatar.setAttribute("alt", "headshot of jeremy robson");
  avatar.setAttribute("width", avatarDimensions.width);
  avatar.setAttribute("height", avatarDimensions.height);
  
  const tileSubtext = document.createElement("p");
  tileSubtext.classList.add("tile__text", "text-gray", "text-small")
  tileSubtext.textContent = "Report for";

  const userName = document.createElement("h2");
  userName.classList.add("tile_heading", "tile_heading-title", "text-large");
  userName.textContent = "Jeremy Robson";

  // put tile together add to DOM
  newTile.appendChild(tileBackground);
  tileBackground.appendChild(tileSelections);
  tileSelections.appendChild(dailyText);
  tileSelections.appendChild(weeklyText);
  tileSelections.appendChild(monthlyText);
  
  newTile.appendChild(tileBody);
  tileBody.appendChild(avatar);
  tileBody.appendChild(tileContent);
  tileContent.appendChild(tileSubtext);
  tileContent.appendChild(userName);

  dashboardContainer.appendChild(newTile);
}

const createFilter = () => {
  const dashboardContainer = document.querySelector(".dashboard-container");

  // add event listener for selection
  const selections = document.querySelectorAll(".tile__text-selection");
  selections.forEach((selection) => {
    selection.addEventListener("click", () => {
      dashboardContainer.dataset.filter = selection.textContent;
    })
  })
}

function Dashboard() {

  const gridAreas = ["a","b","c","d","e","f"];

  createTitleTile();
  gridAreas.forEach((area, i) => {
    createTiles(area, data[i], i)
  })
  createFilter();
}

Dashboard();