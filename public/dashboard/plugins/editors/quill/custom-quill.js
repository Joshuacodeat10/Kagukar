// Basic
$(document).ready(function () {
$("#testDiv").hide()

  const parameters = {
    modules: {
      imageResize: {
        displaySize: false
      },
      toolbar: [
        [{
          'header': [1, 2, 3, 4, 5, 6, false]
        }],
        ['bold', 'italic', 'underline', 'strike'],
        [{
          'list': 'ordered'
        }, {
          'list': 'bullet'
        }],
        ['blockquote'],
        [{
          'script': 'sub'
        }, {
          'script': 'super'
        }], // superscript/subscript
        [{
          'indent': '-1'
        }, {
          'indent': '+1'
        }],
        [{
          'color': []
        }, {
          'background': []
        }],
        [{
          'align': []
        }],
        ['link', 'image'],

        ['clean']
      ]
    },
    theme: 'snow' // or 'bubble'
  }




  // var quill = new Quill('#aboutBio', {
  //   theme: 'snow',
  //   modules: {
  //     // imageResize: {
  //     //   displaySize: true
  //     // },
  //     toolbar: [
  //       [{
  //         'header': [1, 2, 3, 4, 5, 6, false]
  //       }],
  //       ['bold', 'italic', 'underline', 'strike'],
  //       [{
  //         'color': []
  //       }, {
  //         'background': []
  //       }],
  //       [{
  //         'align': []
  //       }],
  //       ['link', 'image'],

  //       ['clean']
  //     ]
  //   }
  // });

  // var quill2 = new Quill('#tou', {
  //   ...parameters,
  //   placeholder: "Terms of Use..."
  // });


  // With Tooltip
  // var quill = new Quill('#aboutBio', {
  //   modules: {
  //     toolbar: '#toolbar-container'
  //   },
  //   placeholder: 'Compose an epic...',
  //   theme: 'snow'
  // });


  var about
  
  if ($("body").find("#aboutBio").length) {
    about = new Quill('#aboutBio', {
      ...parameters,
      placeholder: ' '
    });
  }

  var tnc, privacy
  if ($("body").find("#tnc").length) {

    tnc = new Quill('#tnc', {
      ...parameters,
      placeholder: "Terms and Conditions..."
    });

  }
  if ($("body").find("#privacy").length) {

    privacy = new Quill('#privacy', {
      ...parameters,
      placeholder: "Privacy Policy..."
    });

  }

  // Enable all tooltips
  $('[data-toggle="tooltip"]').tooltip();

  // Can control programmatically too
  $('.ql-italic').mouseover();
  setTimeout(function () {
    $('.ql-italic').mouseout();
  }, 2500);





  // BLOG ACTION FUNCTIONS -----------------------------
  editContent()
  addContent()
  // deleteContent()
  submitForm()
  // htmlAdd()

  function editContent() {
    $('.edit').on('click', function (event) {

      
      var getParent = $(this).parents('.post-item');

      var getModal = $('.modal');

      var $_image = getParent.find('.image');
      var $_title = getParent.find('.title');
      var $_category = getParent.find('.category');
      var $_published = getParent.find('.published');
      var $_article = getParent.find('.article');
      var $_cache = getParent.find('.cache');
      var $_genre = getParent.find('.genre');
      var $_type = getParent.find('.p-type');

      //GET ITEM VALUES
      var $_imageValue = $_image.attr("data-progressive")
      var $_titleValue = $_title.text()
      var $_slugValue = $_title.attr("data-title")
      var $_categoryValue = $_category.attr("data-category")
      var $_publishedValue = $_published.prop('checked');
      var $_articleValue = $_article.attr("data-article")

       var $_cacheValue = $_cache.attr('data-cache');
       var $_genreValue = $_genre.attr('data-genre');
       var $_typeValue = $_type.attr('data-ptype');



      $('.add').trigger('click')

      $(".btn-add").text("Save Changes");
      $(".type").text("Edit ");

      // Get Modal Attributes
      var $_modalMethod = getModal.find('.method').val("PATCH");
      var $_modalImg = getModal.find('.m-image').prop('required', false);
      var $_modalImage = getModal.find('.dropify-render').find('img');
      var $_modalImageName = getModal.find('.dropify-filename-inner');
      var $_modalTitle = getModal.find('.m-title');
      var $_modalSlug = getModal.find('.m-slug');
      var $_modalCategory = getModal.find('.m-category');
      var $_modalCache = getModal.find('.m-cache');
      var $_modalGenre = getModal.find('.m-genre');
      var $_modalType = getModal.find('.m-type');
      var $_modalPublished = getModal.find('.m-published');
      var $_modalArticle = getModal.find('.m-article').find('.ql-editor');

      //SET MODAL FIELD'S VALUE
      var $_setModalId = getModal.find(".m-id").val(getParent.find(".card").attr("data-item"))
      var $_setModalImage = $_modalImage.attr("src", $_imageValue)
      var $_setImageName = $_modalImageName.text($_titleValue)
      var $_setModalTitle = $_modalTitle.val($_titleValue)
      var $_setModalSlug = $_modalSlug.val($_slugValue)
      var $_setModalCategory = $_modalCategory.val($_categoryValue);
      var $_setModalCache = $_modalCache.val($_cacheValue);
      var $_setModalGenre = $_modalGenre.val($_genreValue);
      var $_setModalType = $_modalType.val($_typeValue);
      var $_setModalPublished = $_modalPublished.attr("checked", $_publishedValue)
      var $_setModalPublishedValue = $_modalPublished.val($_publishedValue)
      var $_setModalArticle = $_modalArticle.text(about.clipboard.dangerouslyPasteHTML($_articleValue))

      // $_modalImage.attr("data-default-file", "/dashboard/assets/img/grid-blog-style-3.jpg")
      // $(".btn-edit").off('click').click(function () {
      //   var getModalEdit = $(this).parents('.modal');

      //   var $_titleForm = getModalEdit.find('.m-title').val()

      //   return

      //   $_title.text($_titleForm)

      //   getModal.modal('hide');
      // })
    })
  }



  function addContent() {
    $('.add').on('click', function (event) {
      $(".btn-add").text("Add");
      $(".type").text("Add ");
      var getForm = $('body').find('.blog-form');
      getForm.find('.method').val("POST");
      //GET MODAL ATTRIBUTES
      var $_modalImg = getForm.find('.m-image').prop('required', true);
      var $_modalImage = getForm.find('.dropify-render').find('img');
      var $_modalImageName = getForm.find('.dropify-filename-inner');
      var $_modalPublished = getForm.find('.m-published');
      var $_modalGenre = getForm.find('.m-genre');
      var $_modalCache = getForm.find('.m-cache');
      var $_modalType = getForm.find('.m-type');
      var $_modalArticle = getForm.find('.m-article').find('.ql-editor');

      var $_setModalImage = $_modalImage.attr("src", "/secondary/assets/img/holder.png")
      var $_setImageName = $_modalImageName.text("Select Image")
      var $_setModalPublished = $_modalPublished.attr("checked", false)

      var $_setModalArticle = $_modalArticle.text(about.clipboard.dangerouslyPasteHTML(''))

      getForm.trigger('reset')
    })
  }

  function setContent(phase) {
    const {
      image,
      date,
      title,
      slug,
      _id,
      id,
      category,
      published,
      article,
      articleText,
      method,
      author,
      views,
      commentCount,
      likes, genre, cache, type
    } = phase;

    var publish
    if (published) {
      publish = true
    } else {
      publish = false
    }

    var $_phaseID
    if (method == 'PATCH') {
      $_phaseID = id
    } else {
      $_phaseID = _id
    }

    var $_getParent = $('[data-item=' + $_phaseID + ']')


    if ($_getParent.length === 0) {
      htmlAdd(date, image, title, slug, _id, author, category, published, article,
        articleText, views, likes, commentCount, genre, cache, type)
    }

    // getParent.find(".type").text("Edit Post");
    // var getModal = $('.modal');
    var $_image = $_getParent.find('.image');
    var $_title = $_getParent.find('.title');
    var $_category = $_getParent.find('.category');
    var $_published = $_getParent.find('.published');
    var $_cache = $_getParent.find('.cache');
    var $_genre = $_getParent.find('.genre');
    var $_type = $_getParent.find('.p-type');
    var $_article = $_getParent.find('.article');

    //GET ITEM VALUES
    var $_imageValue = $_image.attr("src", image)
    $_image.attr("data-progressive", image)
    var $_titleValue = $_title.text(title)
    var $_slugValue = $_title.attr("data-title", slug)
    var $_categoryValue = $_category.attr('data-category', category)
    var $_cacheValue = $_cache.attr('data-cache', cache)
    var $_genreValue = $_genre.attr('data-genre', genre)
    var $_typeValue = $_type.attr('data-ptype', type)
    var $_publishedValue = $_published.prop('checked', publish);
    var $_articleValue = $_article.attr("data-article", article)
    var $_articleTextValue = $_article.text(articleText.substring(0, 80) + '...')

    $(".modal").slideToggle();

    setTimeout(() => {
      $(".modal").modal('hide');
    }, 1000);

  }

  // function deleteContent() {
  $('.delete').on('click', function (event) {

    var selected = $(this).parents('.items').find(".dept-id").text();

    let rmv = $(this);
    rmv.parents('.post-item').find(".card").css("background", "#feb6b6")

    var selected = $(this).parents('.post-item').find('.card').attr('data-item')


    $("body").find(".delete-multiple").find('.selected').val(selected)

    deleteContent(rmv)

  })
  // }

  $('.delete-multiple-btn').hide()

  $(".post-checkbox").on('click', () => {
    var checked = $(".post-checkbox:checked")
    if (checked.length > 0) {
      $('.delete-multiple-btn').slideDown()
    } else {
      $('.delete-multiple-btn').fadeOut()
    }
  })

  $(".delete-multiple-btn").on("click", function () {
    var rmv = $(".post-checkbox:checked");

    rmv.parents('.post-item').find(".card").css("background", "#feb6b6")

    var selectedArrays = rmv.parents('.post-item').find('._id').text();

    $("body").find(".delete-multiple").find('.selected').val(selectedArrays)
    deleteContent(rmv)
  });

  function deleteContent(rmv) {
    swal({
        title: 'Are you sure?',
        text: "Action cannot be reversed!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Delete',
        padding: '2em'
      })
      .then(function (x) {
        if (x.value) {
          rmv.parents('.post-item').find(".card").css("background", "#6f0606")
          rmv.parents('.post-item').slideToggle(1000)
          setTimeout(
            () => {
              rmv.parents('.post-item').remove();
            }, 1000
          );
          $("body").find(".delete-multiple").submit();
          
          $('.delete-multiple-btn').fadeOut();
        } else {
          rmv.parents('.post-item').find(".card").css("background", "")
        }
      })
  }


  // BLOG ACTION ENDS -------------------------------


  function submitForm() {
    $('form').on('submit', (e) => {
      e.preventDefault();

      if (about) {
        var aboutText = about.getText();
        var aboutInnerHTML = about.root.innerHTML;
      }
      if (tnc) {
        var tncText = tnc.getText();
        var tncInnerHTML = tnc.root.innerHTML;
      }

      if (privacy) {
        var privacyText = privacy.getText();
        var privacyInnerHTML = privacy.root.innerHTML;
      }

      const method = e.target.method.value


      const formData = new FormData(e.target);

      const _csrf = e.target._csrf.value
      const _url = e.target._url.value

      if (about) {
        const aboutBody = formData.append("about", aboutInnerHTML)
      }
      if (tnc) {
        const tncBody = formData.append("tnc", tncInnerHTML)
      }
      if (privacy) {
        const privacyBody = formData.append("privacy", privacyInnerHTML)
      }

      const id = e.target.id.value
      const phase = e.target.phase;
      const articleText = formData.append("articleText", aboutText)
      const article = formData.append("article", aboutInnerHTML)

      const aboutTextForm = formData.append("aboutText", aboutText)
      const privacyTextForm = formData.append("privacyText", privacyText)
      const tncTextForm = formData.append("tncText", tncText)


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
    articleText, views, likes, commentCount, genre, cache, type) {

      console.log(articleText);
      console.log(article);
      

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
    


    var $_html = '<div class="note-item post-item col-xl-4 col-lg-4 col-md-6 col-sm-6 layout-spacing">' +
      '<div class="card component-card_9" style="margin: 0; width: 100%" data-item="' + id + '">' +
      '<figure class="progressive">' +
      '    <img class="progressive__img image progressive--is-loaded" src="' + image + '" data-progressive="'+image+'">' +
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
      '        </svg> Edit </a>' +
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
       '<p class="genre-dialog btn btn-dark"><span class="card-genre genre" data-genre="'+genre+'">'+genre +'</span> Term</p> '+
      '<h5 class="card-title title" data-title="' + slug + '">' + title + '</h5>' +
        '<h6 class="card-type p-type" data-ptype="'+type+'">'+type+' | <span class="text-warning card-cache cache" data-cache="'+cache+'">'+cache+'</span> </h6>'+
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
// toolbar: [
//   ['bold', 'italic', 'underline', 'strike'], // toggled buttons
//   ['image', 'video', 'blockquote', 'code-block'],

//   [{
//     'header': 1
//   }, {
//     'header': 2
//   }], // custom button values
//   [{
//     'list': 'ordered'
//   }, {
//     'list': 'bullet'
//   }],
//   [{
//     'script': 'sub'
//   }, {
//     'script': 'super'
//   }], // superscript/subscript
//   [{
//     'indent': '-1'
//   }, {
//     'indent': '+1'
//   }], // outdent/indent
//   [{
//     'direction': 'rtl'
//   }], // text direction

//   [{
//     'size': ['small', false, 'large', 'huge']
//   }], // custom dropdown
//   [{
//     'header': [1, 2, 3, 4, 5, 6, false]
//   }],

//   [{
//     'color': []
//   }, {
//     'background': []
//   }], // dropdown with defaults from theme
//   [{
//     'font': []
//   }],
//   [{
//     'align': []
//   }],

//   ['clean'] // remove formatting button
// ]