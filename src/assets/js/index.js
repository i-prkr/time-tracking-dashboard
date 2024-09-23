import data from '../data.json';
import workIcon from '../images/icon-work.svg';
import playIcon from '../images/icon-play.svg';
import studyIcon from '../images/icon-study.svg';
import exerciseIcon from '../images/icon-exercise.svg';
import socialIcon from '../images/icon-social.svg';
import selfCareIcon from '../images/icon-self-care.svg';
import ellipsis from '../images/icon-ellipsis.svg';
import avatarImage from '../images/image-jeremy.png';

function Dashboard() {
  const dashboardContainer = document.querySelector(".dashboard-container");
  const gridAreas = ["a","b","c","d","e","f"];
  const icons = {
    "Work": workIcon,
    "Play": playIcon,
    "Study": studyIcon,
    "Exercise": exerciseIcon,
    "Social": socialIcon,
    "Self Care": selfCareIcon
  }

  const newTitleTile = createTitleTile();
  dashboardContainer.appendChild(newTitleTile);

  data.forEach((activity, i) => {

    // loop over the data and add tiles one by one
    Object.keys(activity.timeframes).forEach((timeframe) => {
      const tileInfo = {
        area: gridAreas[i],
        icon: icons[activity.title], 
        title: activity.title,
        current: activity.timeframes[timeframe].current,
        previous: activity.timeframes[timeframe].previous,
        timeframe
      }
      
      const tile = createTile(tileInfo);
      dashboardContainer.appendChild(tile)
    })
  })
  addFiltering(dashboardContainer);
}

// add event listener for filtering
const addFiltering = (dashboardContainer) => {
  
  const selections = document.querySelectorAll(".tile__text-selection");
  selections.forEach((selection) => {
    selection.addEventListener("click", () => {
      filterTiles(dashboardContainer, selection)
    })
  })
}

const filterTiles = (dashboardContainer, selection) => {
  dashboardContainer.dataset.filter = selection.textContent;
}

const createTile = ({area, icon, title, current, previous, timeframe}) => {
  const backgroundIconDimensions = {width: 78, height: 78};
  const menuEllipsisDimensions = {width: 5, height: 21};
  

  // create tile
  const newTile = document.createElement("article");
  newTile.classList.add("tile__container");
  newTile.style.gridArea = area;
  newTile.dataset.timeframe = timeframe;    

  newTile.innerHTML = `
  <div class="tile__background" data-activity=${title === "Self Care" ? "Self-Care" : title} >
    <img src=${icon} class="tile__background-icon" alt="" width=${backgroundIconDimensions.width} height=${backgroundIconDimensions.height}/>
  </div>
  <div class="tile__body text-white">
    <header class="tile__header">
      <h3 class="tile__title text-weight-500">${title}</h3>
      <img src=${ellipsis} class="tile__menu-icon" alt="ellipsis to open tile menu" width=${menuEllipsisDimensions.width} height=${menuEllipsisDimensions.height}/>
    </header>
    <div class="tile__content">
      <p class="tile__hours text-xlarge">${current}${createHoursString(current)}</p>
      <p class="tile__text text-gray">Last ${createPreviousString(timeframe)} - ${previous}${createHoursString(previous)}</p>
    </div>
  </div>
    `
  return newTile;
}

const createPreviousString = (timeframe) => {
  return timeframe === 'Daily' ? 'Day' : timeframe === 'Monthly' ? 'Month' : 'Week';
}

const createHoursString = (num) => {
  return `${num <= 1 ? "hr" : "hrs"}`;
}

const createTitleTile = () => {
  const avatarDimensions = {width: 85, height: 85};

  // create tile
  const newTile = document.createElement("article");
  newTile.classList.add("tile__container", "tile__container-title");
  newTile.style.gridArea = "title";

  newTile.innerHTML = `
  <div class="tile__background tile__background-title">
    <div class="tile__selections">
      <p class="tile__text tile__text-selection">Daily</p>
      <p class="tile__text tile__text-selection">Monthly</p>
      <p class="tile__text tile__text-selection">Weekly</p>
    </div>
  </div>
  <div class="tile__body tile__body-title">
    <div class="tile__content tile__content-title">
      <img src=${avatarImage} class="tile__avatar" alt="headshot of jeremy robson" width=${avatarDimensions.width} height=${avatarDimensions.height} />
      <p class="tile__text text-gray text-small">Report for</p>
      <h2 class="tile_heading tile_heading-title text-large">Jeremy Robson</h2>
    </div>
  </div>
  `;

  return newTile;
}

Dashboard();