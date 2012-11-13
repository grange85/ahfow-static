var ahfow = {}

ahfow.artistFormProcess = (function(){
    var temp = new Array("galaxie_500","luna","damon_and_naomi","dean_and_britta");

    for(var i = 0; i<temp.length; i++) {
        
        $("#"+temp[i]+"-tracks").html($("#"+temp[i]+"-trackto option").length + "/5 selected");
        if($("#"+temp[i]+"-albumvote option:checked").val()!== '--select--' ){
            $("#"+temp[i]+"-album").html("tick");
        } else {
            $("#"+temp[i]+"-album").html("cross");
        }
    }    
});






$(document).ready(function() {
    
    
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
    });
    
    
    
    $('.trackadd').click(function(){
        var artist = $(this).attr('id').substring(0,$(this).attr('id').indexOf('-'));
        if($('#'+artist+'-trackto option').length>4){
            $('#'+artist+'-messages').html('maximum of five').fadeIn('slow').delay(500).fadeOut('slow');
         
        } else {
            $('#'+artist+'-trackfrom option:selected').each( function() {
                $('#'+artist+'-trackto').append("<option value='"+$(this).val()+"'>"+$(this).text()+"</option>");
                $(this).remove();
                $('#'+artist+'-trackfilter').val('').keyup();
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

    $(".trackfilter").keyup(function() {
        console.log(keyup);
        var artist = $(this).attr('id').substring(0,$(this).attr('id').indexOf('-'));
        $("#"+artist+"trackfrom option:selected").removeAttr("selected");
        var filter = $(this).val();
        //alert(filter);
        $("#"+artist+"-trackfrom option").each(function() {
            var match = $(this).text().search(new RegExp(filter, "i"));
            if (match < 0 && $(this).text() != "--select--")  {                   
                $(this).attr('style','display:none');
            }
            else
                $(this).attr("style",'display:block');
        });
    });

})