// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
//
//   Organisation: Broad AI Lab, University of Auckland
//   Author: Ziqi Wang
//   Date: 2021-09-30
//
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

(function() {
    $(window).ready(function() {

        clipboard = new Clipboard('#copy-translation-btn');
        clipboard.on('success', function(e) {
            // console.info('Action:', e.action);
            // console.info('Text:', e.text);
            // console.info('Trigger:', e.trigger);
            e.clearSelection();
        });
    });

    $('#src-en-btn').click(toggleTranslateFromEn);
    $('#src-en-btn').click(clearInputAndOutput);
    $('#tgt-zh-btn').click(toggleTranslateFromEn);
    $('#tgt-zh-btn').click(clearInputAndOutput);

    $('#tgt-en-btn').click(toggleTranslateFromZh);
    $('#tgt-en-btn').click(clearInputAndOutput);
    $('#src-zh-btn').click(toggleTranslateFromZh);
    $('#src-zh-btn').click(clearInputAndOutput);

    $('#clear-input-btn').click(clearInput);
    $('#copy-translation-btn').click(showCopySuccessfulMsg);

    $('#source-textarea').change(translate);


    function toggleTranslateFromEn() {
        $('#src-en-btn').parent().addClass('active');
        $('#tgt-zh-btn').parent().addClass('active');
        $('#tgt-en-btn').parent().removeClass('active');
        $('#src-zh-btn').parent().removeClass('active');
    }

    function toggleTranslateFromZh() {
        $('#src-en-btn').parent().removeClass('active');
        $('#tgt-zh-btn').parent().removeClass('active');
        $('#tgt-en-btn').parent().addClass('active');
        $('#src-zh-btn').parent().addClass('active');
    }

    function clearInput() {
        $('#source-textarea').val('');
    }

    function clearInputAndOutput() {
        $('#source-textarea').val('');
        $('#target-output').val('');
    }

    function showCopySuccessfulMsg() {
        $('.alert.copied').fadeIn().delay(2000).fadeOut();
    }

    function getSrcLang() {
        if ($('#src-en-btn').parent().hasClass('active') && !$('#src-zh-btn').parent().hasClass('active')) {
            return 'en'
        } else if (!$('#src-en-btn').parent().hasClass('active') && $('#src-zh-btn').parent().hasClass('active')) {
            return 'zh'
        } else {
            return 'ERROR'
        }
    }

    function renderResult(result) {
        $('#target-output').val(result.output[0].detok_hypo_str);
    }

    function translate() {
        // get source language code
        let sourceLanguage = getSrcLang();
        let inputStr = $('#source-textarea').val();
        if (sourceLanguage == 'en' || sourceLanguage == 'zh') {
            // validate data??
            let data = {
                "srcLang": sourceLanguage,
                "inputStr": inputStr
            }

            $.ajax({
                type: 'POST',
                url: '/translate',
                data: JSON.stringify(data),
                contentType: "application/json",
                dataType: 'json',
                success: function(response) {
                    let result = { output: response['output'] };
                    if (result) {
                        renderResult(result);
                    } else {
                        alert('Server Error: please try again later.');
                    }
                },
                error: function() {
                    alert('Server Error: please try again later.');
                }
            });
        } else {
            alert('Client Error: please refresh page and try again.');
        }
    }
})()