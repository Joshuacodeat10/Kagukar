   // $('.verify').on('click', function (event) {
    $('.verify').off('click').click(function () {
        event.preventDefault();

        /* Act on the event */
        var _csrf = $('#csrf').val();
        var username = $('#username').val();
        var password1 = $('#password1').val();
        var password2 = $('#password2').val();

        var data = {
            username, password1, password2, _csrf
        }

        return ajaxSend(data)
    });



    function ajaxSend(data) {
        $.ajax({
            url: "/dashboard/verify",
            data: data,
            method: "POST",
            contentType: "application/x-www-form-urlencoded",
            dataType: "json",

            success: function (res) {
                Snackbar.show({
                    text: res.response,
                    width: 'auto',
                    pos: 'top-center',
                    actionTextColor: '#bfc9d4',
                    backgroundColor: '#515365'
                });
                if (res.status) {
                    window.location.replace(res.redirect)
                }
            }, error: function (err) {
                Snackbar.show({
                    text: "Oops! Something went wrong, Please try again",
                    width: 'auto',
                    pos: 'top-center',
                    actionTextColor: '#bfc9d4',
                    backgroundColor: '#515365'
                });
                console.log(err)
            }
        })
    }