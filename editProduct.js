const baseURL = "http://127.0.0.1:5000/routerProducts/products/";

async function changeProduct(newArray, productId) {
  try {
    const metaData = {
      method: "put",
      body: JSON.stringify(newArray),
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(newArray);
    console.log(productId);
    await fetch(baseURL + productId, metaData);
  } catch (error) {
    console.log(error);
  }
}

function updateProduct(
  title,
  price,
  quantity,
  description,
  category,
  image,
  productId
) {
  const newArray = {
    title,
    price,
    quantity,
    description,
    category,
    image,
    rating: {
      rate: Math.floor(Math.random() * 5 + 1),
      count: Math.floor(Math.random() * 200),
    },
  };
  changeProduct(newArray, productId);
}

async function productInformation(getProduct, productId) {
  product = await getProduct;
  const title = document.getElementById("title");
  title.value = product.title;
  const category = document.getElementById("category");
  category.value = product.category;
  const price = document.getElementById("price");
  price.value = product.price;
  const image = document.getElementById("image");
  image.value = product.image;
  const quantity = document.getElementById("quantity");
  quantity.value = product.quantity;
  const description = document.getElementById("bigArea");
  description.value = product.description;
  const add = document.getElementsByTagName("button")[0];
  add.addEventListener("click", () => {
    updateProduct(
      title.value,
      price.value,
      quantity.value,
      description.value,
      category.value,
      image.value,
      productId
    );
    window.location.assign("./home.html");
  });
}

async function getProduct(productId) {
  const getProduct = await fetch(baseURL + productId);
  const json = await getProduct.json();
  productInformation(json, productId);
}

function getId() {
  const params = window.location.search;
  const searchParams = new URLSearchParams(params);
  const productId = Number(searchParams.get("productId"));
  return productId;
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

function main() {
  const product = getId();
  getProduct(product);
  icons();
}

main();
