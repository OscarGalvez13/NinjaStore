let ObjectToEdit={}

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
  printTable(objectResponse)
}

function getArticle(){
  let objectResponse={}
  let arrayArticles=[]
  const xhr=new XMLHttpRequest()
  xhr.addEventListener("readystatechange",()=>{
    if (xhr.readyState==4)
      if(xhr.status>= 200 && xhr.status <= 299) {
          objectResponse=JSON.parse(xhr.responseText)
          if(objectResponse) {
            for (const key in objectResponse) {
              let producto = objectResponse[key]
              producto = { ...producto, id:key}
              arrayArticles = [...arrayArticles, producto]
            }
            printTable(arrayArticles)
          }else {
              console.log("No hay Productos u.u")
          }
      }
      else
        console.log("Ocurrio un error: ", xhr.status, "Not Found")
  })
  xhr.open("GET", "https://dataninja-97039-default-rtdb.firebaseio.com/productos.json")
  xhr.send()
}

function removeArticle (id) {
  // console.log(id)
  const xhr = new XMLHttpRequest()
  xhr.addEventListener("readystatechange", () => {
      if (xhr.readyState === 4) {
          if (xhr.status === 200) {
              if(xhr.responseText)
                console.log("El elemento fue eliminado correctamente")
              getArticle()
          }
      }
  })
  xhr.open("DELETE", `https://dataninja-97039-default-rtdb.firebaseio.com/productos/${id}.json`)
  xhr.send()
}

function updateProduct(prod){
  let inputs=document.querySelectorAll(".form input, .form textarea")
  const {name,description,stock,precio,image,sizes,id}=prod

  inputs.forEach( input =>{
    for (const key in prod) {
        if(input.name === key){
            input.value = prod[key]
        }
    }
    if (input.classList.contains('form-check-input')) {
      sizes.forEach( size => input.checked = false)
    }
    if (input.classList.contains('form-check-input')) {
      sizes.forEach( size => {
        if(size === input.name){
              input.checked = true
        }
      })
    }
  })
  ObjectToEdit.name = name
  ObjectToEdit.precio = precio
  ObjectToEdit.description = description
  ObjectToEdit.image = image
  ObjectToEdit.id = id
  ObjectToEdit.sizes = sizes
  ObjectToEdit.stock = stock
}

function updateArticle(){
  const {id}=ObjectToEdit
  console.log(ObjectToEdit)
  console.log(id)
  // console.log (id)
  // const xhr=new XMLHttpRequest()
  // xhr.addEventListener("readystatechange",()=>{
  //     // if (xhr.readyState==4 && xhr.status==200)
  //     //   console.log(xhr.responseText)
  // })
  // xhr.open("PATCH", `https://dataninja-97039-default-rtdb.firebaseio.com/productos/${id}.json`)
  // xhr.send(JSON.stringify(ObjectToEdit))
  // printTable(ObjectToEdit)
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
      let {name,precio,sizes,stock,id,image}=objectRes
      let tr = document.createElement("tr")
      let tdIndex = createNode("td", index + 1)

      const img=document.createElement('img')
      img.src=image
      img.classList.add("img-fluid")
      img.setAttribute("width",30)

      let tdImage = document.createElement('td')
      tdImage.appendChild(img)

      let tdName = createNode("td", name)
      let tdPrice = createNode("td", `$${precio}`)
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
      let btnEdit=document.createElement("button")
      let btnDelete=document.createElement("button")
      let iPencil=document.createElement("i")
      let iDanger=document.createElement("i")

      iPencil.classList.add("fas", "fa-pencil-alt")
      iDanger.classList.add("fas", "fa-trash-alt")
      btnEdit.classList.add("btn", "btn-primary", "btnEdit")
      btnDelete.classList.add("btn", "btnDelete", "btn-danger")

      btnEdit.onclick = () => updateProduct(objectRes)
      btnDelete.onclick = () => removeArticle(id)

      btnEdit.appendChild(iPencil)
      btnDelete.appendChild(iDanger)

      tdButtons.appendChild(btnEdit)
      tdButtons.appendChild(btnDelete)
      
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

//agregar datos
document.querySelector(".added-product").addEventListener("click",(event)=>{
  event.preventDefault()
  let product=getDataForm()
  // console.log(product)
  if (product)
    createArticle(product)
  else
    alert("Campos Obligatorios")
})

//para editar datos
document.querySelector(".edit-product").addEventListener("click",(event)=>{
  event.preventDefault()
  let product=getDataForm()
  if (product)
    updateArticle()
  else
    alert("Campos Obligatorios")
})

// cambiar el nombre de la card
document.querySelector("#txtName").addEventListener("focusout",(event)=>{
  event.preventDefault()
  let nom=document.querySelector("#name-prod")
  let txtName=document.getElementById("txtName")
  let newName=`¡${txtName.value}!`
  nom.textContent=newName
})

// cambia el precio de la card
document.querySelector("#txtPrice").addEventListener("focusout",(event)=>{
  event.preventDefault()
  let nom=document.querySelector("#price-prod")
  let txtPrice=document.getElementById("txtPrice")
  let newName=`${txtPrice.value}.00`
  nom.textContent=newName
})

document.querySelector("#floatingTextarea2").addEventListener("focusout",(event)=>{
  event.preventDefault()
  let description=document.querySelector("#desc-prod")
  let txtdesc=document.getElementById("floatingTextarea2")
  description.textContent=txtdesc.value
})

getArticle()