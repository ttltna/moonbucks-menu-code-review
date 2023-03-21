const menuCount = document.getElementsByClassName("mr-2 mt-4 menu-count");
const menuName = document.getElementById("espresso-menu-name");
const menuAddBtn = document.getElementById("espresso-menu-submit-button");
const menuList = document.getElementById("espresso-menu-list");

function addElement(tag) {
  if (tag === li) {
    document
      .createElement(`${tag}`)
      .setAttribute("class", "menu-list-item d-flex items-center py-2");
  }

  if (tag === span) {
    document
      .createElement(`${tag}`)
      .setAttribute("class", "w-100 pl-2 menu-name");
  }

  if (tag === modifyBtn) {
    document
      .createElement("button")
      .setAttribute(
        "class",
        "bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
      );
  }

  if (tag === removeBtn) {
    document
      .createElement("button")
      .setAttribute(
        "class",
        "bg-gray-50 text-gray-500 text-sm menu-remove-button"
      );
  }
}

function modifyBtnAction() {}

function AddMenuList(menu) {
  addElement(li);
  addElement(span);
  addElement(modifyBtn);
  addElement(removeBtn);
  span.appendChild(document.createTextNode(menu));
  btn.appendChild(document.createTextNode("수정"));
}
