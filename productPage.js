function productCard(object) {
  const container = document.getElementById("container");
  const HeadTitle = document.createElement("h1");
  HeadTitle.innerText = "product page";
  const card = document.createElement("div");
  card.id = "card";
  container.append(HeadTitle, card);
  const imgHolder = document.createElement("div");
  imgHolder.id = "imgHolder";
  const img = document.createElement("img");
  img.src = object.image;
  imgHolder.appendChild(img);
  const details = document.createElement("div");
  details.id = "details";
  const title = document.createElement("h2");
  title.textContent = "Title";
  const titleText = document.createElement("p");
  titleText.textContent = object.title;
  const description = document.createElement("h2");
  description.textContent = "Description";
  const descriptionText = document.createElement("p");
  descriptionText.textContent = object.description;
  const category = document.createElement("h2");
  category.textContent = "Category";
  const categoryText = document.createElement("p");
  categoryText.textContent = object.category;
  const price = document.createElement("h2");
  price.textContent = "Price";
  const priceText = document.createElement("p");
  priceText.textContent = object.price;
  const quantity = document.createElement("h2");
  quantity.textContent = "Quantity";
  const quantityText = document.createElement("p");
  quantityText.textContent = object.quantity;
  details.append(
    title,
    titleText,
    description,
    descriptionText,
    category,
    categoryText,
    price,
    priceText,
    quantity,
    quantityText
  );
  card.append(imgHolder, details);
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

function getObject(productId) {
  const dataForProject = JSON.parse(localStorage.getItem("dataForProject"));
  const newArray = dataForProject.find((object) => object.id === productId);
  return newArray;
}

function getId() {
  const params = window.location.search;
  const searchParams = new URLSearchParams(params);
  const productId = Number(searchParams.get("productId"));
  return getObject(productId);
}

function main() {
  productCard(getId());
  icons();
}

main();
