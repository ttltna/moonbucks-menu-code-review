const menuInput = document.getElementById("espresso-menu-name");
const menuSubmitButton = document.getElementById("espresso-menu-submit-button");
const menuForm = document.getElementById("espresso-menu-form");
const menuList = document.getElementById("espresso-menu-list");
const pattern = /[a-zA-Z가-힣]{1,}[\s]*$/;
const modifyClassName =
  "bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button";
const removeClassName = "bg-gray-50 text-gray-500 text-sm menu-remove-button";

/*
 *** innerText 보단 textContent를 사용할 것
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

const handleModifyBtnClick = (contents) => {};

menuForm.addEventListener("submit", function BlockSubmit(event) {
  event.preventDefault();
});

menuSubmitButton.addEventListener("click", function menuSubmit() {
  if (checkPattern(menuInput.value)) {
    const liTag = creatLiTag();
    const spanTag = createSpanTag(menuInput.value);
    const revicebtn = createBtnTag(modifyClassName, "수정");
    const delbtn = createBtnTag(removeClassName, "삭제");
    liTag.append(spanTag, revicebtn, delbtn);
    menuList.append(liTag);
  }
});
