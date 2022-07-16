$(function() {

    getRepaymentInfo();

    /**
     *  input[name="amount"] focus event ， 加载页面就获取焦点
     */
    $('input[name="amount"]').focus();

    /**
     * a click event
     */
    $('#repaymentInfo').on('click', 'a', function() {
        $('ul li a').removeClass('regular-repaym-check');
        $('ul li a .fa-check').remove();
        $(this).addClass('regular-repaym-check');
        $(this).find('span').before('<i class="fa fa-check" aria-hidden="true"></i>');
    });

    /**
     * btn button click event
     */
    $('.btn').on('click', function(){
        $(this).addClass('btn-baitiao-pay');
    });

    /**
     * input[name="amount"] keyup event
     */
    $('input[name="amount"]').keyup(function() {
        var text = $(this).val();
        console.log(text);
        if (text == '') {
            $(this).attr('placeholder', 0.00);
        }
    })
});

/**
 * index.json  data
 */
function getRepaymentInfo() {
    $.getJSON("./data/index.json", function(data) {
        var html = '';
        $(data).each(function(i) {
            console.log(data[i].monthMoney);
            console.log(data[i].month);
            console.log(data[i].monthFree);
            console.log(data[i].monthRate);
            if (i % 2 == 0) {
                html += '<li><div>';
            }
            html += '<a href="javascript:void(0);">'
                + '<span><i class="fa fa-yen"></i>' + data[i].monthMoney + ' × ' + data[i].month + '期' + '</span>'
                + '<p>含服务费 <i class="fa fa-yen">' + data[i].monthFree + '/期' + '</i>' + data[i].monthRate+ '</p>'
                + '</a>';
            if (i % 2 == 1) {
                html += '</li></div>';
            }
        });
        $('#repaymentInfo').append(html);

    })
}