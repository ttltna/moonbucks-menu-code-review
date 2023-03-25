const menuInput = document.getElementById("espresso-menu-name");
const menuSubmitButton = document.getElementById("espresso-menu-submit-button");
const menuForm = document.getElementById("espresso-menu-form");
const menuList = document.getElementById("espresso-menu-list");
const pattern = /[a-zA-Z가-힣]{1,}[\s]*$/;
const modifyBtn = "bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button";
const removeBtn = "bg-gray-50 text-gray-500 text-sm menu-remove-button";

function InitializationInput() {
  menuInput.value = "";
}

function creatLiTag() {
  const li = document.createElement("li");
  li.setAttribute("class", "menu-list-item d-flex items-center py-2");
  return li;
}

function createSpanTag(menuName) {
  const span = document.createElement("span");
  span.setAttribute("class", "w-100 pl-2 menu-name");
  span.innerText = menuName;
  return span;
}

function createBtnTag(className, btnText) {
  const btn = document.createElement("button");
  btn.setAttribute("class", `${className}`);
  btn.innerText = btnText;
  return btn;
}

function checkPattern(menu) {
  if (pattern.test(`${menu}`)) {
    return menu.trim();
  }
}

function handleModifyBtnClick(contents) {
  contents = prompt("수정할 이름을 적어주세요");
  return contents;
}
function handleRemoveBtnClick(contents) {}

menuForm.addEventListener("submit", function BlockSubmit(event) {
  event.preventDefault();
});

menuSubmitButton.addEventListener("click", function menuSubmit() {
  if (checkPattern(menuInput.value)) {
    const liTag = creatLiTag();
    const spanTag = createSpanTag(menuInput.value);
    const revicebtn = createBtnTag(modifyBtn, "수정");
    const delbtn = createBtnTag(removeBtn, "삭제");
    liTag.append(spanTag, revicebtn, delbtn);
    menuList.append(liTag);

    revicebtn.addEventListener(
      "click",
      handleModifyBtnClick(spanTag.innerText)
    );
    delbtn.addEventListener("click", handleRemoveBtnClick());
  }
});
