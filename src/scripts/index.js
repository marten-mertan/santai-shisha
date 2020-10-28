$(document).ready(function () {
    
    //плавный скролл
    function scrollToAnchor (elem) {
        $(document).on("click", elem, function (event) {
            event.preventDefault();
            var id  = $(this).attr('href'),
                menuHeight = 213,
                top = $(id).offset().top,
                topIndent = top - menuHeight;

            $('html').animate({scrollTop: topIndent}, 1000);
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
              breakpoint: 640,
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
            var top  = $(el).offset().top-240;
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
                if( scroll < (windowHeight)){
                    $('.header.float').removeClass('active');
                } else{
                    $('.header.float').addClass('active');
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
});