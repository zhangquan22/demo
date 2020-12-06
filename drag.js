$(function() {
    var a = $('.all')
    var $box = $('.box')
    $(document).mousemove(function(e) {
        if(!!this.move) {
            var posix = !document.move_target ? {
                    'x': 0,
                    'y': 0
                } : document.move_target.posix,
                callback = document.call_down || function() {
                    $(this.move_target).css({
                        'top': e.pageY - posix.y,
                        'left': e.pageX - posix.x
                    });
                };

            callback.call(this, e, posix);
        }
    }).mouseup(function(e) {
        if(!!this.move) {
            var callback = document.call_up || function() {};
            callback.call(this, e);
       
            $.extend(this, {
                'move': false,
                'move_target': null,
                'call_down': false,
                'call_up': false
            });
        }
       
    });

 
    $box.mousedown(function(e) {
        var offset = $(this).offset();
   
        this.posix = {
            'x': e.pageX - offset.left +a[0].offsetLeft,
            'y': e.pageY - offset.top+a[0].offsetTop
        };
        $.extend(document, {
            'move': true,
            'move_target': this
        });
        console.log(a[0].offsetLeft, a[0].offsetTop, 1)
        console.log($box[0].offsetLeft, $box[0].offsetTop,2)
        
        
    })
    var ocoor = $('.box').find('.coor');
    ocoor.mousedown(function(e) {
        var posix = {
            'w': $box.width(),
            'h': $box.height(),
            'x': e.pageX,
            'y': e.pageY
        };

        $.extend(document, {
            'move': true,
            'call_down': function(e) {
                console.log(e.pageX,posix.x,posix.w)
                $box.css({
                    'width': Math.max(100, e.pageX - posix.x + posix.w),
                    'height': Math.max(100, e.pageY - posix.y + posix.h)
                });
            }
        });
        return false;
    });

});