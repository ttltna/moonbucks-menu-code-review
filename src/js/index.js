const menuInput = document.getElementById("espresso-menu-name");
const menuSubmitButton = document.getElementById("espresso-menu-submit-button");
const menuForm = document.getElementById("espresso-menu-form");
const menuList = document.getElementById("espresso-menu-list");
const menuListCount = document.querySelector(".menu-count");
const pattern = /[a-zA-Z가-힣]{1,}[\s]*$/;
const modifyClassName =
  "bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button";
const removeClassName = "bg-gray-50 text-gray-500 text-sm menu-remove-button";

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
    InitializationInput();
    countingMenuList();
  }
};

menuForm.addEventListener("submit", (event) => {
  event.preventDefault();
  menuSubmit();
});

menuSubmitButton.addEventListener("click", menuSubmit);
