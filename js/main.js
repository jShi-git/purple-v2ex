/**
 * v2ex皮肤
 * @auth stuart.shi
 * @link http://www.shizuwu.cn
 * @time 2015
 */
var niceConfig = {
    "cursorwidth": "3",
    "cursoropacitymax": "0.8",
    "bouncescroll": true
};
$(function() {
    var navbar = $('#Top .content a');
    var tabbar = $('#Tabs a');
    var newNavbar = "<div id='k_navbar' class='bars k_color_dark'></div><div id='k_tabbar' class='bars k_color_light'></div>";
    var iframe = '<iframe id="showpage" frameborder="0" allowtransparency="true" width="100%" scrolling="auto" style="margin-bottom:10px;" src="">' + '</iframe>';
    var shadow = '<div class="shadow"><div class="loading-icon"></div></div>';
    var article = $('#Main .item:eq(0), #TopicsNode .cell:eq(0)').find('.item_title a').attr("href");

    $('body').prepend(newNavbar);
    $('#k_navbar').append(navbar);
    $('#k_tabbar').append(tabbar);

    $('.bars').css('height', window.screen.height);
    $('#Wrapper').css({
        'width': document.body.clientWidth - 140,
        "padding": "0px"
    });
    $("#Main").css({
        "margin": "0px"
    });

    /**
     * 导航处理
     */
    var oriAvatar = $('#Rightbar .box .cell table tbody tr td');
    if(oriAvatar.size()) {
        var avater = oriAvatar[0].innerHTML;
    } else {
        var avater = "";
    }
    var notificationText = $('.inner a').text();
    var notificationStart = notificationText.indexOf('未读提醒');
    notificationText = notificationText.substr(notificationStart - 3, 5);
    var notification = '<a href="http://www.v2ex.com/notifications">' + notificationText + '</a>';
    $('#k_navbar a:eq(0)').remove();
    $('#k_navbar').prepend(notification).prepend(avater);
    $('#k_navbar a:eq(3)').attr('href', 'http://www.v2ex.com/new').text('发帖');
    $('#k_navbar a img').css('border-radius', '50%');
    $('#k_navbar a,#k_tabbar a').addClass('k_color_hover');
    $('a.count_livid').addClass('k_color_count');
    $('a.node').addClass('k_color_node');

    /**
     * 帖子列表处理
     */
    $('#Main .item,#TopicsNode .cell').addClass('k_color_item').click(function(e) {
        e.preventDefault();
        $(".shadow").show();
        $('#Main .item,#TopicsNode .cell').removeClass('k_color_choosen');
        $(this).addClass('k_color_choosen');
        $('#showpage').attr("src", $(this).find('.item_title a').attr('href'));
        _fixBox();
    });

    if (article) {
        $('#Rightbar').empty().append(iframe).prepend(shadow);
        $("#showpage").attr("src", article);
        _fixBox();
    } else {
        $('#Rightbar').empty();
    }

    $("body").niceScroll(niceConfig);
    $(".shadow").click(function() {
        $(this).hide();
    })
});

/**
 * 调整盒子模型
 * @param  {[type]} resize [description]
 * @return {[type]}        [description]
 */
function _fixBox(resize) {
    var wh = $(window).height();
    $('#Main').css({
        "width": document.body.clientWidth - 690 - 150 + "px"
    });
    $('#showpage, #Main, #k_navbar, #k_tabbar').css({
        "height": wh + "px"
    });

    $("#Rightbar").css({
        'width': "700px"
    }).show();
    if (resize) {
        $("#showpage, #Main,#k_navbar,#k_tabbar").getNiceScroll().resize();
    } else {
        $("#showpage, #Main,#k_navbar,#k_tabbar").niceScroll(niceConfig);
    }
    $("#showpage").load(function() {
        $(".shadow").hide();
    });
}
$(window).on("resize", function() {
    _fixBox(1);
});