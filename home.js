const baseURL = "http://127.0.0.1:5000/routerProducts/products/";

function removeProduct(card, dataForProject) {
  const index = dataForProject.findIndex(
    (product) => product.id === Number(card.id)
  );
  dataForProject.splice(index, 1);
  try {
    fetch(baseURL + card.id, { method: "delete" });
    card.remove();
  } catch (error) {
    console.log(error);
  }
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
  editLink.href = "./editProduct.html?productId=" + card.id;
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

async function search() {
  dataForProject = await dataProducts();
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

async function addCard(dataForProject) {
  if (!dataForProject) {
    dataForProject = await dataProducts();
  }
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

async function filterButton(button) {
  const dataForProject = await dataProducts();
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

async function dataProducts() {
  try {
    const data = await fetch(baseURL);
    const json = await data.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}

function main() {
  // checkData();
  addEvent();
  mainButton();
  addCard();
  icons();
  search();
}
main();
