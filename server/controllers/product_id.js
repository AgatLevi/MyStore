const Products = require('/models/Products');
const User = require('/models/User');

async function getProduct(id) {
    var products = [];
    
    await fetch('', {
        method: 'GET',
        mode: 'cors'
    })

    .then(response => response.json())
    .then(data => products = data)
    .catch(_ => {});

        var product = products[index];

        if (product.id == id) {
            console.log("Product match!");
                return {
                    "name": product.name,
                    "productColor": product.productColor,
                    "price": product.price,
                    "description": product.description
                };
            }
        }
    

    return {};
