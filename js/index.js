window.addEventListener('load', function () {
    // 获取元素
    var focus = document.querySelector('.focus');
    var ul = focus.children[0];
    var ol = focus.children[1];
    // 获得focus的宽度
    var w = focus.offsetWidth;
    // 利用定时器自动轮播
    var index = 0;
    var timer = setInterval(function () {
        index++;
        var translatex = -index * w;
        // 用css3 中的transform来移动，这样就不用给元素加定位
        ul.style.transform = 'translateX(' + translatex + 'px)'
        // 添加css3 中的过渡的效果
        ul.style.transition = 'all .3s';
    }, 2000);

    // 等着过渡完成之后，再去判断
    // 监听过渡完成的事件 transitionend 
    ul.addEventListener('transitionend', function () {
        // 无缝滚动
        if (index >= 3) {
            index = 0;
            // 去掉过渡效果，让ul快速的跳到目标位置
            ul.style.transition = 'none';
            // 利用最新的索引号乘以宽度 去滚动图片
            var translatex = -index * w;
            ul.style.transform = 'translateX(' + translatex + 'px)'
        } else if (index < 0) {
            index = 2;
            // 去掉过渡效果，让ul快速的跳到目标位置
            ul.style.transition = 'none';
            // 利用最新的索引号乘以宽度 去滚动图片
            var translatex = -index * w;
            ul.style.transform = 'translateX(' + translatex + 'px)'
        }

        // 小圆点跟随变化
        // 把ol里面li带有current类名的选出来去掉类名 remove
        ol.querySelector('li.current').classList.remove('current');
        // 让当前索引号的li 加上current
        ol.children[index].classList.add('current');
    });

    // 手指滑动轮播图
    // 触摸元素 touchstart: 获取手指初始坐标
    var startX = 0;
    var moveX = 0;
    var flag = false;
    ul.addEventListener('touchstart', function (e) {
        startX = e.targetTouches[0].pageX;
        // 手指触摸的时候就停止定时器
        clearInterval(timer);
    });
    // 移动手机 touchmove: 计算手指的滑动距离，并且移动盒子
    ul.addEventListener('touchmove', function (e) {
        // 计算移动的距离
        moveX = e.targetTouches[0].pageX - startX;
        // 移动盒子： 盒子原来的位置 + 手指移动的距离
        var translatex = -index * w + moveX;
        // 手指拖动的时候不需要动画效果，所以不需要过渡效果
        ul.style.transition = 'none';
        ul.style.transform = 'translateX(' + translatex + 'px)';
        // 阻止屏幕滚动的行为
        e.preventDefault();
        flag = true; // 如果用户手指移动过我们再去判断，否则不做判断效果
    });

    // 手指离开 根据移动距离去判断回弹还是播放上一张下一张
    ul.addEventListener('touchend', function () {
        if (flag) {
            // (1) 如果移动距离大于50像素，我们就播放上一张或者下一张
            if (Math.abs(moveX) > 50) {
                // 如果是右滑就是 播放上一张 moveX是正值
                if (moveX > 0) {
                    index--;
                } else {
                    // 如果是左滑就是 播放下一张 moveX是负值
                    index++;
                }
                var translatex = -index * w;
                ul.style.transition = 'all .3s';
                ul.style.transform = 'translateX(' + translatex + 'px)';
            } else {
                // (2) 如果移动距离小于50像素，我们就回弹
                var translatex = -index * w;
                ul.style.transition = 'all .3s';
                ul.style.transform = 'translateX(' + translatex + 'px)';
            }
        }
        // 手指离开的时候就重新开启定时器
        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            var translatex = -index * w;
            ul.style.transition = 'all .3s';
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }, 2000);
    })
});