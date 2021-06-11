app.comp.vw.breadcrumb.set({ title: app.lang.ChangePassword });
$('#lblCardTitle').html(app.lang.ChangePassword);
$('#lblCurrentPassword').html(app.lang.CurrentPassword);
$('#lblPassword').html(app.lang.Password);
$('#lblConfirmPassword').html(app.lang.ConfirmPassword);
$('#btnChange').html(app.lang.Change);
$('input[required="required"]').attr('placeholder', app.lang.ValidationMessage);
$('input[required="required"]').addClass('is-invalid');
$('#btnChange').addClass('btn-outline-light');
$('input[required="required"]').on('keyup', function () {
    $(this).removeClass('is-invalid');
    $('#btnChange').removeClass('btn-outline-light btn-info');
    if ($(this).val() !== '') {
        $(this).addClass('is-valid');
    } else {
        $(this).addClass('is-invalid');
    }
    let id = $(this).attr('id');
    if (id === 'txtConfirmPassword') {
        if ($(this).val() !== $('#txtPassword').val()) {
            $(this).addClass('is-invalid');
        }
    } else if (id === 'txtPassword') {
        $('#txtConfirmPassword').val('');
    }
    let len = $('.is-invalid').length;
    if (len > 0) {
        $('#btnChange').addClass('btn-outline-light');
    } else {
        $('#btnChange').removeClass('btn-outline-light');
        $('#btnChange').addClass(' btn-info');
    }
});
$('#btnChange').on('click', function () {
    if ($(this).hasClass("btn-outline-light"))
        return;
    app.comp.blocker.App.block();
    var p = {
        'CurrentPassword': $('#txtCurrentPassword').val(),
        'Password': $('#txtPassword').val()
    };
    var apiUser = new app.api.account.User();
    apiUser.changePassword(p, function (r) {
        $('input[required="required"]').val('');
        $('input[required="required"]').addClass('is-invalid');
        if (r.Error) {
            Swal.fire(app.kendo.grid.api.getResultMessage(r));
            return;
        }
        Swal.fire({
            type: 'success',
            title: app.lang.Info,
            text: app.lang[r.Message.SystemCode],
        });
    }, function (err) { }, function () {
        app.comp.blocker.App.unblock();
    });
});