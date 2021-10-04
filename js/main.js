
let products = []

const getProducts = () => {
    const xhr = new XMLHttpRequest()

    xhr.addEventListener("readystatechange", () => {
        if(xhr.readyState === 4 && xhr.status === 200) {
            let products = JSON.parse(xhr.responseText)
            // console.log(products)
            // console.log(Object.keys(products))
            products = Object.keys(products).map(key => {
                let product = products[key]
                // console.log(key)
                // console.log(product)
                return {...product, id: key}
            })
            printProducts(products)
            // console.log(products)
        }
    })

    xhr.open("GET", "https://dataninja-97039-default-rtdb.firebaseio.com/productos.json")
    xhr.send()
}

const printProducts = arrayProducts => {
    let list = document.querySelector("#list-products")

    let allProducts = arrayProducts.reduce((acc, product) => {
        let tBody = document.getElementById("list-products")
        let {name, description, price, id, sizes, image} = product

        let divContainer=document.createElement("div")
        .classList.add("col-12", "col-md-6", "d-flex", "justify-content-center", "my-3")

        let article=document.createElement("article")
        .classList.add("card-anime")


        // Header
        let cardHeader=document.createElement("header")
        .classList.add("card-anime-header", "d-flex", "justify-content-between", "mb-2")
        
        let cardImg=document.createElement("img")
        .classList.add("img-munko")
        cardImg.src=image
        cardImg.alt=name
        
        let divContainerSizes=document.createElement("div")
        .classList.add("sizes-munkos", "d-flex", "flex-column", "justify-content-between")


        let divGrande=document.createElement("div")
        .classList.add("large", "d-flex", "align-items-center")

        let imgSizeGrande=document.createElement("img")
        imgSizeGrande.src="./assets/size-l.svg"
        let pGrande=document.createElement("p")
        let gSpan=document.createElement("span")
        gSpan.textContent="G"
        pGrande.appendChild(gSpan)
        pGrande.textContent="rande"
        
        divGrande.appendChild(imgSizeGrande)
        divGrande.appendChild(pGrande)

        let divMediano=document.createElement("div")
        .classList.add("medium", "d-flex", "align-items-center")

        let imgSizeMediano=document.createElement("img")
        imgSizeMediano.src="./assets/size-l.svg"
        
        let pMediano=document.createElement("p")
        let mSpan=document.createElement("span")
        mSpan.textContent="M"
        pMediano.appendChild(mSpan)
        pMediano.textContent="ediano"

        divMediano.appendChild(imgSizeMediano)
        divMediano.appendChild(pMediano)

        let divPequeno=document.createElement("div")
        .classList.add("small", "d-flex", "align-items-center")
        
        let imgSizePequeno=document.createElement("img")
        imgSizePequeno.src="./assets/size-l.svg"
        
        let pPequeno=document.createElement("p")
        let pSpan=document.createElement("span")
        pSpan.textContent="M"
        pPequeno.appendChild(pSpan)
        pPequeno.textContent="ediano"

        divPequeno.appendChild(imgSizePequeno)
        divPequeno.appendChild(pPequeno)
        
        divContainerSizes.appendChild(divGrande)
        divContainerSizes.appendChild(divMediano)
        divContainerSizes.appendChild(divPequeno)


        cardHeader.appendChild(cardImg)
        cardHeader.appendChild(divContainerSizes)
        //termina Header

        //Inicia section
        let cardSection=document.createElement("section")
        .classList.add=("card-anime-body")

        //termina section

        //inicia footer
        let cardFooter=document.createElement("footer")
        .classList.add("card-anime-footer", "d-flex", "justify-content-between", "mt-4")
        //termina footer

        article.appendChild(cardHeader)
        article.appendChild(cardSection)
        article.appendChild(cardFooter)
        divContainer.appendChild(article)
        let cardProduct = `
        
            <article>
            
            <section class="card-anime-body">
                <h3>${name}</h3>
                <p>${description}</p>
                <h4>$${price}.00 <span>MXN</span> </h4>
            </section>
            <footer class="card-anime-footer d-flex justify-content-between mt-4">
                <div class="heart">
                <i class="far fa-heart"></i>
                </div>
                <button data-product-id="${id}" class="btn btn-primary">Agregar <i class="fas fa-cart-plus"></i></button>
            </footer>
            </article>

        `
        return acc + cardProduct
    }, "")
    // console.log(allProducts)
    // list.innerHTML = allProducts
}

getProducts()