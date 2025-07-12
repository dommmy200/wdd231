import { readCardFile, drawCards, clickListBtn, clickThumbnailBtn, createCardDiv } from "./utilities.mjs";

readCardFile().then(foo => {
  const card = document.querySelector('#directoryContent');
  for (let i = 0; i < foo.length; i++) {
    const div = createCardDiv();
    drawCards(foo[i], card, div);
  }
});
clickListBtn();
clickThumbnailBtn();