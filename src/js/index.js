//Step1
const menuInput = document.getElementById("espresso-menu-name");
const menuSubmitButton = document.getElementById("espresso-menu-submit-button");
const menuForm = document.getElementById("espresso-menu-form");
const menuList = document.getElementById("espresso-menu-list");
const menuListCount = document.querySelector(".menu-count");
const pattern = /[a-zA-Z가-힣]{1,}[\s]*$/;
const modifyClassName =
  "bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button";
const removeClassName = "bg-gray-50 text-gray-500 text-sm menu-remove-button";
//*Step1

//Step2
const moonbucksMenu = document.querySelector(".flex-wrap");
const h2Tag = document.querySelector(".mt-1");
const inputLabel = document.querySelector(".input-label");
const mMA = [
  //moonbucksMenuArray
  ["espresso", "☕ 에스프레소 메뉴 관리", "에스프레소 메뉴 이름"],
  ["frappuccino", "🥤 프라푸치노 메뉴 관리", "프라푸치노 메뉴 이름"],
  ["blended", "🍹 블렌디드 메뉴 관리", "블렌디드 메뉴 이름"],
  ["teavana", "🫖 티바나 메뉴 관리", "티바나 메뉴 이름"],
  ["desert", "🍰 디저트 메뉴 관리", "디저트 메뉴 이름"],
];
const nowCategory = "espresso";
const localContents = new Object();
//*Step2

/*
 *** innerText는 reflow가 발생하므로 textContent를 사용할 것
 *** innerHTML은 보안에 취약하다.
 */

const InitializationInput = () => {
  menuInput.value = "";
};

const creatLiTag = () => {
  const li = document.createElement("li");
  li.setAttribute("class", "menu-list-item d-flex items-center py-2");
  return li;
};

const createSpanTag = (menuName) => {
  const span = document.createElement("span");
  span.setAttribute("class", "w-100 pl-2 menu-name");
  span.textContent = menuName;
  return span;
};

const createBtnTag = (className, btnText) => {
  const btn = document.createElement("button");
  btn.setAttribute("class", `${className}`);
  btn.textContent = btnText;
  return btn;
};

const checkPattern = (menu) => {
  if (pattern.test(`${menu}`)) {
    return menu.trim();
  }
};

const countingMenuList = () => {
  menuListCount.textContent = `총 ${menuList.childElementCount}개`;
};

const menuSubmit = () => {
  if (checkPattern(menuInput.value)) {
    const liTag = creatLiTag();
    const spanTag = createSpanTag(menuInput.value);
    const modifyBtn = createBtnTag(modifyClassName, "수정");
    const removeBtn = createBtnTag(removeClassName, "삭제");
    liTag.append(spanTag, modifyBtn, removeBtn);
    menuList.append(liTag);

    /* 어떻게 해야 외부에서 spanTag.textContent에 prompt값을 줄 수 있는지 */
    modifyBtn.addEventListener("click", () => {
      spanTag.textContent = prompt("수정하실 이름을 적어주세요");
    });

    /* 어떻게 해야 외부에서 liTag.remove()를 할 수 있는지 */
    removeBtn.addEventListener("click", () => {
      if (confirm("삭제하시겠습니까?")) {
        liTag.remove();
        countingMenuList();
      }
    });
    const localObj = {
      category: nowCategory,
      value: menuInput.value,
    };
    localContents.name = [...menuInput.value];
    localContents.stockArticles = 10;
    window.localStorage.setItem(nowCategory, JSON.stringify(localContents));
    InitializationInput();
    countingMenuList();
  }
};

const espressoMenu = () => {
  h2Tag.textContent = mMA[0][1];
  inputLabel.textContent = mMA[0][2];
  menuInput.placeholder = mMA[0][2];
  nowCategory = "espresso";
};
const frappuccinoMenu = () => {
  h2Tag.textContent = mMA[1][1];
  inputLabel.textContent = mMA[1][2];
  menuInput.placeholder = mMA[1][2];
  nowCategory = "frappuccino";
};
const blendedMenu = () => {
  h2Tag.textContent = mMA[2][1];
  inputLabel.textContent = mMA[2][2];
  menuInput.placeholder = mMA[2][2];
  nowCategory = "blended";
};
const teavanaMenu = () => {
  h2Tag.textContent = mMA[3][1];
  inputLabel.textContent = mMA[3][2];
  menuInput.placeholder = mMA[3][2];
  nowCategory = "teavana";
};
const desertMenu = () => {
  h2Tag.textContent = mMA[4][1];
  inputLabel.textContent = mMA[4][2];
  menuInput.placeholder = mMA[4][2];
  nowCategory = "desert";
};

const checkCategory = (category) => {
  for (let i = 0; i < 5; i++) {
    if (category === mMA[i][0]) {
      if (i === 0) {
        espressoMenu();
      }
      if (i === 1) {
        frappuccinoMenu();
      }
      if (i === 2) {
        blendedMenu();
      }
      if (i === 3) {
        teavanaMenu();
      }
      if (i === 4) {
        desertMenu();
      }
    }
  }
};

menuForm.addEventListener("submit", (event) => {
  event.preventDefault();
  menuSubmit();
});

menuSubmitButton.addEventListener("click", menuSubmit);

moonbucksMenu.addEventListener("click", (event) => {
  // console.dir(event.target.dataset);
  checkCategory(event.target.dataset.categoryName);
});
