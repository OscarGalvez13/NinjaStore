

function getDataForm(){
  let fields=document.querySelectorAll(".form input:not(input[type='checkbox']), .form textarea")
  let checkboxs=document.querySelectorAll(".form input[type='checkbox']")
  let quantityFieldEmpty=0, product={}

  fields.forEach(field=>{
      if (!field.value){
          quantityFieldEmpty++
      }
      else{
          product={...product, [field.name]: field.value}
          field.value=""
      }
  })

  let sizes=[]
  checkboxs.forEach(checkbox=>{
      if (checkbox.checked) sizes=[...sizes, checkbox.value]
  })

  if(sizes.length===0)quantityFieldEmpty++

  product={...product,sizes}
  
  return !quantityFieldEmpty > 0 ? product : null
}

function createArticle(productObject){
  const xhr=new XMLHttpRequest()
  xhr.addEventListener("readystatechange",()=>{
      if (xhr.readyState==4 && xhr.status==200)
        console.log(xhr.responseText)
  })
  xhr.open("POST", "https://dataninja-97039-default-rtdb.firebaseio.com/productos.json")
  xhr.send(JSON.stringify(productObject))
}

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
      }else
        console.log("Ocurrio un error: ", xhr.status, "Not Found")
  })
  xhr.open("GET", "https://dataninja-97039-default-rtdb.firebaseio.com/.json")
  xhr.send()
}

function removeArticle (event) {
  console.log("Eliminando... jeje")
  // Eliminar del array
  let positionPerson = event.target.dataset.PersonIndex
  PersonArray.splice(positionPerson, 1)
  console.log(PersonArray)
  getArticle()
}

function updateArticle(idProd,newDataToUpdate){
  const xhr=new XMLHttpRequest()
  xhr.addEventListener("readystatechange",()=>{
      if (xhr.readyState==4 && xhr.status==200)
        console.log(xhr.response)
  })
  xhr.open("PATCH", `https://dataninja-97039-default-rtdb.firebaseio.com/${idProd}.json`)
  xhr.send(JSON.stringify(newDataToUpdate))
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
      let {name,precio,sizes,stock}=objectRes
      let tr = document.createElement("tr")
      let tdIndex = createNode("td", index + 1)
      let tdImage = createNode("td", "Image")
      let tdName = createNode("td", name)
      let tdPrice = createNode("td", precio)
      let tdStock=createNode("td",stock)

      let sizesProducts=""
      sizes.forEach((element,index) => {
          if (element){
            sizesProducts+=element
            sizes.length-1==index?sizesProducts:sizesProducts+=", "
          }
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
      tr.appendChild(tdStock)
      tr.appendChild(tdSize)
      tr.appendChild(tdButtons)

      tBody.appendChild(tr)
  
      index++
  }
}

document.querySelector(".added-product").addEventListener("click",(event)=>{
  event.preventDefault()
  let product=getDataForm()
  console.log(product)
  if (product)
    createArticle(product)
  else
    alert("Campos Obligatorios")
})

document.querySelector("#txtName").addEventListener("focusout",(event)=>{
  event.preventDefault()
  let nom=document.querySelector("#name-prod")
  let txtName=document.getElementById("txtName")
  let newName=`¡${txtName.value}!`
  nom.textContent=newName
})

document.querySelector("#txtPrice").addEventListener("focusout",(event)=>{
  event.preventDefault()
  let nom=document.querySelector("#price-prod")
  let txtPrice=document.getElementById("txtPrice")
  let newName=`¡${txtPrice.value}!`
  nom.textContent=newName
})

getArticle()