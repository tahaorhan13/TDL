// o={Id:null, close:null, save:null}
var ResetPassword = function (o) {
    var apiUser = new app.api.account.User();
    function init() {
        $('#lblCardTitle').html(app.lang.ResetPassword);
        $('#lblPassword').html(app.lang.Password);
        $('#lblConfirmPassword').html(app.lang.ConfirmPassword);
        $('#btnChange').html(app.lang.Change);
        $('#btnClose').html(app.lang.Close);
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
        $('#btnClose').on('click', function () {
            if (o.close !== undefined && o.close !== null)
                o.close();
        });
        $('#btnChange').on('click', function () {
            if ($(this).hasClass("btn-outline-light"))
                return;
            app.comp.blocker.App.block();
            var p = {
                'Id': o.Id,
                'Password': $('#txtPassword').val()
            };
            apiUser.resetPassword(p, function (r) {
                if (r.Error) {
                    Swal.fire(app.kendo.grid.api.getResultMessage(r));
                    return;
                }
                if (o.save !== undefined && o.save != null)
                    o.save({ action: 'update', value: r.Value });
            }, function (err) { }, function () {
                app.comp.blocker.App.unblock();
            });
        });
    }
    init();
};