$(document).ready(function() {
    var newTEST;
    var fired = false;
    $("#input_box").keydown(function(e) {
        var newPos = doGetCaretPosition(this);
        var value = String.fromCharCode(e.keyCode);
        if (!fired) {
            fired = true;
        } else if (e.keyCode == 8) { // 8 is the keyCode for backspace
            e.preventDefault();
        }
    });
    // $("#input_box").inputFilter(function(value) {
    //     return /^\d*$/.test(value); // Allow digits only, using a RegExp
    // });
    var count = 0;
    $("#input_box").keyup(function(e) {
        fired = false;
        var newPos = doGetCaretPosition(this);

        if (e.keyCode == 8 || e.keyCode == 46) {

            var get_newBg = $('#newBg').val();
            newTEST = get_newBg.replaceAt(newPos, '−');
            $('#newBg').val(newTEST);
            $(this).val(newTEST);
            // console.log("inback" + newTEST);
            setCaretToPos(document.getElementById("input_box"), newPos);
            if ($(this).val() == '−−−−−−−−−−') {
                $(this).val('');
            } else {
                // console.log('no');
            }

        }
    });

    $('#input_box').on('keypress', function(e) {
        var newPos = doGetCaretPosition(this);
        var get_newBg = $('#newBg').val();
        console.log(e.which);
        var valid = (e.which >= 48 && e.which <= 57);
        // var valid = ((e.which >= 48 && e.which <= 57) || (e.which >= 96 && e.which <= 105));
        if (!valid) {
            return false;
        } else {
            if ($(this).val().length < 10) {
                if (((e.which >= 49 && e.which <= 52) || (e.which >= 97 && e.which <= 100)) && newPos == 0) {
                    e.preventDefault();
                } else {
                    var this_val = $(this).val();
                    newTEST = get_newBg.replaceAt(newPos, String.fromCharCode(e.keyCode));
                    $('#newBg').val(newTEST);
                    // console.log("inkeypressval" + newTEST);
                }
            } else {
                if (newPos < 10) {
                    if ((e.which >= 49 && e.which <= 52) && newPos == 0) {
                        e.preventDefault();
                    } else {
                        newTEST = get_newBg.replaceAt(newPos, String.fromCharCode(e.keyCode));
                        $(this).val(newTEST);
                        $('#newBg').val(newTEST);
                        // console.log("incursor" + newTEST);
                        setCaretToPos(document.getElementById("input_box"), newPos + 1);
                    }
                }
            }

        }
    });
    $('#input_box').on('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '');
    })
    $('#newBg').on('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '');
    })
    $('#input_box').on("cut copy paste", function(e) {
        e.preventDefault();
    });

    String.prototype.replaceAt = function(index, replacement) {
        return this.substr(0, index) + replacement + this.substr(index + replacement.length);
    }

    function setSelectionRange(input, selectionStart, selectionEnd) {
        if (input.setSelectionRange) {
            input.focus();
            input.setSelectionRange(selectionStart, selectionEnd);
        } else if (input.createTextRange) {
            var range = input.createTextRange();
            range.collapse(true);
            range.moveEnd('character', selectionEnd);
            range.moveStart('character', selectionStart);
            range.select();
        }
    }

    function setCaretToPos(input, pos) {
        setSelectionRange(input, pos, pos);
    }

    function setSelectionRange(input, selectionStart, selectionEnd) {
        if (input.setSelectionRange) {
            input.focus();
            input.setSelectionRange(selectionStart, selectionEnd);
        } else if (input.createTextRange) {
            var range = input.createTextRange();
            range.collapse(true);
            range.moveEnd('character', selectionEnd);
            range.moveStart('character', selectionStart);
            range.select();
        }
    }

    function setCaretToPos(input, pos) {
        setSelectionRange(input, pos, pos);
    }
    // current caret postion

    function doGetCaretPosition(oField) {
        // Initialize
        var iCaretPos = 0;
        // IE Support
        if (document.selection) {
            // Set focus on the element
            oField.focus();
            // To get cursor position, get empty selection range
            var oSel = document.selection.createRange();
            // Move selection start to 0 position
            oSel.moveStart('character', -oField.value.length);
            // The caret position is selection length
            iCaretPos = oSel.text.length;
        }

        // Firefox support
        else if (oField.selectionStart || oField.selectionStart == '0')
            iCaretPos = oField.selectionDirection == 'backward' ? oField.selectionStart : oField.selectionEnd;
        // Return results
        return iCaretPos;
    }

});
