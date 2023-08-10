function removeProduct(card, dataForProject) {
  card.remove();
  const index = dataForProject.findIndex(
    (product) => product.id === Number(card.id)
  );
  dataForProject.splice(index, 1);
  localStorage.setItem("dataForProject", JSON.stringify(dataForProject));
}

function BuildCard(product, arrayProducts, dataForProject) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.id = product.id;
  const link = document.createElement("a");
  link.href = "./productPage.html?productId=" + card.id;
  const imgHolder = document.createElement("div");
  imgHolder.classList.add("imgHolder");
  const img = document.createElement("img");
  imgHolder.appendChild(img);
  link.appendChild(imgHolder);
  img.src = product.image;
  const details = document.createElement("div");
  details.classList.add("details");
  const title = document.createElement("p");
  title.textContent = product.title;
  const line = document.createElement("hr");
  const iconsHolder = document.createElement("div");
  iconsHolder.classList.add("iconsHolder");
  const remove = document.createElement("i");
  remove.addEventListener("click", () => removeProduct(card, dataForProject));
  remove.classList.add("material-icons", "icon");
  remove.textContent = "delete";
  const editLink = document.createElement("a");
  editLink.href = "...";
  const edit = document.createElement("i");
  edit.classList.add("material-icons", "icon");
  edit.textContent = "mode_edit";
  editLink.appendChild(edit);
  iconsHolder.append(remove, editLink);
  details.append(title, line, iconsHolder);
  card.append(link, details);
  arrayProducts.push(card);
}

function searching(searchBy, dataForProject) {
  const filtered = dataForProject.filter(
    (product) =>
      product.title.search(searchBy.value) >= 0 ||
      product.category.search(searchBy.value) >= 0
  );
  addCard(filtered);
}

function search() {
  const dataForProject = JSON.parse(localStorage.getItem("dataForProject"));
  const input = document.getElementById("search");
  const searchIcon = document.getElementById("searchIcon");
  searchIcon.addEventListener("click", () => searching(input, dataForProject));
}

function icons() {
  const headerIcon = document.getElementById("headerIcon");
  const iconHome = document.getElementById("iconHome");
  const pageHome = document.createElement("a");
  pageHome.href = "./home.html";
  pageHome.appendChild(iconHome);
  const iconPlus = document.getElementById("iconPlus");
  const pageAdd = document.createElement("a");
  pageAdd.href = "./addProduct.html";
  pageAdd.appendChild(iconPlus);
  headerIcon.append(pageHome, pageAdd);
}

function addCard(
  dataForProject = JSON.parse(localStorage.getItem("dataForProject"))
) {
  const products = document.getElementById("productsContainer");
  arrayProducts = [];
  dataForProject.forEach((product) =>
    BuildCard(product, arrayProducts, dataForProject)
  );
  products.replaceChildren(...arrayProducts);
}

function mainButton() {
  const allProduct = document.getElementById("allProducts");
  allProduct.addEventListener("click", () => addCard());
}

function filterButton(button) {
  const dataForProject = JSON.parse(localStorage.getItem("dataForProject"));
  const newArr = dataForProject.filter(
    (product) => product.category === button.value
  );
  addCard(newArr);
}

function addEvent() {
  const allButtons = document.getElementsByClassName("button");
  for (let button of allButtons) {
    button.addEventListener("click", () => {
      filterButton(button);
    });
  }
}

function checkData() {
  if (!JSON.parse(localStorage.getItem("dataForProject"))) {
    localStorage.setItem("dataForProject", JSON.stringify(data));
  }
}

function main() {
  checkData();
  addEvent();
  mainButton();
  addCard();
  icons();
  search();
}
main();
