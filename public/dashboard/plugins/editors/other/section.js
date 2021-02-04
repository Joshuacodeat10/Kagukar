// Basic
$(document).ready(function () {

    const parameters = {
        modules: {

            toolbar: [
                [{
                    'header': [4, 5, 6, false]
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
                ['link'],

                ['clean']
            ]
        },
        theme: 'snow' // or 'bubble'
    }


    const about = new Quill('#about', {
        ...parameters,
        placeholder: ' '
    });


    // Enable all tooltips
    $('[data-toggle="tooltip"]').tooltip();

    // Can control programmatically too
    $('.ql-italic').mouseover();
    setTimeout(function () {
        $('.ql-italic').mouseout();
    }, 2500);



  // Search on each key pressed
  $('.search-hod').on('keyup', function () {
      var rex = new RegExp($(this).val(), 'i');
      $('.hod-list').hide();
      $('.hod-list').filter(function () {
          return rex.test($(this).text());
      }).fadeIn();
  });

    // BLOG ACTION FUNCTIONS -----------------------------
    editContent()
    addContent()
    // deleteContent()
    submitForm()
    // htmlAdd()


    $("#service-hours").hide()


    $(".service-hours").on("click", () => {
        $("#service-hours").slideToggle()
        $(".service-hours i").toggleClass("fa-chevron-up")
    })



    $('.hod-btn').on('click', (e) => {
        const tag = $(e.target).parents('.department-item')
        
        const dept = tag.attr('data-dept')

        const title = "Appoint Head of Department"
        $(".view-hod").hide()
        $(".appoint-hod").show()
        $('.hod-form').find('.dept').val(dept)

        $('.hod-title').text(title)

    })

    $('.hod-btn-active').on('click', (e) => {
        $(".view-hod").show()
        $(".appoint-hod").hide()

        const hod = $(e.target)


          const title = "HOD : " + hod.parents('.department-item').find('.name').attr('data-name') + " Department"
          const verified = hod.parents('.department-item').find('.verified').attr('data-verified')
       
          $('.hod-title').text(title)
          $('.hod-verified').val(verified)


        var image 
        if(image){
        image = hod.attr('data-hod-image')
        }else{
        image = '/uploads/profile.png'
        }

        const name = hod.attr('data-hod-name')
        const spec = hod.attr('data-hod-speciality')
        const about = hod.attr('data-hod-about')
        $('.hod-image').attr({
            'alt': name,
            'src': image})
        $('.hod-name-active').text(name)
        $('.hod-spec').text(spec)
        $('.hod-about').text(about)

        const dept = $(e.target).parents('.department-item').attr('data-dept')
        $('.hod-form').find('.dept').val(dept)
    })

    $('.hod-toggle').on('click', (e) => {
        $(".view-hod").slideToggle()
        $(".appoint-hod").slideToggle()

        const title = "Appoint Head of Department"

        $('.hod-title').text(title)

    })

    $('.save-hod').on('click', (e) => {
        const hod = $(e.target).parents('.hod-list').attr('data-id')
        $(".hod-form").find("._url").val("dashboard/section")
        $(".hod-form").find(".method").val("PATCH")
        $(".hod-form").find(".selected").val(" ")
        swal({
                title: 'Are you sure?',
                text: "Set !",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Confirm',
                padding: '2em'
            })
            .then(function (x) {
                if (x.value) {
                    $('.hod-form').find('.dept-hod').val(hod)
                    setTimeout(() => {
                        $('.hod-form').submit()
                    }, 1000);
                } else {
                    swal({
                        // title: ' ',
                        text: "Action Cancelled",
                        type: 'success',
                        showCancelButton: false,
                        // confirmButtonText: 'Delete',
                        padding: '2em'
                    })
                }
            })
    })


    $('.view').off('click').click(function (e) {
        const frame = $('#viewSection')
         const slug = $(e.target).parents('.department-item').find('.name').attr('data-name')
        frame.modal('show');
        // const src = $(this).parents(".department-item").find(".name").attr("data-slug")
        const src = "/page/section/department/"+slug;

        frame.find('iframe').attr({
            'src': src,
            'width': '100%',
            'height': '500',
            'allow': 'encrypted-media'
        }).css('border', '0')

        setTimeout(() => {
            const action = frame.find('iframe').contents().find("body")
            action.find("#mobile_btn").remove()
            var a = action.find("a");
            var f = action.find("form");
            a.on('click', (e) => {
                e.preventDefault();
            })
            f.on('submit', (e) => {
                e.preventDefault()
            })

        }, 1000);

    });


    function editContent() {
        $('.edit').on('click', function (event) {


            $(".type").text("Edit Post");
            var getParent = $(this).parents('.department-item');
            var getModal = $('.modal');
            var $_image = getParent.find('.image');
            var $_name = getParent.find('.name');
            var $_code = getParent.find('.code');
            var $_email = getParent.find('.email');
            var $_mobile = getParent.find('.mobile');
            var $_published = getParent.find('.verified');
            var $_serviceHours = getParent.find(".service-hours")

            var $_category = getParent.find('.category');
            var $_about = getParent.find('.about');

            //GET ITEM VALUES
            var $_imageValue = $_image.attr("data-progressive")
            var $_nameValue = $_name.text()
            var $_slugValue = $_name.attr("data-name")
            var $_codeValue = $_code.text();
            var $_mapValue = $_code.attr("data-map");
            var $_emailValue = $_email.text();
            var $_mobileValue = $_mobile.text();
            var $_publishedValue = $_published.attr('data-verified');
            var $_monValue = $_serviceHours.attr('data-mon');
            var $_tueValue = $_serviceHours.attr('data-tue');
            var $_wedValue = $_serviceHours.attr('data-wed');
            var $_thuValue = $_serviceHours.attr('data-thu');
            var $_friValue = $_serviceHours.attr('data-fri');
            var $_satValue = $_serviceHours.attr('data-sat');
            var $_sunValue = $_serviceHours.attr('data-sun');


            var $_categoryValue = $_category.attr("data-category")
            var $_aboutValue = $_about.attr("data-about")


            $('.add').trigger('click')

            $(".btn-add").text("Save Changes");
            // Get Modal Attributes
            var $_modalMethod = getModal.find('.method').val("PATCH");

            var $_modalImg = getModal.find('.m-image').prop('required', false);
            var $_modalImage = getModal.find('.dropify-render').find('img');
            var $_modalImageName = getModal.find('.dropify-filename-inner');
            var $_modalName = getModal.find('.m-name');
            var $_modalSlug = getModal.find('.m-slug');
            var $_modalCode = getModal.find('.m-code');
            var $_modalMap = getModal.find('.m-map');
            var $_modalEmail = getModal.find('.m-email');
            var $_modalMobile = getModal.find('.m-mobile');

            var $_modalMon = getModal.find('.m-mon');
            var $_modalTue = getModal.find('.m-tue');
            var $_modalWed = getModal.find('.m-wed');
            var $_modalThu = getModal.find('.m-thu');
            var $_modalFri = getModal.find('.m-fri');
            var $_modalSat = getModal.find('.m-sat');
            var $_modalSun = getModal.find('.m-sun');

            var $_modalCategory = getModal.find('.m-category');
            var $_modalPublished = getModal.find('.m-verified');
            var $_modalAbout = getModal.find('.m-about').find('.ql-editor');

            //SET MODAL FIELD'S VALUE
            var $_setModalId = getModal.find(".m-id").val(getParent.attr("data-dept"))
            var $_setModalImage = $_modalImage.attr("src", $_imageValue)
            var $_setImageName = $_modalImageName.text($_nameValue)
            var $_setModalTitle = $_modalName.val($_nameValue)
            var $_setModalSlug = $_modalSlug.val($_slugValue)
            var $_setModalCode = $_modalCode.val($_codeValue)
            var $_setModalMap = $_modalMap.val($_mapValue)
            var $_setModalEmail = $_modalEmail.val($_emailValue)
            var $_setModalMobile = $_modalMobile.val($_mobileValue)

            var $_setModalMon = $_modalMon.val($_monValue)
            var $_setModalTue = $_modalTue.val($_tueValue)
            var $_setModalWed = $_modalWed.val($_wedValue)
            var $_setModalThu = $_modalThu.val($_thuValue)
            var $_setModalFri = $_modalFri.val($_friValue)
            var $_setModalSat = $_modalSat.val($_satValue)
            var $_setModalSun = $_modalSun.val($_sunValue)


            var $_setModalCategory = $_modalCategory.val($_categoryValue)
            var $_setModalPublished = $_modalPublished.val($_publishedValue)
            // var $_setModalPublishedValue = $_modalPublished.val($_publishedValue)
            var $_setModalAbout = $_modalAbout.text(about.clipboard.dangerouslyPasteHTML($_aboutValue))

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
            $(".type").text("Add Post");
            var getForm = $('body').find('.section-form');
            getForm.find('.method').val("POST");
            //GET MODAL ATTRIBUTES
            var $_modalImg = getForm.find('.m-image').prop('required', true);
            var $_modalImage = getForm.find('.dropify-render').find('img');
            var $_modalImageName = getForm.find('.dropify-filename-inner');
            var $_modalPublished = getForm.find('.m-published');
            var $_modalArticle = getForm.find('.m-article').find('.ql-editor');

            var $_setModalImage = $_modalImage.attr("src", "/uploads/cover-image.jpg")
            var $_setImageName = $_modalImageName.text("Select Image")
            var $_setModalPublished = $_modalPublished.attr("checked", false)

            var $_setModalArticle = $_modalArticle.text(about.clipboard.dangerouslyPasteHTML(''))

            getForm.trigger('reset')
        })
    }

    function setContent(phase) {
        console.log(phase)
        const {
            _id,
            id,
            method,
            date,
            image,
            name,
            slug,
            email,
            mobile,
            verified,
            mon,
            tue,
            wed,
            thu,
            fri,
            sat,
            sun,
            about,
            map,
            code,
        } = phase;

        var publish
        console.log(_id + " " + id + " " + method)
        // if (published) {
        //     publish = true
        // } else {
        //     publish = false
        // }

        var $_phaseID
        if (method == 'PATCH') {
            $_phaseID = id
        } else {
            $_phaseID = _id
        }

        var $_getParent = $('[data-dept=' + $_phaseID + ']')

        console.log($_getParent)


        if ($_getParent.length === 0) {
            htmlAdd(date, image, name, slug, $_phaseID,
                email, mobile, verified, mon, tue, wed, thu, fri, sat, sun,
                about, map, code)
        }

        // getParent.find(".type").text("Edit Post");
        // var getModal = $('.modal');
        // var $_image = $_getParent.find('.image');
        // var $_title = $_getParent.find('.title');
        // var $_category = $_getParent.find('.category');
        // var $_published = $_getParent.find('.published');
        // var $_article = $_getParent.find('.article');

        // //GET ITEM VALUES
        // var $_imageValue = $_image.attr("src", image)
        // $_image.attr("data-progressive", image)
        // var $_titleValue = $_title.text(title)
        // var $_slugValue = $_title.attr("data-title", slug)
        // var $_categoryValue = $_category.attr('data-category', category)
        // var $_publishedValue = $_published.prop('checked', publish);
        // var $_articleValue = $_article.attr("data-article", article)
        // var $_articleTextValue = $_article.text(articleText.substring(0, 80) + '...')

        $("#addSection").slideToggle();

        setTimeout(() => {
            $("#addSection").modal('hide');
        }, 1000);

    }

    // function deleteContent() {
    $('.delete').on('click', function (event) {

        var selected = $(this).parents('.department-item').find("._id").text();

        let rmv = $(this);
        rmv.parents(".department-item").find("td").css({
            "background": "#feb6b6",
            "border-radius": "0px"
        })

        console.log(selected)

        $(".hod-form").find("._url").val("dashboard/section/delete")
        $(".hod-form").find(".method").val("POST")
        $(".hod-form").find('.selected').val(selected)
        deleteContent(rmv)

    })
    // }

    $('.delete-multiple-btn').hide()

    $(".dept-checkbox").on('click', () => {
        var checked = $(".dept-checkbox:checked")
        if (checked.length > 0) {
            $('.delete-multiple-btn').slideDown()
        } else {
            $('.delete-multiple-btn').fadeOut()
        }
    })

    $(".delete-multiple-btn").on("click", function () {
        var rmv = $(".dept-checkbox:checked");

        rmv.parents(".department-item").find("td").css({
            "background": "#feb6b6",
            "border-radius": "0px"
        })

        var selectedArrays = rmv.parents('.department-item').find('._id').text();

        $(".hod-form").find("._url").val("dashboard/section/delete")
        $(".hod-form").find(".method").val("POST")
        $(".hod-form").find('.selected').val(selectedArrays)
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
                    rmv.parents('.department-item').find("td").css("background", "#6f0606")
                    rmv.parents('.department-item').fadeOut(1000)
                    setTimeout(
                        () => {
                            rmv.parents('.department-item').remove();
                            $(".hod-form").submit()
                        }, 2000
                    );
                    $('.delete-multiple-btn').fadeOut()
                } else {
                    rmv.parents('.department-item').find("td").css("background", "")
                }
            })
    }


    // BLOG ACTION ENDS -------------------------------
    function submitForm() {
        $('form').on('submit', (e) => {
            e.preventDefault();


            var aboutText = about.getText();
            var aboutInnerHTML = about.root.innerHTML;



            const method = e.target.method.value


            const formData = new FormData(e.target);

            const _csrf = e.target._csrf.value
            const _url = e.target._url.value
            const aboutBody = formData.append("about", aboutInnerHTML)

            const id = e.target.id.value
            const phase = e.target.phase;

            const aboutTextForm = formData.append("aboutText", aboutText)



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

                    setTimeout(() => {
                        // setContent(res.data)
                        location.reload()
                    }, 3000)
                },
                error: function (err) {
                    errorDialog(err)
                }
            })


        })

    }









    function htmlAdd(date, image, name, slug, id,
        email, mobile, verified, mon, tue, wed, thu, fri, sat, sun,
        about, map, code, noOfStaffs, noOfReviews) {

        var check, pub, alert;
        if (verified) {
            check = 'checked'
            pub = 'Published'
            alert = 'success'
        } else {
            check = ''
            pub = 'Not Published'
            alert = 'warning'
        }

        console.log("ID " + id)
        console.log("IMAGE " + image)


        var $_html = '<tr class="department-item" data-dept="' + id + '">' +
            '<td class="">' +
            '<div class="n-chk">' +
            '<label class="new-control new-checkbox new-checkbox-text checkbox-dark">' +
            '<input type="checkbox" class="new-control-input dept-checkbox" />' +
            '<span class="new-control-indicator"></span>' +
            '<span class="new-chk-content">.</span>' +
            '</label>' +
            '</div>' +
            '<p class="_id" style="display: none;">' + id + ' </p>' +
            '</td>' +
            '<td>' +
            '<div class="d-flex">' +
            '<div class="usr-img-frame mr-2 rounded-circle">' +
            '<img style="border-radius: 50%; width: 100%;" ' +
            'class="progressive__img progressive--not-loaded card-img-top image"' +
            'src="' + image + '" data-progressive="/uploads/5.jpg" />' +
            '</div>' +
            '<p class="align-self-center mb-0 admin-name name" data-name="' + slug + '">' + name + '</p>' +
            '</div>' +
            '</td>' +
            '<td></td>' +
            '<td class="code" data-map="' + map + '">' + code + '</td>' +
            '<td class="email">' + email + '</td>' +
            '<td class="mobile">' + mobile + '</td>' +
            '<td class="service-hours" data-mon="' + mon + '" data-tue="' + tue + '"' +
            'data-wed="' + wed + '" data-thu="' + thu + '" data-fri="' + fri + '"' +
            'data-sat="' + sat + '" data-sun="' + sun + '">' +
            '0' +
            '</td>' +
            '<td class="about verified" data-about="' + about + '" data-verified="' + verified + '">' +
            '<span class="shadow-none badge badge-warning">Pending</span> ' +
            '</td>' +
            '<td class="hod" data-hod="">' +
            '<span class="btn btn-dark rounded-circle hod-btn info" data-toggle="modal"' +
            'data-target="#hod-modal" title="Set Departments HOD ">' +
            '<i class="fa fa-user-cog"></i> ' +
            '</span> ' +
            '</td>' +
            '<td>' +
            '<div class="btn-group">' +
            '<button type="button" class="btn btn-dark btn-sm view">Preview</button>' +
            '<button type="button"' +
            'class="btn btn-dark btn-sm dropdown-toggle dropdown-toggle-split"' +
            'id="dropdownMenuReference28" data-toggle="dropdown" aria-haspopup="true"' +
            'aria-expanded="false" data-reference="parent">' +
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"' +
            'viewBox="0 0 24 24" fill="none" stroke="currentColor"' +
            'stroke-width="2" stroke-linecap="round" stroke-linejoin="round"' +
            'class="feather feather-chevron-down">' +
            '<polyline points="6 9 12 15 18 9"></polyline>' +
            '</svg>' +
            '</button>' +
            '<div class="dropdown-menu" aria-labelledby="dropdownMenuReference28">' +
            '<a class="dropdown-item edit" href="#"> <i class="fa fa-edit"></i>' +
            'Edit</a>' +
            '<div class="dropdown-divider"></div>' +
            '<a class="dropdown-item delete" href="#"><i class="fa fa-trash-alt"></i>' +
            'Delete</a>' +
            '</div>' +
            '</div>' +
            '</td>' +
            '</tr>' +

            console.log("Awaiting ...")
        console.log($("tbody"));
        console.log($(".departments"));

        $("tbody").prepend($_html)
    }












})