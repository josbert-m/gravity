(function($) {
    function navbar() {
        var navbarHeight = $('#navbar').innerHeight();

        if ($('html, body').scrollTop() > 700) {
            $('#top').css({ 'padding-top': navbarHeight })

            $('#navbar').css({
                position: 'fixed',
                top: '-150px',
                width: '100%',
                left: '0',
                'z-index': '2000'
            })
            .attr('data-navbar-fixed', 'true');
            setTimeout(function () { 
                $('nav.navbar').css({ top: '0' });
            }, 100);
        }
    }
    function backToTopVisible() {
        
        if($('html, body').scrollTop() >= 500) {
            $('#back-to-top').css({ display: 'block' });
            
            setTimeout(function () { 
                $('#back-to-top').css({ right: '1rem' });
             }, 100);
        } else if($('html, body').scrollTop() < 500) {
            setTimeout(function() {
                $('#back-to-top').css({ 
                    right: '-3.25rem' 
                });
            }, 100);
        }
         
    }

    $(function() {
        if($('#top #navbar').attr('data-navbar-fixed') != 'true'){
            navbar();
        }
        
        backToTopVisible();

        $('#back-to-top').on('click', function () { 
           $('html, body').animate({
               scrollTop: '0'
           }, 1500); 
         })

        $('#body-how-to-use').css({ 'padding-top': $('#navbar').innerHeight() })

        var animations = [
            'upward',
            'downward',
            'ghost',
            'run',
            'left',
            'right',
            'arrow'
        ];
        var i = 0;

        new ClipboardJS('.clipboard > button');

        $('[data-toggle="tooltip"]').tooltip();

        setInterval(function() {

            $('#rocket').css( {'animation-name': animations[i]} );

            i == 4 ? i = 0 : i++;
            
        }, 3000);

        $('#example-start').on('click', function(event) {
            event.preventDefault()
            
            var options = {
                animation: $('#example-animation').val(),
                duration: $('#example-duration').val(),
                delay: $('#example-delay').val()  
            };
            $('.example-item').removeAttr('style');                                
            setTimeout( function(){
                $('.example-item').css({
                    'animation-name': options.animation,
                    'animation-duration' : options.duration + 'ms',
                    'animation-delay': options.delay + 'ms'
            });
            }, 0)
        });
    })

    $(window).on('scroll', function() {
        if($('#navbar').attr('data-navbar-fixed') != 'true'){
            navbar();
        }
        backToTopVisible();
    })
})(jQuery)

