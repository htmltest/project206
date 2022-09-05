$(document).ready(function() {

    $('body').on('focus', '.form-input input', function() {
        $(this).parent().addClass('focus');
    });

    $('body').on('blur', '.form-input input', function() {
        $(this).parent().removeClass('focus');
        if ($(this).val() != '') {
            $(this).parent().addClass('full');
        } else {
            $(this).parent().removeClass('full');
        }
    });

	$('body').on('keyup', '.form-input input', function() {
		if ($(this).val() != '') {
			$(this).parent().addClass('full');
		} else {
			$(this).parent().removeClass('full');
		}
	});

    $('form').each(function() {
        initForm($(this));
    });

    $('.welcome-link a').click(function(e) {
        $('html, body').animate({'scrollTop': $('.main-form-title').offset().top});
        e.preventDefault();
    });

    $('.form-input-hint').click(function() {
        $('.form-input-hint').toggleClass('open');
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.form-input-hint').length == 0 && !$(e.target).hasClass('form-input-hint')) {
            $('.form-input-hint').removeClass('open');
        }
    });

	$('input.imei').attr('autocomplete', 'off');

    $('body').on('keyup', '.form-input input.imei', function(e) {
        var curInput = $(this);
        if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
            var curValue = curInput.val();
            if (curValue.length == 15) {
                curInput.parent().find('label').remove();
                curInput.removeClass('error').addClass('valid');
            } else {
                curInput.parent().find('label').remove();
                curInput.removeClass('valid error');
                curInput.after('<label class="error">IMEI должен состоять из 15 символов</label>');
            }
        } else {
            curInput.parent().find('label').remove();
            curInput.addClass('error').removeClass('valid');
            curInput.after('<label class="error">IMEI может содержать только цифры от 0 до 9</label>');
        }
	});

	$('body').on('focus', '.form-input input.imei', function(e) {
        var curInput = $(this);
        curInput.parent().find('label').remove();
        var curValue = curInput.val();
        if (curValue.length != 15) {
            curInput.after('<label class="error">IMEI должен состоять из 15 символов</label>');
        }
 	});

	$('input.serial').attr('autocomplete', 'off');

    $('body').on('keyup', '.form-input input.serial', function(e) {
        var curInput = $(this);
        var curSelect = $('.model-select');
        var curValueSelect = curSelect.val();
        if (curValueSelect != '') {
            var curOption = curSelect.find('option:selected');
            var curType = curOption.attr('data-type');
            curInput.parent().find('label').remove();
            if (curType == 'pad') {
                if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
                    var curValue = curInput.val();
                    if (curValue.length == 15) {
                        curInput.parent().find('label').remove();
                        curInput.removeClass('error').addClass('valid');
                    } else {
                        curInput.parent().find('label').remove();
                        curInput.removeClass('valid error');
                        curInput.after('<label class="error">Серийный номер должен состоять из 15 символов</label>');
                    }
                } else {
                    curInput.parent().find('label').remove();
                    curInput.addClass('error').removeClass('valid');
                    curInput.after('<label class="error">Серийный номер может содержать только цифры от 0 до 9</label>');
                }
            } else if (curType == 'tv') {
                console.log(e.keyCode);
                if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105) || (e.keyCode >= 65 && e.keyCode <= 90) || e.keyCode == 16) {
                    var curValue = curInput.val();
                    if (curValue.length == 20) {
                        curInput.parent().find('label').remove();
                        curInput.removeClass('error').addClass('valid');
                    } else {
                        curInput.parent().find('label').remove();
                        curInput.removeClass('valid error');
                        curInput.after('<label class="error">Серийный номер должен состоять из 20 символов</label>');
                    }
                } else {
                    curInput.parent().find('label').remove();
                    curInput.addClass('error').removeClass('valid');
                    curInput.after('<label class="error">Серийный номер может содержать только цифры и латинские буквы</label>');
                }
            } else {
                if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
                    var curValue = curInput.val();
                    if (curValue.length == 18) {
                        curInput.parent().find('label').remove();
                        curInput.removeClass('error').addClass('valid');
                    } else {
                        curInput.parent().find('label').remove();
                        curInput.removeClass('valid error');
                        curInput.after('<label class="error">Серийный номер должен состоять из 18 символов</label>');
                    }
                } else {
                    curInput.parent().find('label').remove();
                    curInput.addClass('error').removeClass('valid');
                    curInput.after('<label class="error">Серийный номер может содержать только цифры от 0 до 9</label>');
                }
            }
        }
	});

	$('body').on('focus', '.form-input input.serial', function(e) {
        var curInput = $(this);
        var curSelect = $('.model-select');
        var curValueSelect = curSelect.val();
        if (curValueSelect != '') {
            var curOption = curSelect.find('option:selected');
            var curType = curOption.attr('data-type');
            curInput.parent().find('label').remove();
            if (curType == 'pad') {
                var curValue = curInput.val();
                if (curValue.length != 15) {
                    curInput.after('<label class="error">Серийный номер должен состоять из 15 символов</label>');
                }
            } else if (curType == 'tv') {
                var curValue = curInput.val();
                if (curValue.length != 20) {
                    curInput.val('RU');
                    curInput.after('<label class="error">Серийный номер должен состоять из 20 символов</label>');
                }
            } else {
                var curValue = curInput.val();
                if (curValue.length != 18) {
                    curInput.after('<label class="error">Серийный номер должен состоять из 18 символов</label>');
                }
            }
        }
	});

    $('.model-select').change(function() {
        var curSelect = $(this);
        var curValue = curSelect.val();
        if (curValue != '') {
            var curOption = curSelect.find('option:selected');
            var curType = curOption.attr('data-type');
            $('input.serial').val('').trigger('blur');
            $('input.serial').parent().find('label').remove();
            if (curType == 'pad') {
                $('input.serial').mask('000000000000000');
            } else if (curType == 'tv') {
                $('input.serial').mask('RUZZZZZZZZZZZZZZZZZZ', {
                    translation: {
                        'Z': {
                            pattern: /\w/, optional: true
                        }
                    }
                });
            } else {
                $('input.serial').mask('000000000000000000');
            }
        }
    });

});

function initForm(curForm) {
    curForm.find('input.imei').mask('000000000000000');

	curForm.find('.form-input input').each(function() {
		if ($(this).val() != '') {
			$(this).parent().addClass('full');
		} else {
			$(this).parent().removeClass('full');
		}
	});

    curForm.find('.form-input input:focus').each(function() {
        $(this).trigger('focus');
    });

    curForm.find('.form-input input').blur(function(e) {
        $(this).val($(this).val()).change();
    });

    curForm.find('.form-select select').each(function() {
        var curSelect = $(this);
        var options = {
            minimumResultsForSearch: 20
        }

        curSelect.select2(options);

        curSelect.parent().find('.select2-container').attr('data-placeholder', curSelect.attr('data-placeholder'));
        curSelect.parent().find('.select2-selection').attr('data-placeholder', curSelect.attr('data-placeholder'));
        curSelect.on('select2:select', function(e) {
            $(e.delegateTarget).parent().find('.select2-container').addClass('select2-container--full');
            if (typeof curSelect.attr('multiple') !== 'undefined') {
                $(e.delegateTarget).parent().find('.select2-container').addClass('select2-container--full-multiple');
            }
            curSelect.parent().find('select.error').removeClass('error');
            curSelect.parent().find('label.error').remove();
            curSelect.parent().find('select').addClass('valid');
        });

        curSelect.on('select2:unselect', function(e) {
            if (curSelect.find('option:selected').length == 0) {
                curSelect.parent().find('.select2-container').removeClass('select2-container--full select2-container--full-multiple');
                curSelect.parent().find('select').removeClass('valid');
            }
        });

        if (curSelect.val() != '' && curSelect.val() !== null) {
            curSelect.trigger({type: 'select2:select'})
            curSelect.parent().find('.select2-container').addClass('select2-container--full');
            curSelect.parent().find('select').addClass('valid');
            if (typeof curSelect.attr('multiple') !== 'undefined') {
                $(e.delegateTarget).parent().find('.select2-container').addClass('select2-container--full-multiple');
            }
        }
    });

    curForm.validate({
        ignore: '',
        submitHandler: function(form) {
            var isError = false;
            curForm.find('.form-input input.imei').each(function(e) {
                var curInput = $(this);
                var curValue = curInput.val();
                if (curValue.length != 15) {
                    isError = true;
                    curInput.parent().find('label').remove();
                    curInput.removeClass('valid').addClass('error');
                    curInput.after('<label class="error">IMEI должен состоять из 15 символов</label>');
                }
            });
            curForm.find('.form-input input.serial').each(function(e) {
                var curInput = $(this);
                var curSelect = $('.model-select');
                var curValueSelect = curSelect.val();
                if (curValueSelect != '') {
                    var curOption = curSelect.find('option:selected');
                    var curType = curOption.attr('data-type');
                    curInput.parent().find('label').remove();
                    if (curType == 'pad') {
                        var curValue = curInput.val();
                        if (curValue.length != 15) {
                            isError = true;
                            curInput.parent().find('label').remove();
                            curInput.removeClass('valid').addClass('error');
                            curInput.after('<label class="error">Серийный номер должен состоять из 15 символов</label>');
                        }
                    } else if (curType == 'tv') {
                        var curValue = curInput.val();
                        if (curValue.length != 20) {
                            isError = true;
                            curInput.parent().find('label').remove();
                            curInput.removeClass('valid').addClass('error');
                            curInput.after('<label class="error">Серийный номер должен состоять из 20 символов</label>');
                        }
                    } else {
                        var curValue = curInput.val();
                        if (curValue.length != 18) {
                            isError = true;
                            curInput.parent().find('label').remove();
                            curInput.removeClass('valid').addClass('error');
                            curInput.after('<label class="error">Серийный номер должен состоять из 18 символов</label>');
                        }
                    }
                }
            });
            if (!isError) {
                curForm.find('.form-footer-error').removeClass('visible');
                curForm.find('.form-footer-success').removeClass('visible');
                curForm.addClass('loading');
                var curData = curForm.serialize();
                $.ajax({
                    type: 'POST',
                    url: curForm.attr('action'),
                    dataType: 'json',
                    data: curData,
                    cache: false
                }).fail(function(jqXHR, textStatus, errorThrown) {
                    curForm.find('.form-footer-error').addClass('visible').find('.message-text').html(textStatus);
                    curForm.find('.form-footer-link').addClass('hidden');
                    curForm.removeClass('loading');
                }).done(function(data) {
                    curForm.find('label.error').remove();
                    if (data.status) {
                        curForm.find('.form-footer-success').addClass('visible');
                        curForm.find('.form-footer-link').addClass('hidden');
                        curForm.find('.form-input input').val('').trigger('blur');
                        curForm.find('.form-input input').removeClass('error valid');
                        curForm.find('label.error').remove();
                        curForm.find('.form-checkbox input').prop('checked', false);
                        curForm.find('.form-select select').val(null).trigger('change');
                        curForm.find('.select2-container').removeClass('select2-container--full select2-container--full-multiple');
                        curForm.find('.form-select select').removeClass('valid');
                    } else {
                        curForm.find('.form-footer-link').addClass('hidden');
                        curForm.find('.form-footer-error').addClass('visible').find('.message-text').html(data.message);
                    }
                    curForm.removeClass('loading');
                });
            }
        }
    });
}