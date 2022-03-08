function deleteProduct(id) {
    fetch(`http://localhost:5000/api/products/stock/${id}`, {
        method: 'DELETE',
    })
        .then(() => {
            window.location = "/stock";
        });
}