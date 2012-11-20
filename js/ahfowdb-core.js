var ahfow = {}


ahfow.artistFormProcess = (function(){
    var temp = new Array("galaxie_500","luna","damon_and_naomi","dean_and_britta");

    for(var i = 0; i<temp.length; i++) {
        
        $("#"+temp[i]+"-tracks").html($("#"+temp[i]+"-trackto option").length + "/5 selected");
        if($("select[name="+temp[i]+"-albumvote] option:checked").attr('value')!= '--select--' ){
            $("#"+temp[i]+"-album").html($("#"+temp[i]+"-albumvote option:checked").html());
        } else {
            $("#"+temp[i]+"-album").html("not selected");
        }
    }    
});


$(document).ready(function() {
    var temp = new Array("galaxie_500","luna","damon_and_naomi","dean_and_britta");
    
    $("#frmSubmit").click(function(e) {
        e.preventDefault();
        for(var i = 0; i<temp.length; i++) {
            console.log(temp[i]);
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

});