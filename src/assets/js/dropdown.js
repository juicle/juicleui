(function($) {
    "use strict";

    var action = "";
    var delay = "delay";
    var toggle = '[id="dropdown"]';

    var Dropdown = function(element) {
        $(element).on('click.bs.dropdown', this.toggle)
    }


    function clearMenus(e) {
        $(toggle).each(function() {
            $(this).next().removeClass("on");
        });
    }

    
    Dropdown.prototype.toggle = function (e) {

        var $this = $(this);

        e.preventDefault();

        var isOn = $this.next().hasClass('on');

        clearMenus();

        if (!isOn) {
            $this.next().addClass("on");
            $(document).on('click', clearMenus);
        }

        return false;
    };

    Dropdown.prototype.delay = function (delay) {
        var delay = delay || 3000
        setTimeout(function(){
            clearMenus();
        },delay);
    }


    $(document).ready(function(){ 
       $(toggle).each(function() {
            action = $(this).attr("action") || "click";
            $(this).on(action,Dropdown.prototype.toggle);
            $(this).closest(".dropdown").on("mouseleave",function(){
                Dropdown.prototype.delay($(this).children("button").attr(delay));
            });
        });
    }); 


})(jQuery);