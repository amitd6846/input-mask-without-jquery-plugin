$(document).ready(function () {
    var newTEST;
    var fired = false;

    $("#input_box").keydown(function (e) {
        this.value = this.value.replace(/[^0-9]/g, '');
        var newPos = doGetCaretPosition(this);
        var value = String.fromCharCode(e.keyCode);
        if (!fired) {
            fired = true;
        } else if (e.keyCode == 8) { // 8 is the keyCode for backspace
            e.preventDefault();
        }
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
            // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
            // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
        if (value < 5 && newPos == 0) {
            this.value = this.value.replace(/[^0-9]/g, '');
            console.log(value);
            e.preventDefault();
        }
    });

    $("#input_box").keyup(function () {
        fired = false;
    });

    $("#input_box").keyup(function (e) {
        var newPos = doGetCaretPosition(this);


        if (e.keyCode == 8 || e.keyCode == 46) {
            var get_newBg = $('#newBg').val();
            newTEST = get_newBg.replaceAt(newPos, '−');
            $('#newBg').val(newTEST);
            $(this).val(newTEST);
            setCaretToPos(document.getElementById("input_box"), newPos);
        }
    });

    $('#input_box').on('keypress', function (e) {
        var newPos = doGetCaretPosition(this);
        var get_newBg = $('#newBg').val();

        if ($(this).val().length < 10) {
            var this_val = $(this).val();
            newTEST = get_newBg.replaceAt(newPos, String.fromCharCode(e.keyCode));
            $('#newBg').val(newTEST);
        } else {
            if (newPos < 10) {
                newTEST = get_newBg.replaceAt(newPos, String.fromCharCode(e.keyCode));
                $(this).val(newTEST);
                $('#newBg').val(newTEST);

                setCaretToPos(document.getElementById("input_box"), newPos + 1);
            }
        }
    });

    String.prototype.replaceAt = function (index, replacement) {
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
