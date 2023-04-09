//Step1
const menuInput = document.getElementById("espresso-menu-name");
const menuSubmitButton = document.getElementById("espresso-menu-submit-button");
const menuForm = document.getElementById("espresso-menu-form");
const menuList = document.getElementById("espresso-menu-list");
const menuListCount = document.querySelector(".menu-count");
const modifyClassName =
  "bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button";
const removeClassName = "bg-gray-50 text-gray-500 text-sm menu-remove-button";
//*Step1

//Step2
const moonbucksMenu = document.querySelector(".flex-wrap");
const h2Tag = document.querySelector(".mt-1");
const inputLabel = document.querySelector(".input-label");
const stockClassName =
  "bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button";
const mMA = [
  //mMA = moonbucksMenuArray
  ["espresso", "☕ 에스프레소 메뉴 관리", "에스프레소 메뉴 이름"],
  ["frappuccino", "🥤 프라푸치노 메뉴 관리", "프라푸치노 메뉴 이름"],
  ["blended", "🍹 블렌디드 메뉴 관리", "블렌디드 메뉴 이름"],
  ["teavana", "🫖 티바나 메뉴 관리", "티바나 메뉴 이름"],
  ["desert", "🍰 디저트 메뉴 관리", "디저트 메뉴 이름"],
];
let nowCategory = "espresso";
//*Step2

/*
 * innerText는 reflow가 발생하므로 textContent를 사용할 것
 * innerHTML은 보안에 취약하다.
 */

/*
 * JSON parse()는 JSON이 string타입이기때문에 javascript Object로 사용하기위해 바꾸는 방법.
 * JSON stringipy()는 javascript Object를 서버와 통신할때 쓰는 JSON형태로 바꾸기 위해 쓰는 방법.
 */

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
//*Step2

const patternCheck = (menu) => {
  const pattern = /[a-zA-Z가-힣]{1,}[\s]*$/;
  const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]{1,}/;
  if (!(menu === null) && !regExp.test(`${menu}`) && pattern.test(`${menu}`)) {
    menuInput.value = menu.trim();
    return menuInput.value;
  }
};

const menuCount = () => {
  menuListCount.textContent = `총 ${menuList.childElementCount}개`;
};

const createLi = () => {
  const li = document.createElement("li");
  li.setAttribute("class", "menu-list-item d-flex items-center py-2");
  return li;
};

const createSpan = (menuName, status, outOfStock) => {
  const span = document.createElement("span");
  span.setAttribute("class", "w-100 pl-2 menu-name");
  span.textContent = menuName;
  if (outOfStock) {
    if (!status) {
      span.style.textDecoration = "line-through";
      span.style.color = "gray";
    }
  }
  return span;
};

const createBtn = (className, btnText) => {
  const btn = document.createElement("button");
  btn.setAttribute("class", `${className}`);
  btn.textContent = btnText;
  return btn;
};

const combine = (valueArr, stockArr, length) => {
  /*
   * 두 배열을 합치는데 concat과 spread를 사용해 보려 했지만 valueArr 값들이 먼저 다 들어가고 그다음 valueArr 다 들어가므로 원하는 배열이 안만들어짐
   * 그래서 결국 for문을 사용하게 됨
   */
  const arrayCombine = [];
  for (let i = 0; i < length; i++) {
    arrayCombine[i] = { value: valueArr[i], stock: stockArr[i] };
  }
  return arrayCombine;
};

const stockTextDecoLine = (spanTag) => {
  let localGetItem = JSON.parse(window.localStorage.getItem(nowCategory));
  let valueArr = localGetItem.map((menuName) => {
    return menuName.value;
  });
  let stockArr = localGetItem.map((checkStock) => {
    return checkStock.stock;
  });
  let index = valueArr.indexOf(`${spanTag.textContent}`);
  if (stockArr[index]) {
    spanTag.style.textDecoration = "line-through";
    spanTag.style.color = "gray";
    stockArr[index] = false;
  } else {
    spanTag.style.textDecoration = "";
    spanTag.style.color = "black";
    stockArr[index] = true;
  }
  window.localStorage.setItem(
    nowCategory,
    JSON.stringify(combine(valueArr, stockArr, localGetItem.length))
  );
};

const changeLocalValue = (spanTag) => {
  let previousSpanTagText = spanTag.textContent;
  let temporaryValue = prompt("수정하실 이름을 적어주세요");
  if (patternCheck(temporaryValue)) {
    spanTag.textContent = temporaryValue;
    let localGetItem = JSON.parse(window.localStorage.getItem(nowCategory));
    localGetItem.map((menuName) => {
      if (menuName.value === previousSpanTagText) {
        menuName.value = temporaryValue;
      }
      return menuName.value;
    });
    window.localStorage.setItem(nowCategory, JSON.stringify(localGetItem));
  } else {
    alert("메뉴로 등록가능한것만 적어주세요!");
  }
};

const removeLocalValue = (targetText) => {
  let localGetItem = JSON.parse(window.localStorage.getItem(nowCategory));
  let valueArr = localGetItem.map((menuName) => {
    return menuName.value;
  });
  let stockArr = localGetItem.map((checkStock) => {
    return checkStock.stock;
  });
  valueArr.splice(valueArr.indexOf(`${targetText}`), 1);
  window.localStorage.setItem(
    nowCategory,
    JSON.stringify(combine(valueArr, stockArr, localGetItem.length - 1))
  );
};

const createTags = (inputTagValue, stockStatus, isOutOfStock) => {
  const liTag = createLi();
  const spanTag = createSpan(inputTagValue, stockStatus, isOutOfStock);
  const stockBtn = createBtn(stockClassName, "품절");
  const modifyBtn = createBtn(modifyClassName, "수정");
  const removeBtn = createBtn(removeClassName, "삭제");
  liTag.append(spanTag, stockBtn, modifyBtn, removeBtn);
  menuList.append(liTag);

  stockBtn.addEventListener("click", () => {
    stockTextDecoLine(spanTag);
  });

  modifyBtn.addEventListener("click", () => {
    changeLocalValue(spanTag);
  });

  removeBtn.addEventListener("click", () => {
    if (confirm("삭제하시겠습니까?")) {
      liTag.remove();
      removeLocalValue(spanTag.textContent);
      menuCount();
    }
  });
};

const handleLocalStorage = () => {
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

const drawLocalItems = () => {
  const drawLocalContents = JSON.parse(
    window.localStorage.getItem(nowCategory)
  );

  if (drawLocalContents) {
    drawLocalContents.map((tags) => {
      createTags(tags.value, tags.stock, true);
    });
  }
};

const menuSubmit = () => {
  if (patternCheck(menuInput.value)) {
    createTags(menuInput.value);
    handleLocalStorage();
    menuInput.value = "";
    menuCount();
  }
};

menuSubmitButton.addEventListener("click", () => {
  menuSubmit();
});

menuForm.addEventListener("submit", (event) => {
  event.preventDefault();
  menuSubmit();
});

moonbucksMenu.addEventListener("click", (event) => {
  Category(event.target.dataset.categoryName);
  menuList.replaceChildren();
  drawLocalItems();
  menuCount();
});

const mandatoryStart = () => {
  drawLocalItems();
  menuCount();
};

mandatoryStart();
