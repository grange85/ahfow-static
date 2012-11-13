var ahfow = {}


jQuery.fn.filterByText = function(textbox, selectSingleMatch) {
    return this.each(function() {
        var select = this;
        var options = [];
        $(select).find('option').each(function() {
            options.push({
                value: $(this).val(), 
                text: $(this).text()
                });
        });
        $(select).data('options', options);
        $(textbox).bind('change keyup', function() {
            var options = $(select).empty().scrollTop(0).data('options');
            var search = $.trim($(this).val());
            var regex = new RegExp(search,'gi');

            $.each(options, function(i) {
                var option = options[i];
                if(option.text.match(regex) !== null) {
                    $(select).append(
                        $('<option>').text(option.text).val(option.value)
                        );
                }
            });
            if (selectSingleMatch === true && 
                $(select).children().length === 1) {
                $(select).children().get(0).selected = true;
            }
        });
    });
};


ahfow.artistFormProcess = (function(){
    var temp = new Array("galaxie_500","luna","damon_and_naomi","dean_and_britta");

    for(var i = 0; i<temp.length; i++) {
        
        $("#"+temp[i]+"-tracks").html($("#"+temp[i]+"-trackto option").length + "/5 selected");
        if($("#"+temp[i]+"-albumvote option:checked").val()!= '--select--' ){
            $("#"+temp[i]+"-album").html($("#"+temp[i]+"-albumvote option:checked").val());
        } else {
            $("#"+temp[i]+"-album").html("not selected");
        }
    }    
});






$(document).ready(function() {
    
    
    var temp = new Array("galaxie_500","luna","damon_and_naomi","dean_and_britta");
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



    for(var i = 0; i<temp.length; i++) {
        var artist = temp[i];
        $('#'+artist+'-trackfrom').filterByText($('#'+artist+'-trackfilter'));
//        $("#"+artist+"trackfrom option:selected").removeAttr("selected");
//        var filter = $(this).val();
//        $("#"+artist+"-trackfrom option").each(function() {
//            var match = $(this).text().search(new RegExp(filter, "i"));
//            console.log(match);
//            if (match < 0)  {                   
//                $(this).attr('style','display:none');
//            }
//            else
//                $(this).attr("style",'display:block');
//        });
    }

});