(function () {

    // 初始化第一个大小
    let $content = $("#content"),
        $box1 = $content.find(".box1");

    $box1.height($(window).height() - parseFloat($content.css("marginTop")));
    $(window).resize(function () {
        $box1.height($(window).height() - parseFloat($content.css("marginTop")));
    })
})();

// 点击跳到下一张
(function () {
    let $content = $("#content"),
        $box = $content.find(".box"),
        $btn = $content.find(".b-btn");
    console.log($("#nav-box").height());
    $btn.click(function () {
        let top = $box.eq($(this).index(".b-btn") + 1).offset().top - ($(window).height() - $box.eq($(this).index(".b-btn") + 1).height() + $("#nav-box").height()) / 2;
        $("html").animate({
            scrollTop: top
        }, 1000);
    })
})();

// 盒子2的自动跳转或者点击
(function () {
    let $content = $("#content"),
        $list = $content.find(".box3 .b3-list ul li"),
        $imgs = $content.find(".box3 .b3-img ul li"),
        len = $imgs.length,
        index = 0;

    //初始化
    $imgs.eq(index).show();
    $list.eq(index).addClass("on");

    $list.click(function () {
        $imgs.eq(index).fadeOut(800).prevObject.eq($(this).index(".b3-list li")).fadeIn(800);
        $list.removeClass().eq($(this).index(".b3-list li")).addClass("on");
        index = $(this).index(".b3-list li");
    })
    // 自动轮播
    play();
    function play(){
        time = setInterval(function(){
            $imgs.eq(index).fadeOut(800);
            $list.removeClass()
            index = ++index % len;
            console.log(index);
            $imgs.eq(index).fadeIn(800);
            $list.eq(index).addClass("on");
        },3000)
    }
})()