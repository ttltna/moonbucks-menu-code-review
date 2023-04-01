//Step1
const menuInput = document.getElementById("espresso-menu-name");
const menuSubmitButton = document.getElementById("espresso-menu-submit-button");
const menuForm = document.getElementById("espresso-menu-form");
const menuList = document.getElementById("espresso-menu-list");
const menuListCount = document.querySelector(".menu-count");
const pattern = /[a-zA-Z가-힣]{1,}[\s]*$/;
const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]{1,}/;
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
let toggleValue = true;
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

const createSpanTag = (menuName, status) => {
  const span = document.createElement("span");
  span.setAttribute("class", "w-100 pl-2 menu-name");
  span.textContent = menuName;
  if (!status) {
    span.style.textDecoration = "line-through";
    span.style.color = "gray";
  }
  return span;
};

const createBtnTag = (className, btnText) => {
  const btn = document.createElement("button");
  btn.setAttribute("class", `${className}`);
  btn.textContent = btnText;
  return btn;
};

const checkPattern = (menu) => {
  if (!(menu === null) && !regExp.test(`${menu}`) && pattern.test(`${menu}`)) {
    menuInput.value = menu.trim();
    return menuInput.value;
  }
};

const countingMenuList = () => {
  menuListCount.textContent = `총 ${menuList.childElementCount}개`;
};

const textDecoLine = (spanTag) => {
  /* 바뀐 과정 ? */
  // let localGetItem = JSON.parse(window.localStorage.getItem(nowCategory));
  // // let product = localGetItem.map((checkStock) => {
  // //   if (checkStock.value === spanTag.textContent) {
  // //     return checkStock.stock;
  // //   }
  // // });
  // localGetItem.map((checkStock) => {
  //   return checkStock.stock;
  // });
  // console.log(localGetItem);
  // if (localGetItem) {
  //   spanTag.style.textDecoration = "line-through";
  //   spanTag.style.color = "gray";
  //   localGetItem.stock = false;
  // } else {
  //   spanTag.style.textDecoration = "";
  //   spanTag.style.color = "black";
  //   localGetItem.stock = true;
  // }
  // console.log(localGetItem);
  let localGetItem = JSON.parse(window.localStorage.getItem(nowCategory));
  let itemArr = localGetItem.map((menuName) => {
    return menuName.value;
  });
  let stockArr = localGetItem.map((checkStock) => {
    return checkStock.stock;
  });
  let index = itemArr.indexOf(`${spanTag.textContent}`);
  console.log(stockArr[index]);
  if (stockArr[index]) {
    spanTag.style.textDecoration = "line-through";
    spanTag.style.color = "gray";
    stockArr[index] = false;
  } else {
    spanTag.style.textDecoration = "";
    spanTag.style.color = "black";
    stockArr[index] = true;
  }
  const spreadArr = [];
  for (let i = 0; i < localGetItem.length; i++) {
    spreadArr[i] = { value: itemArr[i], stock: stockArr[i] };
  }
  window.localStorage.setItem(nowCategory, JSON.stringify(spreadArr));
};

const changeLocalVaule = (targetObject, changeInput) => {
  let localGetItem = JSON.parse(window.localStorage.getItem(nowCategory));
  localGetItem.map((menuName) => {
    if (menuName.value === targetObject) {
      menuName.value = changeInput.textContent;
    }
    return menuName.value;
  });
  // for (let i = 0; i < localGetItem.length; i++) {
  //   if (localGetItem[i].value === targetObject) {
  //     localGetItem[i].value = changeInput.textContent;
  //   }
  // }
  window.localStorage.setItem(nowCategory, JSON.stringify(localGetItem));
};

const removeLocalVaule = (targetText) => {
  let localGetItem = JSON.parse(window.localStorage.getItem(nowCategory));
  let itemArr = localGetItem.map((menuName) => {
    return menuName.value;
  });
  let stockArr = localGetItem.map((checkStock) => {
    return checkStock.stock;
  });
  itemArr.splice(itemArr.indexOf(`${targetText}`), 1);

  /*
   * 두 배열을 합치는데 concat과 spread를 사용해 보려 했지만 itemArr 값들이 먼저 다 들억고 그다음 stockArr값이 다 들어가므로 원하는 배열이 안만들어짐
   * 그래서 결국 for문을 사용하게 됨
   */
  // const spreadArr = [...itemArr, ...stockArr];
  // let removedArr = itemArr.map((menuName) => {
  //   let arrObject = { value: menuName };
  //   return arrObject;
  // });
  // window.localStorage.setItem(nowCategory, JSON.stringify(removedArr));

  const spreadArr = [];
  for (let i = 0; i < localGetItem.length - 1; i++) {
    spreadArr[i] = { value: itemArr[i], stock: stockArr[i] };
  }
  window.localStorage.setItem(nowCategory, JSON.stringify(spreadArr));
};

const handleLocalStorage = () => {
  /*
   * JSON parse()는 JSON이 string타입이기때문에 javascript Object로 사용하기위해 바꾸는 방법.
   * JSON stringipy()는 javascript Object를 서버와 통신할때 쓰는 JSON형태로 바꾸기 위해 쓰는 방법.
   */
  let localContents = {
    value: menuInput.value,
    stock: true,
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

const createTags = (inputTagValue, stockStatus) => {
  const liTag = creatLiTag();
  const spanTag = createSpanTag(inputTagValue, stockStatus);
  const stockBtn = createBtnTag(outOfStock, "품절");
  const modifyBtn = createBtnTag(modifyClassName, "수정");
  const removeBtn = createBtnTag(removeClassName, "삭제");
  liTag.append(spanTag, stockBtn, modifyBtn, removeBtn);
  menuList.append(liTag);

  stockBtn.addEventListener("click", () => {
    textDecoLine(spanTag);
  });

  modifyBtn.addEventListener("click", () => {
    let previousText = spanTag.textContent;
    let tempValue = prompt("수정하실 이름을 적어주세요");
    if (
      !(tempValue === null) &&
      !regExp.test(`${tempValue}`) &&
      pattern.test(`${tempValue}`)
    ) {
      spanTag.textContent = tempValue;
      changeLocalVaule(previousText, spanTag);
    } else if (tempValue === null) {
    } else {
      alert("메뉴로 등록가능한것만 적어주세요!");
    }
  });

  removeBtn.addEventListener("click", () => {
    if (confirm("삭제하시겠습니까?")) {
      liTag.remove();
      removeLocalVaule(spanTag.textContent);
    }
  });
};

const drawLocalItems = () => {
  const drawLocalContents = JSON.parse(
    window.localStorage.getItem(nowCategory)
  );

  if (drawLocalContents) {
    // for (let i = 0; i < drawLocalContents.length; i++) {
    //   createTags(drawLocalContents[i].value);
    // }
    drawLocalContents.map((tags) => {
      createTags(tags.value, tags.stock);
    });
  }
};

const menuSubmit = () => {
  if (checkPattern(menuInput.value)) {
    createTags(menuInput.value);
    handleLocalStorage();
    InitializationInput();
    countingMenuList();
  }
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

/* 문제 1 : 로컬스토리지에 특수문자, 공백이 들어가고 정규표현식에서 설정한 값 외에는 menuInput.value가 초기화되면 안되는데 초기화되어서
createTags에 handleLocalStorage, InitializationInput를 추가하니 고쳐짐*/

/* 문제 2 : drawLocalItems에서 createTags를 사용하는데 거기에다가 handleLocalStorage, InitializationInput를 추가하니까 
로컬스토리지에 "" 빈값이 계속 들어가는 문제 발생했었음 */

/* 해결 : 그래서 menuSubmit()에서 미리 checkPattern() 검사를 하는 구조로 바꿈 */
