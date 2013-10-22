var ahfow = {}


ahfow.artistFormProcess = (function(){
    var temp = new Array("galaxie_500","luna","damon_and_naomi","dean_and_britta");

    for(var i = 0; i<temp.length; i++) {
        
        $("#"+temp[i]+"-tracks").html($("#"+temp[i]+"-trackto option").length + "/5 tracks selected");
        if($("select[name="+temp[i]+"-albumvote] option:selected").attr('value')!= '--select--' ){
            $("#"+temp[i]+"-album").html($("#"+temp[i]+"-albumvote option:selected").html());
        } else {
            $("#"+temp[i]+"-album").html("not selected");
        }
    }    
});


$(document).ready(function() {
    var temp = new Array("galaxie_500","luna","damon_and_naomi","dean_and_britta");
    
    
if ($.prettyPhoto) {
    $("a[rel^='prettyPhoto']").prettyPhoto({
        social_tools: ' <div class="pp_social">\n\
                            <div class="twitter">\n\
                                <a href="http://twitter.com/share" class="twitter-share-button" data-count="none">Tweet</a>\n\
                                <script type="text/javascript" src="http://platform.twitter.com/widgets.js">\n\
                                </script>\n\
                            </div>\n\
                            <div class="facebook">\n\
                                <iframe src="http://www.facebook.com/plugins/like.php?locale=en_US&href='+location.href+'&amp;layout=button_count&amp;show_faces=true&amp;width=500&amp;action=like&amp;font&amp;colorscheme=light&amp;height=23" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:500px; height:23px;" allowTransparency="true">\n\
                                </iframe>\n\
                            </div>\n\
                        </div>' /* html or false to disable */
    });
}
    
    $("#frmSubmit").click(function(e) {
        e.preventDefault();
        for(var i = 0; i<temp.length; i++) {
            //            console.log(temp[i]);
            var selected = $("select#"+temp[i]+"-trackto option").map(function(){
                return $(this).val();
            }).get().join(',');
            
            //            console.log('here = '+selected);
            $("form#surveyform").prepend("<input type='hidden' name='frm-"+temp[i]+"-tracks' value='"+selected+"' />");
        }
        $('form#surveyform').submit();
    });
    
    activeItem = $(".section:first");
    $(activeItem).addClass('active');
 
    $(".section").click(function(){
        $(activeItem).animate({
            width: "0px"
        }, {
            duration:300, 
            queue:false
        });
        $(this).animate({
            width: "660px"
        }, {
            duration:300, 
            queue:false
        });
        activeItem = this;
        ahfow.artistFormProcess();

        $(".section input").attr("tabindex", "-1");
        $(".section select").attr("tabindex", "-1");
        $(".section textarea").attr("tabindex", "-1");
        $(".section a").attr("tabindex", "-1");
        
        $(this).find("input").attr("tabindex", "1");
        $(this).find("select").attr("tabindex", "1");
        $(this).find("textarea").attr("tabindex", "1");
        $(this).find("a").attr("tabindex", "1");
    });



   
    $('.trackadd').click(function(){
        var artist = $(this).attr('id').substring(0,$(this).attr('id').indexOf('-'));
        if($('#'+artist+'-trackto option').length>4){
            $('#'+artist+'-messages').html('maximum of five').fadeIn('slow').delay(500).fadeOut('slow');
         
        } else {
            $('#'+artist+'-trackfrom option:selected').each( function() {
                $('#'+artist+'-trackto').append("<option value='"+$(this).val()+"'>"+$(this).text()+"</option>");
                $(this).remove();
            //                $('#'+artist+'-trackfilter').val('').keyup();
            });
        }
        ahfow.artistFormProcess();
    });
    
    $('.trackremove').click(function(){
        var artist = $(this).attr('id').substring(0,$(this).attr('id').indexOf('-'));
        $('#'+artist+'-trackto option:selected').each( function() {
            $('#'+artist+'-trackfrom').append("<option value='"+$(this).val()+"'>"+$(this).text()+"</option>");
            $(this).remove();
        });
    });











    $('ul.tabs').each(function(){
        var $active, $content, $links = $(this).find('a');

        // If the location.hash matches one of the links, use that as the active tab.
        // If no match is found, use the first link as the initial active tab.
        $active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
        $active.addClass('active');
        $content = $($active.attr('href'));

        // Hide the remaining content
        $links.not($active).each(function () {
            $($(this).attr('href')).hide();
        });

        // Bind the click event handler
        $(this).on('click', 'a', function(e){
            e.preventDefault();
            
            // Make the old tab inactive.
            if ($(this).attr('class')!='active') {
                $active.removeClass('active');
                $content.hide();

                // Update the variables with the new link and content
                $active = $(this);
                $content = $($(this).attr('href'));

                // Make the tab active.
                $active.addClass('active');
                $content.show();
            }
        });
    });





});