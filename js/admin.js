const createTarj = (tarjetaObject) => {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      console.log(tarjetaObject);
    }
  });
  xhr.open(
    "POST",
    "https://dataninja-97039-default-rtdb.firebaseio.com/productos.json"
  );
  xhr.send(JSON.stringify(tarjetaObject));
};

let productos = {};

document
  .querySelector(".added-product")
  .addEventListener("click", (event) => {});
