/*const createTarj = (tarjetaObject) => {
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
*/

function getArticle(){
  let objectResponse
  let arrayArticles=[]
  const xhr=new XMLHttpRequest()
  xhr.addEventListener("readystatechange",()=>{
      if (xhr.readyState==4)
          if(xhr.status>= 200 && xhr.status <= 299) {
              objectResponse=JSON.parse(xhr.responseText)
              if(objectResponse) {
                  arrayArticles = Object.keys(objectResponse).map((key) => {
                      objectResponse = objectResponse[key]
                      return {...objectResponse, id:key}
                  })
                  printTable(objectResponse)
              }else {
                  printTable(objectResponse)
                  console.log("No hay Productos u.u")
              }
              // !objectResponse?mostrar:mensaje no hay registros en la tabla
              // printTable(objectResponse)
      }else
          console.log("Ocurrio un error: ", xhr.status, "Not Found")
  })
  xhr.open("GET", "https://dataninja-97039-default-rtdb.firebaseio.com/.json")
  xhr.send()
}

function getDataForm(){
  let fields=document.querySelectorAll(".form input:not(input[type='checkbox']), .form textarea")
  let checkboxs=document.querySelectorAll(".form input[type='checkbox']")
  console.log(fields)
  console.log(checkboxs)
  let product={}
  let quantityFieldEmpty=0

  fields.forEach(field=>{
      if (!field.value){
          quantityFieldEmpty++
      }
      else{
          product={...product,[field.name]:field.name}
          field.value=""
      }
  })

  let sizes=[]
  checkboxs.forEach(checkbox=>{
      if (checkbox.checked) sizes=[...sizes, checkbox.value]
  })

  if(sizes.length===0)quantityFieldEmpty++

  product={...product,sizes}
  
  console.log(product)
  console.log(sizes)

  return !quantityFieldEmpty>0?product:null
}

function createArticle(){
  let personObject={}
  const xhr=new XMLHttpRequest()
  xhr.addEventListener("readystatechange",()=>{
      if (xhr.readyState==4 && xhr.status==200)
      {
          
      }
  })
  xhr.open("POST", "https://dataninja-97039-default-rtdb.firebaseio.com/productos.json")
  xhr.send(JSON.stringify(PersonObject))
}

function removeArticle (event) {
  console.log("Eliminando... jeje")
  // Eliminar del array
  let positionPerson = event.target.dataset.PersonIndex
  PersonArray.splice(positionPerson, 1)
  console.log(PersonArray)
  printTable()
}

function updateArticle(idProd,newDataToUpdate){
  const xhr=new XMLHttpRequest()
  xhr.addEventListener("readystatechange",()=>{
      if (xhr.readyState==4 && xhr.status==200)
      {
          console.log(xhr.response)
      }
  })
  xhr.open("PUT", `https://dataninja-97039-default-rtdb.firebaseio.com/${idProd}.json`)
  xhr.send(JSON.stringify(PersonObject))
}

function createNode(typeElement, text){
  let node = document.createElement(typeElement)
  node.textContent = text
  return node
}

function printTable(data){
  let tBody = document.getElementById("listArticles")
  while (tBody.lastElementChild){
      tBody.removeChild(tBody.lastElementChild)
  }

  let arrayProd=Object.values(data), index=0
  
  for (let objectRes of arrayProd){
      let {nombre,precio,tamano}=objectRes
      let tr = document.createElement("tr")
      let tdIndex = createNode("td", index + 1)
      let tdImage = createNode("td", "Image")
      let tdName = createNode("td", nombre)
      let tdPrice = createNode("td", precio)

      let sizesProducts=""
      tamano.forEach((element,index) => {
          sizesProducts+=element
          tamano.length-1==index?sizesProducts:sizesProducts+=", "
      })
      
      let tdSize= createNode("td", sizesProducts)

      let tdButtons = document.createElement("td")
      let btnPencil=document.createElement("button")
      let btnDanger=document.createElement("button")
      let iPencil=document.createElement("i")
      let iDanger=document.createElement("i")

      iPencil.classList.add("fas")
      iPencil.classList.add("fa-pencil-alt")
      iDanger.classList.add("fas")
      iDanger.classList.add("fa-trash-alt")
      btnPencil.classList.add("btn")
      btnPencil.classList.add("btn-primary")
      btnDanger.classList.add("btn")
      btnDanger.classList.add("btn-danger")
      btnPencil.appendChild(iPencil)
      btnDanger.appendChild(iDanger)

      btnPencil.addEventListener("click", updateArticle)
      btnDanger.addEventListener("click",removeArticle)

      tdButtons.appendChild(btnPencil)
      tdButtons.appendChild(btnDanger)
      
      tr.appendChild(tdImage)
      tr.appendChild(tdIndex)
      tr.appendChild(tdName)
      tr.appendChild(tdPrice)
      tr.appendChild(tdSize)
      tr.appendChild(tdButtons)

      tBody.appendChild(tr)
  
      index++
  }
}

document.querySelector(".added-product").addEventListener("click",(event)=>{
  event.preventDefault()
  let product=getDataForm()
  if (product)
      createArticle(product)
  // else
})

getArticle()