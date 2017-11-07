(
    function () {

        //播放器
        $(function () {
            $(".v-icon").click(function () {
                $(this).hide();
                $("video").show()[0].play();
                clearInterval(timer);
            })
        })

        $(function () {
            let $points = $(".t-point"),
                $point = $points.children(),
                index = 0,
                len = $point.length;

            //初始化按钮
            $(".c-pic").eq(index).show();

            $point.click(function () {
                if (index !== $(this).index()) {
                    $(".c-pic").eq(index).fadeOut(1000).prevObject.eq($(this).index()).fadeIn(1000);
                    $point.eq(index).removeClass("on").prevObject.eq($(this).index()).addClass("on");
                    index = $(this).index();
                }
            })

            play();

            function play() {
                timer = setInterval(function () {
                    var currentIndex = index;
                    $(".c-pic").eq(currentIndex).fadeOut(1000).prevObject.eq(++index % len).fadeIn(1000);
                    $point.eq(currentIndex).removeClass("on").prevObject.eq(index % len).addClass("on");
                    index %= len;
                }, 2500)
            };

            $("#content").mouseenter(function () {
                clearInterval(timer);
            });

            $("#content").mouseleave(function () {
                play();
            });

            document.addEventListener('visibilitychange', function (e) {
                if (e.target.hidden || e.target.webkitHidden) {
                    clearInterval(timer);
                } else {
                    play();
                }
            })

        })
    }
)();

//手机滑动播放
(function () {
    $(function () {
        let $classic = $("#classic"),
            $ul = $classic.find(".c-list ul"),
            $li = $ul.children(),
            $btn = $classic.find(".btn"),
            $tab = $classic.find(".tab span"),
            len = $li.length;
        leftNum = $li.eq(0).width();

        //初始化
        let mid = Math.floor(len / 2),
            time = new Date();

        $(window).scroll(function () {
            if ($(window).scrollTop() > 400) {
                change();
            }
        })

        $btn.click(function () {
            if (new Date() - time > 1000) {
                if ($(this).index(".btn")) {
                    change(function () {
                        mid = ++mid % len;
                    })
                    $ul.stop().animate({
                        marginLeft: -leftNum
                    }, function () {
                        $(this).css("marginLeft", 0);
                        $ul.children().eq(0).appendTo($ul);
                    })

                } else {
                    change(function () {
                        (--mid < 0) && (mid = len - 1)
                    })
                    $ul.stop().animate({
                        marginLeft: leftNum
                    }, function () {
                        $(this).css("marginLeft", 0);
                        $ul.children().eq(len - 1).prependTo($ul);
                    })
                }
                time = new Date();
            }
        })

        function change(fn) {
            $li.removeClass();
            $tab.removeClass();
            fn && fn();
            $li.eq(mid - 1).addClass("mid");
            $li.eq(mid).addClass("big");
            $li.eq(mid + 1).addClass("mid");
            $tab.eq(mid).addClass("on")
        }
    })
})()