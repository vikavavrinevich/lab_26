const product = {
    id: "1",
    name: "PC",
    category: "electronic",
    price: 4000,
};

// GET
const get = () => {
    fetch("http://localhost:3000/product/list", {
        headers: {
            "Content-Type": "application/json"
        },
        method: "GET"
    })
    .then(res => res.json()) 
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error fetching product list:', error);
    });
}

// PUSH
const push = (element) => {
    console.log(JSON.stringify(element))
    fetch("http://localhost:3000/product/create", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(element)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error pushing product:', error);
    });
}

// UPDATE
const update = (id, element) => {
    console.log(JSON.stringify(element))
    fetch(`http://localhost:3000/product/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(element)
    })
    .then(res => res.json())
    .then(data => {
        console.log('Updated:', data);
    })
    .catch(error => {
        console.error('Error updating product:', error);
    });
}

// DELETE
const deleteProduct = (id) => {
    fetch(`http://localhost:3000/product/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "DELETE",
    })
    .then(res => res.json())
    .then(data => {
        console.log('Deleted:', data);
    })
    .catch(error => {
        console.error('Error deleting product:', error);
    });
}



 push(product)