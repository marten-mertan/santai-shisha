$(document).ready(function () {
    
    //плавный скролл
    function scrollToAnchor (elem) {
        $(document).on("click", elem, function (event) {
            event.preventDefault();
            var id  = $(this).attr('href'),
                menuHeight = 0,
                top = $(id).offset().top,
                topIndent = top - menuHeight;

            $("html, body").animate({scrollTop: topIndent}, 1000);
        });
    };

    scrollToAnchor('.js-link');

    $('.js-head-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        infinite: true,
        prevArrow: '<a class="arrows back"></a>',
        nextArrow: '<a class="arrows next"></a>'
    });

    $('.js-about-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        infinite: true,
        prevArrow: '<a class="about-arrows back"></a>',
        nextArrow: '<a class="about-arrows next"></a>'
    });
    $(document).on('click', '.js-gallery-back', function () {
        let speed = 700;
        let transform = parseInt($('.gallery-wrap').css('transform').split(',')[4]);
        if (transform + speed < 0){
            $('.gallery-wrap').css("transform", `translateX(${transform + speed}px)`);
        } else{
            $('.gallery-wrap').css("transform", `translateX(${0}px)`);
        }
        
    });
    $(document).on('click', '.js-gallery-forward', function () {
        let speed = 700;
        let transform = parseInt($('.gallery-wrap').css('transform').split(',')[4]);
        let width = Math.abs($('.gallery-wrap').width() - $(document).width());
        if (transform - speed > -width){
            $('.gallery-wrap').css("transform", `translateX(${transform - speed}px)`);
        } else{
            $('.gallery-wrap').css("transform", `translateX(${-width}px)`);
        }
        
    });

    $('.js-reviews-slider').slick({
        slidesToShow: 2,
        slidesToScroll: 2,
        arrows: true,
        dots: false,
        infinite: true,
        prevArrow: '<a class="reviews-arrows back"></a>',
        nextArrow: '<a class="reviews-arrows next"></a>',
        responsive: [
            {
              breakpoint: 1560,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
        ]
    });

    $(document).on('click', '.js-popup-close', function (e) {
        e.preventDefault();
        var $html = $('html');
        $(this).parents('.mfp-wrap').removeClass('is-visible');
        $('.mfp-bg').removeClass('is-visible');
        $html.css({
            'margin-right':'0'
        }).removeClass('lock-html');
        $('.wrapper').removeClass('fixed-input');
    });

    function showPopup(icon, popup) {
        $(document).on('click', icon, function (e) {
            var windowWidth = (window.innerWidth );
            var documentWidth = (document.documentElement.clientWidth );
            var $html = $('html');
            e.preventDefault();
            $(popup).addClass('is-visible');
            $('.mfp-bg').addClass('is-visible');
            $html.addClass('lock-html');
            $('body').addClass('fixed-input');
            if(windowWidth > documentWidth){
                $('.mfp-wrap').css({
                    'overflow-y':'scroll'
                });
                // console.log('Есть полоса прокрутки');
            }else {
                // console.log('Нет полосы прокрутки');
            }
        });
    }
    showPopup(".js-burger", '.js-popup-menu-mobile');
    showPopup(".js-question", '.js-popup-form');

    var $sections = $('.js-section');
    $(window).scroll(function() {
        $sections.each(function(i,el){
            var top  = $(el).offset().top - 120;
            var bottom = top +$(el).height();
            var scroll = $(window).scrollTop();
            var id = $(el).attr('id');
            if( scroll > top && scroll < bottom){
                $('.js-link.active').removeClass('active');
                $('.js-link[href="#'+id+'"]').addClass('active');
    
            }

            //fixed header
            if (i == 0){
                var windowHeight = window.innerHeight;
                if( scroll < (180)){
                    $('.header.float').removeClass('active');
                } else{
                    $('.header.float').addClass('active');
                }
            }

            //fixed mobile header
            if (i == 0){
                var windowHeight = window.innerHeight;
                if( scroll < (140)){
                    $('.header-mobile').removeClass('active');
                } else{
                    $('.header-mobile').addClass('active');
                }
            }
        });
    });

    $(document).on('click', '.js-tab', function (e) {
        e.preventDefault();
        $('.js-tab').removeClass('active');
        $(this).addClass('active');
        let tab = $(this).data('tab');
        $('.js-tab-content').removeClass('active');
        $('#'+tab).addClass('active');
    });

    // 100vh на мобилках
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    window.addEventListener('resize', () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });

    $(function() {  
        $('.js-btn-hover')
          .on('mouseenter', function(e) {
                  var parentOffset = $(this).offset(),
                    relX = e.pageX - parentOffset.left,
                    relY = e.pageY - parentOffset.top;
                  $(this).find('.hover').css({top:relY, left:relX})
          })
          .on('mouseout', function(e) {
                  var parentOffset = $(this).offset(),
                    relX = e.pageX - parentOffset.left,
                    relY = e.pageY - parentOffset.top;
              $(this).find('.hover').css({top:relY, left:relX})
          });
    });

    function preload(images) {
        if (typeof document.body == "undefined") return;
        try {
            var div = document.createElement("div");
            var s = div.style;
            s.position = "absolute";
            s.top = s.left = 0;
            s.visibility = "hidden";
            s.overflow = "hidden";
            s.width = "100%";
            document.body.appendChild(div);
            div.innerHTML = "<img src=\"" + images.join("\" /><img src=\"") + "\" />";
        } catch(e) {
            // Error. Do nothing.
        }
    }

    $('.js-gallery-item').on('click', function(e) {
        $('.popup-gallery-image img').attr('src', '');
        var index = 0;
        var windowWidth = (window.innerWidth );
        var documentWidth = (document.documentElement.clientWidth );
        var $html = $('html');
        var items = $('.js-gallery-item');
        var src = [];
        e.preventDefault();
        $('.popup-gallery').addClass('is-visible');
        $('.mfp-bg').addClass('is-visible');
        $html.addClass('lock-html');
        $('body').addClass('fixed-input');
        if(windowWidth > documentWidth){
            $('.mfp-wrap').css({
                'overflow-y':'scroll'
            });
            // console.log('Есть полоса прокрутки');
        }else {
            // console.log('Нет полосы прокрутки');
        }
        $(this).addClass('active');
        items.each(function(i){
            src[i] = $(this).data('full');
            if ($(this).hasClass('active')){
                index = i;
            }
        });
        
        $('.popup-gallery-image img').attr('src', src[index]);
        
        preload([
             src[index],
             (index < src.length-1) ? src[index+1] : src[0],
             (index > 0) ? src[index-1] : src[src.length-1]
         ]);
    });

    $(document).on('click', '.js-popup-gallery-back', function (e) {
        e.preventDefault();
        $('.popup-gallery-image img').attr('src', '');
        var index = 0;
        var src = [];
        var items = $('.js-gallery-item');
        items.each(function(i){
            src[i] = $(this).data('full');
            if ($(this).hasClass('active')){
                index = i;
                $(this).removeClass('active');
            }
        });
        if (index){
            index = index - 1;
            $(items[index]).addClass('active');
            $('.popup-gallery-image img').attr('src', src[index]);
        } else {
            index = items.length-1;
            $(items[index]).addClass('active');
            $('.popup-gallery-image img').attr('src', src[index]);
        }
        preload([
            src[index],
            (index < src.length-1) ? src[index+1] : src[0],
            (index > 0) ? src[index-1] : src[src.length-1]
        ]);
    });
    $(document).on('click', '.js-popup-gallery-next', function (e) {
        e.preventDefault();
        $('.popup-gallery-image img').attr('src', '');
        var index = 0;
        var src = [];
        var items = $('.js-gallery-item');
        items.each(function(i){
            src[i] = $(this).data('full');
            if ($(this).hasClass('active')){
                index = i;
                $(this).removeClass('active');
            }
        });
        if (index < items.length-1){
            index = index + 1;
            $(items[index]).addClass('active');
            $('.popup-gallery-image img').attr('src', src[index]);
        } else {
            index = 0;
            src = $(items[0]).data('full');
            $(items[index]).addClass('active');
            $('.popup-gallery-image img').attr('src', src[index]);

        }
        preload([
            src[index],
            (index < src.length-1) ? src[index+1] : src[0],
            (index > 0) ? src[index-1] : src[src.length-1]
        ]);
    });

    $(document).on('click', '.js-gallery-back-mobile', function (e) {
        e.preventDefault();
        let width = $('.gallery-layout').width();
        let maxWidth = $('.gallery-wrap').width();
        let left = $('.gallery-layout').scrollLeft();
        if (left < 300){
            left = 0;
        } else {
            left = left - 300;
        }
        $('.gallery-layout').animate({scrollLeft: left}, 400);
    });
    $(document).on('click', '.js-gallery-forward-mobile', function (e) {
        e.preventDefault();
        let width = $('.gallery-layout').width();
        let maxWidth = $('.gallery-wrap').width();
        let left = $('.gallery-layout').scrollLeft();
        if (left > maxWidth - width - 300){
            left = maxWidth - width;
        } else {
            left = left + 300;
        }
        $('.gallery-layout').animate({scrollLeft: left}, 400);
    });
    $(document).on('click', '.js-gallery-img', function (e) {
        e.stopPropagation();
    });
});