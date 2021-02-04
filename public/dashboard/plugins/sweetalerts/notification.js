 const toast = swal.mixin({
     toast: true,
     position: 'top-end',
     showConfirmButton: false,
     timer: 3000,
     padding: '2em'
 });

console.log("I gt into the Notification")

 function response(type, title) {
     toast({
         type: type,
         title: title,
         padding: '2em',
     })

 }

 function errorDialog(err) {
     console.log("I got here")
     (err.status === 0 ? response("error", "No Connection") :
         err.status === 403 ? response("error", "Oops! Session timed out, kindly refresh page and try Again") :
         err.status === 401 ?
         response("error", "Incorrect Password") :
         response("error", "Oops! Something broke, kindly refresh page and try Again")
     )
 }

 