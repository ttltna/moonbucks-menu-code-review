const count = document.getElementsByClassName("mr-2 mt-4 menu-count");
const MenuName = document.getElementById("espresso-menu-name");
const MenuAddBtn = document.getElementById("espresso-menu-submit-button");
const MenuList = document.getElementById("espresso-menu-list");

function AddMenuList(Menu) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const ModifyBtn = document.createElement("button");
  const RemoveBtn = document.createElement("button");

  li.setAttribute("class", "menu-list-item d-flex items-center py-2");
  span.setAttribute("class", "w-100 pl-2 menu-name");
  ModifyBtn.setAttribute(
    "class",
    "bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
  );
  RemoveBtn.setAttribute(
    "class",
    "bg-gray-50 text-gray-500 text-sm menu-remove-button"
  );

  span.appendChild(document.createTextNode(Menu));
  ModifyBtn.appendChild(document.createTextNode("수정"));
  RemoveBtn.appendChild(document.createTextNode("삭제"));
  li.appendChild(span);
  li.appendChild(ModifyBtn);
  li.appendChild(RemoveBtn);
  MenuList.appendChild(li);
}

MenuAddBtn.addEventListener("click", () => {
  if (MenuName.value !== "") {
    console.log(MenuName.value);
    AddMenuList(MenuName.value);
    MenuName.value = "";
  }
});
