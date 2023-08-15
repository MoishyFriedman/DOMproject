const data = JSON.parse(localStorage.getItem("dataForProject"));

function newProduct(title, price, quantity, description, category, image) {
  const newArray = {
    id: data[data.length - 1].id + 1,
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
  data.push(newArray);
  localStorage.setItem("dataForProject", JSON.stringify(data));
}

function addProduct() {
  const title = document.getElementById("title");
  const category = document.getElementById("category");
  const price = document.getElementById("price");
  const image = document.getElementById("image");
  const quantity = document.getElementById("quantity");
  const description = document.getElementById("bigArea");
  newProduct(
    title.value,
    price.value,
    quantity.value,
    description.value,
    category.value,
    image.value
  );
}

const add = document.getElementsByTagName("button")[0];
add.addEventListener("click", () => {
  addProduct();
  window.location.assign('./home.html')
});

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
icons();
