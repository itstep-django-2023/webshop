const doCalculate = () => {
    // *
    console.log('doCalculate() -> Work');
    // 1
    let checkedBoxes = $('.check:checked');
    let totalPrice = 0;
    let selOrderIds = "";
    // 2
    for (let box of checkedBoxes) {
        let parentRow = $(box).parent().parent();
        let currentPrice = parseFloat($(parentRow).find('td.price-cell').text());
        let currentCount = parseFloat($(parentRow).find('td.count-cell').find('input').val());
        totalPrice += currentPrice * currentCount;
        selOrderIds += $(parentRow).find('td.id-cell').text() + ',';
    }
    selOrderIds += totalPrice;
    // 3
    console.log(`totalPrice: ${totalPrice}`);
    console.log(`selOrderIds: ${selOrderIds}`);
    $('#total').text(`${totalPrice.toFixed(2)} грн`);
    // 4
    if (totalPrice == 0) {
        $('#bill-btn').fadeOut(1000);
    } else {
        $('#bill-btn').fadeIn(1000);
    }
};


$(document).ready(() => {

    // 1
    console.log('calc_order.js -> Start');
    doCalculate();

    // 2
    $('.check').click((event) => {
        console.log('input.check -> click');
        doCalculate();
    });

});