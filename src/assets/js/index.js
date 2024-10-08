import data from '../data.json';
import workIcon from '../images/icon-work.svg';
import playIcon from '../images/icon-play.svg';
import studyIcon from '../images/icon-study.svg';
import exerciseIcon from '../images/icon-exercise.svg';
import socialIcon from '../images/icon-social.svg';
import selfCareIcon from '../images/icon-self-care.svg';

async function Dashboard() {
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
  const tile = await import('./tile.js');
  const titleTile = await import('./titleTile.js');

  const newTitleTile = titleTile.createTitleTile();
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
      
      const newTile = tile.createTile(tileInfo);
      dashboardContainer.appendChild(newTile)
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



Dashboard();