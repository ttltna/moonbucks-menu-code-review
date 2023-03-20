const count = document.getElementsByClassName("mr-2 mt-4 menu-count");
const menuName = document.getElementById("espresso-menu-name");
const menuAddBtn = document.getElementById("espresso-menu-submit-button");
const menuList = document.getElementById("espresso-menu-list");

////Step1 메뉴에 새로운 메뉴 확인 버튼 입력으로 추가 ////
function AddMenuList(Menu) {
  /* 태그 생성 */
  const li = document.createElement("li");
  const span = document.createElement("span");
  const modifyBtn = document.createElement("button");
  const reMoveBtn = document.createElement("button");

  /* css적용을 위해 class 값 넣어주기 */
  li.setAttribute("class", "menu-list-item d-flex items-center py-2");
  span.setAttribute("class", "w-100 pl-2 menu-name");
  modifyBtn.setAttribute(
    "class",
    "bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
  );
  reMoveBtn.setAttribute(
    "class",
    "bg-gray-50 text-gray-500 text-sm menu-remove-button"
  );

  /* 생성된 태그들 HTML에 적용(적용?이란 단어대신 다른 단어 생각해보기) */
  span.appendChild(document.createTextNode(Menu));
  modifyBtn.appendChild(document.createTextNode("수정"));
  reMoveBtn.appendChild(document.createTextNode("삭제"));
  li.append(span, modifyBtn, reMoveBtn);
  /* 
  append는 복수로 적용가능하지만 appendChild는 한개씩밖에 추가하지 못한다.
  li.appendChild(span);
  li.appendChild(modifyBtn);
  li.appendChild(reMoveBtn);
  */
  menuList.appendChild(li);

  modifyBtn.addEventListener("click",() => {
    const modifyValue = prompt('이름을 수정해주세요.');
    span.innerText = modifyValue;
  })
}

menuAddBtn.addEventListener("click", () => {
  if (menuName.value !== "") {
    //input값 비어있는지 확인
    AddMenuList(menuName.value);
    menuName.value = ""; //값이 있다면 비움
  }
});
////Step1////

////Step2 메뉴의 수정 버튼을 눌러 이름 수정 가능 ////
function handleModifyBtnClick(event){

}
////Step2////