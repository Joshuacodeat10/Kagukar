$(document).ready(function () {

  checkall('contact-check-all', 'contact-chkbox');

  $('#input-search').on('keyup', function () {
    var rex = new RegExp($(this).val(), 'i');
    $('.searchable-items .items:not(.items-header-section)').hide();
    $('.searchable-items .items:not(.items-header-section)').filter(function () {
      return rex.test($(this).text());
    }).show();
  });

  $('.view-grid').on('click', function (event) {
    event.preventDefault();
    /* Act on the event */

    $(this).parents('.switch').find('.view-list').removeClass('active-view');
    $(this).addClass('active-view');

    $(this).parents('.searchable-container').removeClass('list');
    $(this).parents('.searchable-container').addClass('grid');

    $(this).parents('.searchable-container').find('.searchable-items').removeClass('list');
    $(this).parents('.searchable-container').find('.searchable-items').addClass('grid');

  });

  $('.view-list').on('click', function (event) {
    event.preventDefault();
    /* Act on the event */
    $(this).parents('.switch').find('.view-grid').removeClass('active-view');
    $(this).addClass('active-view');

    $(this).parents('.searchable-container').removeClass('grid');
    $(this).parents('.searchable-container').addClass('list');

    $(this).parents('.searchable-container').find('.searchable-items').removeClass('grid');
    $(this).parents('.searchable-container').find('.searchable-items').addClass('list');
  });

  $('#btn-add-contact').on('click', function (event) {
    $('#addContactModal #btn-add').show();
    $('#addContactModal #btn-edit').hide();
    $('#addContactModal').modal('show');
  })

  function deleteContact() {
    $(".delete").on('click', function (event) {
      event.preventDefault();
      /* Act on the event */
      $(this).parents('.items').remove();
    });
  }

  function addContact() {
    $("#btn-adds").click(function () {

      var getParent = $(this).parents('.modal-content');

      var $_name = getParent.find('#c-name');
      var $_email = getParent.find('#c-email');
      var $_occupation = getParent.find('#c-occupation');
      var $_phone = getParent.find('#c-phone');
      var $_location = getParent.find('#c-location');

      var $_getValidationField = document.getElementsByClassName('validation-text');
      var reg = /^.+@[^\.].*\.[a-z]{2,}$/;
      var phoneReg = /^\d*\.?\d*$/;

      var $_nameValue = $_name.val();
      var $_emailValue = $_email.val();
      var $_occupationValue = $_occupation.val();
      var $_phoneValue = $_phone.val();
      var $_locationValue = $_location.val();

      if ($_nameValue == "") {
        $_getValidationField[0].innerHTML = 'Name must be filled out';
        $_getValidationField[0].style.display = 'block';
      } else {
        $_getValidationField[0].style.display = 'none';
      }

      if ($_emailValue == "") {
        $_getValidationField[1].innerHTML = 'Email Id must be filled out';
        $_getValidationField[1].style.display = 'block';
      } else if ((reg.test($_emailValue) == false)) {
        $_getValidationField[1].innerHTML = 'Invalid Email';
        $_getValidationField[1].style.display = 'block';
      } else {
        $_getValidationField[1].style.display = 'none';
      }

      if ($_phoneValue == "") {
        $_getValidationField[2].innerHTML = 'Invalid (Enter 10 Digits)';
        $_getValidationField[2].style.display = 'block';
      } else if ((phoneReg.test($_phoneValue) == false)) {
        $_getValidationField[2].innerHTML = 'Please Enter A numeric value';
        $_getValidationField[2].style.display = 'block';
      } else {
        $_getValidationField[2].style.display = 'none';
      }

      if ($_nameValue == "" || $_emailValue == "" || (reg.test($_emailValue) == false) || $_phoneValue == "" || (phoneReg.test($_phoneValue) == false)) {
        return false;
      }

      $html = '<div class="items">' +
        '<div class="item-content">' +
        '<div class="user-profile">' +

        '<div class="n-chk align-self-center text-center">' +
        '<label class="new-control new-checkbox checkbox-primary">' +
        '<input type="checkbox" class="new-control-input contact-chkbox">' +
        '<span class="new-control-indicator"></span>' +
        '</label>' +
        '</div>' +

        '<img src="assets/img/90x90.jpg">' +
        '<div class="user-meta-info">' +
        '<p class="user-name" data-name=' + $_nameValue + '>' + $_nameValue + '</p>' +
        '<p class="user-work" data-occupation=' + $_occupationValue + '>' + $_occupationValue + '</p>' +
        '</div>' +
        '</div>' +
        '<div class="user-email">' +
        '<p class="info-title">Email: </p>' +
        '<p class="usr-email-addr" data-email=' + $_emailValue + '>' + $_emailValue + '</p>' +
        '</div>' +
        '<div class="user-location">' +
        '<p class="info-title">Location: </p>' +
        '<p class="usr-location" data-location=' + $_locationValue + '>' + $_locationValue + '</p>' +
        '</div>' +
        '<div class="user-phone">' +
        '<p class="info-title">Phone: </p>' +
        '<p class="usr-ph-no" data-phone=' + $_phoneValue + '>' + $_phoneValue + '</p>' +
        '</div>' +
        '<div class="action-btn">' +
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2 edit"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>' +
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user-minus delete"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="23" y1="11" x2="17" y2="11"></line></svg>'
      '</div>' +
      '</div>' +
      '</div>';

      $(".searchable-items > .items-header-section").after($html);
      $('#addContactModal').modal('hide');

      var $_setNameValueEmpty = $_name.val('');
      var $_setEmailValueEmpty = $_email.val('');
      var $_setOccupationValueEmpty = $_occupation.val('');
      var $_setPhoneValueEmpty = $_phone.val('');
      var $_setLocationValueEmpty = $_location.val('');

      // deleteContact();
      // editContact();
      // checkall('contact-check-all', 'contact-chkbox');
    });
  }

  $('#addContactModal').on('hidden.bs.modal', function (e) {
    var $_name = document.getElementById('c-name');
    var $_email = document.getElementById('c-email');
    var $_occupation = document.getElementById('c-occupation');
    var $_phone = document.getElementById('c-phone');
    var $_location = document.getElementById('c-location');
    var $_getValidationField = document.getElementsByClassName('validation-text');

    var $_setNameValueEmpty = $_name.value = '';
    var $_setEmailValueEmpty = $_email.value = '';
    var $_setOccupationValueEmpty = $_occupation.value = '';
    var $_setPhoneValueEmpty = $_phone.value = '';
    var $_setLocationValueEmpty = $_location.value = '';

    for (var i = 0; i < $_getValidationField.length; i++) {
      e.preventDefault();
      $_getValidationField[i].style.display = 'none';
    }
  })

  function editContact() {
    $('.edit').on('click', function (event) {

      $('#addContactModal #btn-add').hide();
      $('#addContactModal #btn-edit').show();

      // Get Parents
      var getParentItem = $(this).parents('.items');
      var getModal = $('#addContactModal');

      // Get List Item Fields
      var $_name = getParentItem.find('.user-name');
      var $_email = getParentItem.find('.usr-email-addr');
      var $_occupation = getParentItem.find('.user-work');
      var $_phone = getParentItem.find('.usr-ph-no');
      var $_location = getParentItem.find('.usr-location');

      // Get Attributes
      var $_nameAttrValue = $_name.attr('data-name');
      var $_emailAttrValue = $_email.attr('data-email');
      var $_occupationAttrValue = $_occupation.attr('data-occupation');
      var $_phoneAttrValue = $_phone.attr('data-phone');
      var $_locationAttrValue = $_location.attr('data-location');

      // Get Modal Attributes
      var $_getModalNameInput = getModal.find('#c-name');
      var $_getModalEmailInput = getModal.find('#c-email');
      var $_getModalOccupationInput = getModal.find('#c-occupation');
      var $_getModalPhoneInput = getModal.find('#c-phone');
      var $_getModalLocationInput = getModal.find('#c-location');

      // Set Modal Field's Value
      var $_setModalNameValue = $_getModalNameInput.val($_nameAttrValue);
      var $_setModalEmailValue = $_getModalEmailInput.val($_emailAttrValue);
      var $_setModalOccupationValue = $_getModalOccupationInput.val($_occupationAttrValue);
      var $_setModalPhoneValue = $_getModalPhoneInput.val($_phoneAttrValue);
      var $_setModalLocationValue = $_getModalLocationInput.val($_locationAttrValue);

      $('#addContactModal').modal('show');

      $("#btn-edit").off('click').click(function () {

        var getParent = $(this).parents('.modal-content');

        var $_getInputName = getParent.find('#c-name');
        var $_getInputNmail = getParent.find('#c-email');
        var $_getInputNccupation = getParent.find('#c-occupation');
        var $_getInputNhone = getParent.find('#c-phone');
        var $_getInputNocation = getParent.find('#c-location');


        var $_nameValue = $_getInputName.val();
        var $_emailValue = $_getInputNmail.val();
        var $_occupationValue = $_getInputNccupation.val();
        var $_phoneValue = $_getInputNhone.val();
        var $_locationValue = $_getInputNocation.val();

        var setUpdatedNameValue = $_name.text($_nameValue);
        var setUpdatedEmailValue = $_email.text($_emailValue);
        var setUpdatedOccupationValue = $_occupation.text($_occupationValue);
        var setUpdatedPhoneValue = $_phone.text($_phoneValue);
        var setUpdatedLocationValue = $_location.text($_locationValue);

        var setUpdatedAttrNameValue = $_name.attr('data-name', $_nameValue);
        var setUpdatedAttrEmailValue = $_email.attr('data-email', $_emailValue);
        var setUpdatedAttrOccupationValue = $_occupation.attr('data-occupation', $_occupationValue);
        var setUpdatedAttrPhoneValue = $_phone.attr('data-phone', $_phoneValue);
        var setUpdatedAttrLocationValue = $_location.attr('data-location', $_locationValue);
        $('#addContactModal').modal('hide');
      });
    })
  }

  $(".delete-multiple").on("click", function () {
    var inboxCheckboxParents = $(".contact-chkbox:checked").parents('.items');
    inboxCheckboxParents.remove();
  });

  deleteContact();
  addContact();
  editContact();


  // Validation Process

  var $_getValidationField = document.getElementsByClassName('validation-text');
  var reg = /^.+@[^\.].*\.[a-z]{2,}$/;
  var phoneReg = /^\d{10}$/;

  getNameInput = document.getElementById('c-name');

  getNameInput.addEventListener('input', function () {

    getNameInputValue = this.value;

    if (getNameInputValue == "") {
      $_getValidationField[0].innerHTML = 'Name Required';
      $_getValidationField[0].style.display = 'block';
    } else {
      $_getValidationField[0].style.display = 'none';
    }

  })


  getEmailInput = document.getElementById('c-email');

  getEmailInput.addEventListener('input', function () {

    getEmailInputValue = this.value;

    if (getEmailInputValue == "") {
      $_getValidationField[1].innerHTML = 'Email Required';
      $_getValidationField[1].style.display = 'block';
    } else if ((reg.test(getEmailInputValue) == false)) {
      $_getValidationField[1].innerHTML = 'Invalid Email';
      $_getValidationField[1].style.display = 'block';
    } else {
      $_getValidationField[1].style.display = 'none';
    }

  })

  getPhoneInput = document.getElementById('c-phone');

  getPhoneInput.addEventListener('input', function () {

    getPhoneInputValue = this.value;

    if (getPhoneInputValue == "") {
      $_getValidationField[2].innerHTML = 'Phone Number Required';
      $_getValidationField[2].style.display = 'block';
    } else if ((phoneReg.test(getPhoneInputValue) == false)) {
      $_getValidationField[2].innerHTML = 'Invalid (Enter 10 Digits)';
      $_getValidationField[2].style.display = 'block';
    } else {
      $_getValidationField[2].style.display = 'none';
    }
  })

    submitForm()


    function submitForm() {
      $('form').on('submit', (e) => {
        e.preventDefault();

        console.log(e.target)
  
        const method = e.target.method.value;
        const formData = new FormData(e.target);

        const _csrf = e.target._csrf.value
        const _url = e.target._url.value


        const id = e.target.id.value
        const phase = e.target.phase;


        $(".btn-add").html("<i class='fa fa-circle-o-notch fa-spin'> </i> loading");

        $.ajax({
          url: "/" + _url + "?_csrf=" + _csrf,
          method: method,
          data: formData,
          dataType: "JSON",
          contentType: false,
          cache: false,
          processData: false,
          success: function (res) {
            response(res.alert, res.response)

            if (phase.value == "blog") {
              if (res.status) {
                setTimeout(() => {
                  setContent(res.data)
                  // location.replace(res.redirect)
                }, 3000)
              }
            }
          },
          error: function (err) {
            errorDialog(err)
          }
        })


      })

    }









    function htmlAdd(date, image, title, slug, id,
      author, category, published, article,
      articleText, views, likes, commentCount) {

      var check, pub, alert;
      if (published) {
        check = 'checked'
        pub = 'Published'
        alert = 'success'
      } else {
        check = ''
        pub = 'Not Published'
        alert = 'warning'
      }


      var $_html = '<div class="post-item col-xl-4 col-lg-4 col-md-6 col-sm-6 layout-spacing">' +
        '<div class="card component-card_9" style="margin: 0; width: 100%" data-item="' + id + '">' +
        '<figure class="progressive">' +
        '    <img class="progressive__img image progressive--is-loaded" src="' + image + '" data-progressive="/uploads/5.jpg">' +
        '</figure>' +
        '<div class="card-body">' +
        '    <div class="row">' +
        '        <div class="col-8">' +
        '<div class="n-chk">' +
        '               <label class="new-control new-checkbox checkbox-outline-default meta-date date"' +
        '                   style="font-weight: 100; font-size: 14px;">' +
        '                   <input type="checkbox" class="new-control-input">' +
        '                   <span class="new-control-indicator"></span>' + date +
        '               </label>' +
        '           </div>' +
        '        </div>' +
        '        <div data-container="body" data-placement="top" data-html="true" title="' + pub + '" data-original-title="' + pub + '" class="col-2 ' + alert + ' mb-2 rounded edit" >' +
        '            <span style=" pointer-events: none;">' +
        '                <label style="width: 37px; height: 10px;" class="switch s-icons s-outline  s-outline-success  mb-4 mr-2">' +
        '<i>.</i>' +
        '<input id="published" class="m-published" type="checkbox" name="published" onchange="(this.value = this.checked);" ' + check + '>' +
        '<span class="slider round"></span>' +
        '</label>' +
        '</span>' +
        '</div>' +
        '<div class="col-2">' +
        '<div class="dropdown dropup custom-dropdown-icon">' +
        '<a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink-3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
        '    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical">' +
        '        <circle cx="12" cy="12" r="1"></circle>' +
        '        <circle cx="12" cy="5" r="1"></circle>' +
        '        <circle cx="12" cy="19" r="1"></circle>' +
        '    </svg>' +
        '</a>' +
        '<div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink-3" style="will-change: transform;">' +
        '    <a class="dropdown-item edit" href="javascript:void(0);" data-toggle="modal" data-target=".bd-example-modal-xl"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit">' +
        '            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>' +
        '            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>' +
        '        </svg> Edit Post</a>' +
        '    <a class="dropdown-item delete" href="javascript:void(0);"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2">' +
        '            <polyline points="3 6 5 6 21 6"></polyline>' +
        '            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>' +
        '            <line x1="10" y1="11" x2="10" y2="17"></line>' +
        '            <line x1="14" y1="11" x2="14" y2="17"></line>' +
        '        </svg> ' +
        '        Delete Post' +
        '      </a>' +
        '</div>' +
        '</div>' +
        '</div> </div>' +
        '<h5 class="card-title title" data-title="' + slug + '">' + title + '</h5>' +
        '<p class="card-text article" data-article="' + article + '">' + articleText.substring(0, 80) +
        '...             </p>' +
        '              <div class="meta-info">' +
        '                  <div class="meta-user">' +
        '                      <div class="avatar avatar-sm">' +
        '                          <span class="avatar-title rounded-circle">' +
        '    OV ' +
        '                          </span>' +
        '                      </div>' +
        '                      <div class="user-name category" data-category="' + category + '">' +
        '                         <span class="author">' +
        '                             ' + author + '</span>' +
        ' </div> </div>' +
        '<div class="meta-action">' +
        '    <div class="meta-likes">' +
        '        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart">' +
        '            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z">' +
        '            </path>' +
        '        </svg> ' + likes +
        '    </div>' +

        '    <div class="meta-likes">' +
        '        <svg style="-webkit-transform: scaleX(-1);transform: scaleX(-1);" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-square">' +
        '            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z">' +
        '            </path>' +
        '        </svg> ' + commentCount +
        '    </div>' +

        '    <div class="meta-view">' +
        '        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye">' +
        '            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>' +
        '            <circle cx="12" cy="12" r="3"></circle>' +
        '        </svg> ' + views +
        '    </div>' +
        '</div>' +

        '</div> </div> </div> </div>'

      $("div > .blog-posts").prepend($_html)
    }



})