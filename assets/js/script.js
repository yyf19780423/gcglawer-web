$(document).ready(function() {
    $('body').scrollspy({ target: '#main-navbar' });
    
    // 导航栏滚动效果
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.navbar-default').addClass('scrolled');
        } else {
            $('.navbar-default').removeClass('scrolled');
        }
    });
    
    // 平滑滚动
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = this.hash;
        const $target = $(target);
        
        // 检查目标元素是否存在
        if ($target.length) {
            $('html, body').stop().animate({
                'scrollTop': $target.offset().top - 70
            }, 50, 'swing');
        }
    });
    
    $('#slider_1').owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        dots: true,
        items: 1,
        autoplay: true,
        autoplayTimeout: 5000,
        animateOut: 'fadeOut'
    });
    
    $('#test-slider').owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        dots: true,
        items: 1,
        autoplay: true,
        autoplayTimeout: 6000,
        animateOut: 'fadeOut'
    });

    // 表单提交
    $('#contactForm').submit(function(e) {
        e.preventDefault();
        
        const postData = $(this).serializeArray();
        const formURL = $(this).attr('action');
        const $cfResponse = $('#contactFormResponse');
        const $cfsubmit = $('#cfsubmit');
        const cfsubmitText = $cfsubmit.text();

        $cfsubmit.text('发送中...');

        $.ajax({
            url: formURL,
            type: 'POST',
            data: postData,
            success: function(data) {
                $cfResponse.html(data);
                $cfsubmit.text(cfsubmitText);
            },
            error: function() {
                alert('提交失败，请重试');
                $cfsubmit.text(cfsubmitText);
            }
        });

        return false;
    });
    
    // 咨询表单提交
    $('#consultation-form').submit(function(e) {
        e.preventDefault();
        
        const $form = $(this);
        const $submitBtn = $('#cnfsubmit');
        const originalText = $submitBtn.text();
        
        $submitBtn.text('提交中...').prop('disabled', true);
        
        // 模拟提交成功
        setTimeout(function() {
            alert('咨询请求已提交，我们将尽快与您联系');
            $form[0].reset();
            $submitBtn.text(originalText).prop('disabled', false);
        }, 1500);
    });
    
    // 元素进入视口时的动画
    const animateElements = $('.fun-box, .choose-box, .practice-box, .team-box, .client-box');
    
    function checkInView() {
        animateElements.each(function() {
            const $element = $(this);
            // 检查元素是否存在
            if ($element.length) {
                const elementTop = $element.offset().top;
                const elementBottom = elementTop + $element.outerHeight();
                const viewportTop = $(window).scrollTop();
                const viewportBottom = viewportTop + $(window).height();
                
                if (elementBottom > viewportTop && elementTop < viewportBottom) {
                    $element.addClass('fade-in');
                }
            }
        });
    }
    
    // 初始检查
    checkInView();
    
    // 滚动时检查
    $(window).scroll(checkInView);
});

/*------------------------------------------
 Subscribe form ajax
 ------------------------------------------*/

$('#subscription-form').submit(function(e) {
    e.preventDefault();
    
    const $form = $('#subscription-form');
    const submit = $('#subscribe-button');
    const ajaxResponse = $('#subscription-response');
    const email = $('#subscriber-email').val();

    $.ajax({
        type: 'POST',
        url: 'php/subscribe.php',
        dataType: 'json',
        data: { email: email },
        cache: false,
        beforeSend: function() {
            submit.html('订阅中...');
        },
        success: function(result) {
            if (result.sendstatus === 1) {
                ajaxResponse.html(result.message);
                $form.fadeOut(500);
            } else {
                ajaxResponse.html(result.message);
                submit.html('<i class="ion-heart"></i> 获取');
            }
        },
        error: function() {
            submit.html('<i class="ion-heart"></i> 获取');
            alert('订阅失败，请重试');
        }
    });
});

// 加载完成后的动画
$(window).on('load', function() {
    $('body').addClass('loaded');
});
