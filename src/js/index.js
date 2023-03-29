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
const outOfStock = "bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button";
const mMA = [
  //moonbucksMenuArray
  ["espresso", "☕ 에스프레소 메뉴 관리", "에스프레소 메뉴 이름"],
  ["frappuccino", "🥤 프라푸치노 메뉴 관리", "프라푸치노 메뉴 이름"],
  ["blended", "🍹 블렌디드 메뉴 관리", "블렌디드 메뉴 이름"],
  ["teavana", "🫖 티바나 메뉴 관리", "티바나 메뉴 이름"],
  ["desert", "🍰 디저트 메뉴 관리", "디저트 메뉴 이름"],
];
let nowCategory = "espresso";
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

const changeLocalVaule = (targetObject, changeInput) => {
  let localGetItem = JSON.parse(window.localStorage.getItem(nowCategory));
  for (let i = 0; i < localGetItem.length; i++) {
    if (localGetItem[i].value === targetObject) {
      localGetItem[i].value = changeInput.textContent;
    }
  }
  window.localStorage.setItem(nowCategory, JSON.stringify(localGetItem));
};

const createTags = (inputTagValue) => {
  if (checkPattern(inputTagValue)) {
    const liTag = creatLiTag();
    const spanTag = createSpanTag(inputTagValue);
    const modifyBtn = createBtnTag(modifyClassName, "수정");
    const removeBtn = createBtnTag(removeClassName, "삭제");
    liTag.append(spanTag, modifyBtn, removeBtn);
    menuList.append(liTag);

    modifyBtn.addEventListener("click", (event) => {
      let previousText = spanTag.textContent;
      let tempValue = prompt("수정하실 이름을 적어주세요");
      if (!(tempValue === null) && pattern.test(`${tempValue}`)) {
        spanTag.textContent = tempValue;
        changeLocalVaule(previousText, spanTag);
      } else if (tempValue === null) {
      } else {
        alert("메뉴로 등록가능한것만 적어주세요!");
      }
    });

    // modifyBtn.addEventListener("click", () => {
    //   let tempTextValue = prompt("수정하실 이름을 적어주세요");
    //   if (pattern.test(`${tempTextValue}`)) {
    //     spanTag.textContent = tempTextValue;
    //     let localGetItem = JSON.parse(window.localStorage.getItem(nowCategory));
    //     console.log("localGetItem : ", localGetItem);
    //     window.localStorage.setItem(nowCategory, JSON.stringify(localGetItem));
    //   } else {
    //     alert("메뉴로 등록가능한것만 적어주세요!");
    //   }
    // });

    removeBtn.addEventListener("click", (event) => {
      if (confirm("삭제하시겠습니까?")) {
        liTag.remove();
        console.dir(event);
      }
    });
  }
};

const handleLocalStorage = () => {
  /*
   * JSON parse()는 JSON이 string타입이기때문에 javascript Object로 사용하기위해 바꾸는 방법.
   * JSON stringipy()는 javascript Object를 서버와 통신할때 쓰는 JSON형태로 바꾸기 위해 쓰는 방법.
   */
  let localContents = {
    value: menuInput.value,
  };

  if (window.localStorage.getItem(nowCategory)) {
    let previousContents = window.localStorage.getItem(nowCategory);
    window.localStorage.setItem(
      nowCategory,
      JSON.stringify([...JSON.parse(previousContents), localContents])
    );
  } else {
    window.localStorage.setItem(nowCategory, JSON.stringify([localContents]));
  }
};

const drawLocalItems = () => {
  const drawLocalContents = JSON.parse(
    window.localStorage.getItem(nowCategory)
  );
  if (drawLocalContents) {
    for (let i = 0; i < drawLocalContents.length; i++) {
      createTags(drawLocalContents[i].value);
    }
  }
};

const menuSubmit = () => {
  createTags(menuInput.value);
  handleLocalStorage();
  InitializationInput();
  countingMenuList();
};

const espressoMenu = () => {
  h2Tag.textContent = mMA[0][1];
  inputLabel.textContent = mMA[0][2];
  menuInput.placeholder = mMA[0][2];
  nowCategory = mMA[0][0];
};
const frappuccinoMenu = () => {
  h2Tag.textContent = mMA[1][1];
  inputLabel.textContent = mMA[1][2];
  menuInput.placeholder = mMA[1][2];
  nowCategory = mMA[1][0];
};
const blendedMenu = () => {
  h2Tag.textContent = mMA[2][1];
  inputLabel.textContent = mMA[2][2];
  menuInput.placeholder = mMA[2][2];
  nowCategory = mMA[2][0];
};
const teavanaMenu = () => {
  h2Tag.textContent = mMA[3][1];
  inputLabel.textContent = mMA[3][2];
  menuInput.placeholder = mMA[3][2];
  nowCategory = mMA[3][0];
};
const desertMenu = () => {
  h2Tag.textContent = mMA[4][1];
  inputLabel.textContent = mMA[4][2];
  menuInput.placeholder = mMA[4][2];
  nowCategory = mMA[4][0];
};

const Category = (category) => {
  for (let i = 0; i < 5; i++) {
    // moonbucksMenuArray = ex) [["espresso", "☕ 에스프레소 메뉴 관리", "에스프레소 메뉴 이름"],]
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
  Category(event.target.dataset.categoryName);
  menuList.replaceChildren();
  drawLocalItems();
  countingMenuList();
});

drawLocalItems();
countingMenuList();
