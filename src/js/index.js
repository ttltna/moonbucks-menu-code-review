const count = document.getElementsByClassName("mr-2 mt-4 menu-count");
const menuName = document.getElementById("espresso-menu-name");
const menuAddBtn = document.getElementById("espresso-menu-submit-button");
const menuList = document.getElementById("espresso-menu-list");
const submission = document.getElementById("espresso-menu-form");

function AddMenuList(Menu) {
  /* 태그 생성 및 css 적용을 위해 class 값 넣어주기 */
  const li = document.createElement("li");
  const span = document.createElement("span");
  const modifyBtn = document.createElement("button");
  const removeBtn = document.createElement("button");

  /* css적용을 위해 class 값 넣어주기 */
  li.setAttribute("class", "menu-list-item d-flex items-center py-2");
  span.setAttribute("class", "w-100 pl-2 menu-name");
  modifyBtn.setAttribute(
    "class",
    "bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
  );
  removeBtn.setAttribute(
    "class",
    "bg-gray-50 text-gray-500 text-sm menu-remove-button"
  );

  /* 생성된 태그들 HTML에 적용(적용?이란 단어대신 다른 단어 생각해보기) */
  span.appendChild(document.createTextNode(Menu));
  modifyBtn.appendChild(document.createTextNode("수정"));
  removeBtn.appendChild(document.createTextNode("삭제"));
  li.append(span, modifyBtn, removeBtn);
  menuList.appendChild(li);
  /* 
  append는 복수로 적용가능하지만 appendChild는 한개씩밖에 추가하지 못한다.
  li.appendChild(span);
  li.appendChild(modifyBtn);
  li.appendChild(removeBtn);
  */

  //수정 버튼
  modifyBtn.addEventListener("click", () => {
    span.innerText = prompt("이름을 수정해주세요.");
  });

  //삭제 버튼
  removeBtn.addEventListener("click", () => {
    let delconfirm = confirm("삭제 하시겠습니까?");
    if (delconfirm === true) {
      li.remove();
    }
  });
}

//input이 비어있는지 아닌지 확인후 메뉴값 넘겨주고 비우기
function checkEmptyInput() {
  if (menuName.value !== "") {
    //input값 비어있는지 확인
    AddMenuList(menuName.value);
    menuName.value = ""; //값이 있다면 비움
  }
}

//확인버튼
menuAddBtn.addEventListener("click", () => {
  checkEmptyInput();
});

//input 엔터 누를시 submit 막기
submission.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    e.preventDefault(); //엔터키로 submit을 막아서 페이지 새로고침 안되게 하기
    checkEmptyInput();
  }
});
