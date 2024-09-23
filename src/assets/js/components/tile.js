import ellipsis from '../../images/icon-ellipsis.svg';

export default createTiles = ({area, icon, title, current, previous, timeframe}) => {
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
    <header>
      <h3 class="tile__title text-weight-500">${title}</h3>
      <img src=${ellipsis} class="tile__menu-icon" alt="ellipsis to open tile menu" width=${menuEllipsisDimensions.width} height=${menuEllipsisDimensions.height}/>
      <div class="tile__content">
        <p class="tile__hours text-xlarge">${current}${createHoursString(current)}</p>
        <p class="tile__text text-gray">Last ${createPreviousString(timeframe)} - ${previous}${createHoursString(previous)}</p>
      </div>
    </header>
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