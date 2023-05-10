$(document).ready(() => {

    console.log('cart.js -> Start');

    $('#catalog').on('click', '.add-to-cart-btn', (event) => {
        // 1
        console.log('add-btn -> Click');
        const userId = $('#user-id').val();
        console.log('User-ID: ' + userId);
        // 2
        if (userId == 'None') {
            alert('Для використання кошику Ви повинні авторизуватись!');
        } else {
            // 3
            let productId = $(event.target).prev().val();
            console.log('Product-ID: ' + productId);
            // 4
            $.ajax({
                url: '/orders/ajax_cart',
                data: `uid=${userId}&pid=${productId}`,
                success: (response) => {
                    console.log(response);
                    alert('Товар успішно доданий до кошика!');
                    $('#cart-count').text(response.count);
                    $('#_count').text(`Товарів у кошику: ${response.count} шт`);
                    $('#_total').text(`ВАРТІСТЬ: ${response.total} грн`);
                }
            });
        }
    });

});