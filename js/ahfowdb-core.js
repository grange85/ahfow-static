var ahfow = {}

$(document).ready(function() {
   
    $('#main_menu>li').bind('mouseover', ahfow.openMenu);
    $('#main_menu>li').bind('mouseout', ahfow.closeMenu);
//    console.log("begin");
   
  
});

ahfow.openMenu = (function() {
    var menubox = $(this).find('ul');
    menubox.offset({left:$(this).parent.offset}).show();
//    menubox.offset({left:$(this).position});

//    console.log($(this).position());
       
});

ahfow.closeMenu = (function() {
       
    $(this).find('ul').hide();
       
});
