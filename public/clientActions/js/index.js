$(document).ready(function () {
    progressively.init();
    const alert = $('body').find('#sweetalert')
    alert.hide()




    // FORM SUBMIT
    $('form').on('submit', e => {
        e.preventDefault();



        console.log(e.target)

        const formData = new FormData(e.target);

        console.log(formData)

        const _csrf = e.target._csrf.value
        const _url = e.target._url.value
        const method = e.target.method.value



        //   $(".btn-add").html("<i class='fa fa-circle-o-notch fa-spin'> </i> loading");

        $.ajax({
            url: _url + "?_csrf=" + _csrf,
            method: method,
            data: formData,
            dataType: "JSON",
            contentType: false,
            cache: false,
            processData: false,
            success: function (res) {
                console.log(res);

                response(res.alert, res.response)

                setTimeout(() => {
                    if (res.alert === 'success')
                        location.replace(res.redirect)
                }, 5000)
            },
            error: function (err) {
                errorDialog(err)
            }
        })
    })


    // LOAD MORE 
    size_li = $(".item").length;
    x = 2;
    $('.item:hidden:lt(' + 6 + ')').slideDown();
    $('#loadMore').click(function () {
        // $('.item:hidden:lt(' + 6 + ')').slideDown();

        // if ($('.item:visible').length == $(".item").length) {
        //     $('#loadMore').fadeOut()
        // }
            
var spin = '<i class="fa fa-spin fa-circle-o"></i>'
var text = 'Load More';
   var html =  $("#loadMore").html()

   if(html == spin){ $("#loadMore").html(text) }else{ $("#loadMore").html(spin)}

   setTimeout(() => {

     $('.item:hidden:lt(' + 6 + ')').slideDown();
     $("#loadMore").html(text)
   }, 3000);

   if ($('.item:visible').length == $(".item").length) {
     $('#loadMore').fadeOut()
   }

    });
    $('#showLess').click(function () {
        $('.item:visible').not(':lt(' + 6 + ')').slideUp();
    });

    // ALERT RESPONSE 
    function response(type, title) {
        alert.slideDown()
        var style;
        (type == 'error' ?
            style = 'alert-danger' :
            type == 'Error' ?
            style = 'alert-danger' :
            style = 'alert-success'
        )
        alert.fadeIn()
        alert.attr('class', style);
        alert.find('strong').text(type + '!')
        alert.find('.response').text(title)

        $('html, body').animate({scrollTop:alert.offset().top},1000)
    }

    function errorDialog(err) {
        (err.status === 0 ? response("Error", "No Connection") :
            err.status === 403 ? response("Error", "Oops! Session timed out, kindly refresh page and try Again") :
            err.status === 401 ?
            response("Error", "Incorrect Password") :
            response("Error", "Oops! Something broke, kindly refresh page and try Again")
        )
    }


    alert.find('.close').on('click', e => {
        alert.fadeOut()
    })
    
});


//SELECT SELECT VALUES FROM DATABASE VALUE
function setVals(gender, section, speciality, visibility) {
    if (gender) {
        $('#gender').val(gender)
        $('#gender').parents('.form-group').find('.select2-selection__rendered').text(gender)
    }
    if (section) {
        $('#section').val(section)
        var sect = $('#section option:selected').text()
        $('#section').parents('.form-group').find('.select2-selection__rendered').text(sect)
    }
    if (speciality) {
        $('#speciality').val(speciality)
        var spec = $('#speciality option:selected').text()
        $('#speciality').parents('.form-group').find('.select2-selection__rendered').text(spec)
    }
    if (visibility) {
        $('#visibility').val(visibility)
        var visible = $('#visibility option:selected').text()
        $('#visibility').parents('.form-group').find('.select2-selection__rendered').text(visible)
    }
}

//SET DISPLAY AS THE UPLOADED IMAGE
 function img() {
     var output = document.getElementById('outputs');
     output.src = URL.createObjectURL(event.target.files[0]);
 }




 //MOBILE MENU DETAILS
   $('.menu-mobile').on('click', e => {
       var container = $('.dashboard-widget')
       if (container.is(':hidden')) {
           container.animate({
               width: 'toggle'
           }, 360)

           container.addClass('mobile-menu-widget')
       }
   })

   $('body').mouseup(e => {
       var container = $('.mobile-menu-widget')
       if (container.is(':visible')) {
           container.animate({
               width: 'toggle'
           }, 360)

           $(window).scrollTop(200)
       }

   })