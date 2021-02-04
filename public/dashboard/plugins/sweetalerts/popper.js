 progressively.init()

 $("form").submit((e) => {
     e.preventDefault()

     var body = {};
     const {
         username: {
             value: user
         },
         password: {
             value: pass
         },

         csrf: {
             value: _csrf
         },
         url: {
             value: _url
         }
     } = e.target;

     if (e.target.id == "signin") {
         body = {
             username: user,
             password: pass
         }
     }
     if (e.target.id == "register") {
         const {
             name: {
                 value: name
             },
             c_password: {
                 value: cPass
             }
         } = e.target;


         if (pass == cPass) {
             body = {
                 name,
                 username: user,
                 password: pass
             }
         } else {
             response("error", "Passwords does not Match")
             return false
         }
     }

     $.ajax({
         url: "/api/" + _url + "?_csrf=" + _csrf,
         data: body,
         method: "POST",
         contentType: "application/x-www-form-urlencoded",
         dataType: "json",
         success: function (res) {
             response(res.alert, res.response)

             if (e.target.id == "signin") {
                 if (res.status) {
                     setTimeout(() => {
                         location.replace(res.redirect)
                     }, 3000)
                 }
             }
         },
         error: function (err) {
             errorDialog(err)
         }
     })

 })