
// 初始金额
var money = '';
var initKey = 1;

$(function() {

    // 选择通道的点击事件
    $('#paywaylist').on('click', 'li', function() {
        // 显示状态
        var flag = $(this).children('.p-context').is(':hidden');
        if (flag) {
            $(this).addClass('active');     // 激活显示状态
            $(this).siblings().removeClass('active');   // 移除兄弟元素的激活状态
        }
        // 弹起软键盘
        keyBoardSideUpChange();
    });

    // 选择分期的点击事件
    $('.p-context').on('click', 'li', function() {
        var flag = $(this).find('.stage').hasClass('stage-selected');
        if (!flag) {
            $(this).find('.stage').addClass('stage-selected').removeClass('stage-default');
            $(this).siblings().find('.stage').removeClass('stage-selected').addClass('stage-default');
        }
        // 弹起软键盘
        keyBoardSideUpChange();
    });

    // 支付 button 点击事件
    $('.btn').on('click', function(){
        $(this).addClass('btn-baitiao-pay');
    });

    // 金额软键盘 点击事件
    $("#keyTable tr td").click(function () {
        var keyMoney = $(this).html();
        if (keyMoney.lastIndexOf('span') > 0) {
            stageVal = "";
            clearMoney();
        } else if (keyMoney=="支付") {
             // TODO 发起支付
        } else {
            stageVal = "";
            if (keyMoney=="·") {
                keyMoney = ".";
            }
            keyNum(keyMoney);
        }
    });

    // 金额输入框获取焦点事件
    $('#amount').focus(function() {
        keyBoardSideDownChange();
    });

});


/**
 * 弹起软键盘
 *
 */
function keyBoardSideUpChange() {
    $('.keybox').slideUp('speed');
    $('.bottom-fixed').removeClass('dn');
}

/**
 * 隐藏软键盘事件
 *
 */
function keyBoardSideDownChange() {
    $('.keybox').slideDown('speed');
    $('.bottom-fixed').addClass('dn');
}

/**
 * 清除事件
 *
 */
function clearMoney() {
    money = money.substring(0, money.length-1);
    $('#amount').val(money);
}

/**
 * 软键盘数据校验
 *
 * @param {*} keyMoney
 * @return {*}
 */
function keyNum(keyMoney) {
    //初始化金额
    if (initKey == 1) {
        //首个数字不能输入“.”
        if (keyMoney == '.') {
            return;
        }
    }
    //小数点只能输入1次
    if (money.indexOf('.') > 0 && keyMoney == '.') {
        return;
    }
    //2位小数
    if (money.indexOf('.') > 0) {
        var scaleMoney = money.substring(money.indexOf('.') + 1);
        if (scaleMoney.length >= 2) {
            return;
        }
    }
    if (money.length >= 9) {
        if (money.indexOf('.') > 0 || keyMoney == '.') {

        } else {
            return;
        }
    }
    //如果第1位是0，则后面必须是小数
    if (money == '0') {
        //let dian = money.substring(1,1);
        if (keyMoney != '.') {
            return;
        }
    }
    initKey = 2;
    money = money + keyMoney;
    $("#amount").val(money);
}