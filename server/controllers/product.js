const Products = require('/models/Products');
const User = require('/models/User');

async function getAllProducts() {
    var products = [];
    var cards = [];
   // error massege
    const errorMessage = "We don't have this items in stock";
    

    await fetch('', 
    {
        method: 'GET',
        mode: 'cors'
    })

    .then(response => response.json())
    .then(data => products = data)
    .catch(_ => cards.push(errorMessage));

    // product by category
   
            var product = products[index];
        
            var productID = product.id;
            var productName = product.name;
            var productColor = product.color;
            var productPrice = product.price;
            var productDescription = product.description;

        var card = `
            <div class="col-sm" id=${productID}>
            <div class="card bg-dark" style="width: 18rem;">
                <img class="card-img-top" src=${pproductColor} alt="product Color">
                <div class="card-body text-white">
                    <h5 class="card-title">${productName}</h5>
                    <p class="card-text">${productDescription}</p>
                    <br />
                    <p><strong>Price: $</strong> ${productPrice}</p>
                </div>
                <div class="card-footer bg-transparent text-center row">
                    <button type="button" class="btn btn-outline-warning btn-sm col" id="buy-btn">Buy Product</button>
                    <button type="button" class="btn btn-outline-warning btn-sm col offset-md-1" id="edit-btn">Edit Product</button>
                </div>
                </div>
            </div>
        `;

            cards.push(card);
        }
  

    return cards;

    // create new product

    async function createNewProduct(product) {
    var result = false;

    await fetch('', 
    {
        method: 'POST',
        body: JSON.stringify(product),
        headers: {
            'Content-Type': 'json'
        }
    })
    .then(_ => result = true)
    .catch(_ => result = false);

    return result;
}


// update product
async function updateProduct(id, product) {
    var result = false;

    await fetch(` ${id}`, 
    {
        method: 'POST',
        body: JSON.stringify(product),
        headers: {
            'Content-Type': 'json'
        }
    })
    .then(_ => result = true)
    .catch(_ => result = false);

    return result;
}


