import avatarImage from '../../../assets/images/image-jeremy.png';

export default createTitleTile = () => {
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