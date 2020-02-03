$(document).ready(function() {
    // var plceHoldr = ['−', '−', '−', '−', '−', '−', '−', '−', '−', '−'];
    var newTEST;
    $('#input_box').on('keypress', function(e) {
        this.value = this.value.replace(/[^0-9]/g, '');
        var newPos = doGetCaretPosition(this);

        var get_newBg = $('#newBg').val();
        if ($(this).val().length < 10) {

            var this_val = $(this).val();
            newTEST = get_newBg.replaceAt(newPos, String.fromCharCode(e.keyCode));
            $('#newBg').val(newTEST);
            //$(this).val(newTEST);
            console.log("length::", $(this).val().length)
        } else {
            //e.preventDefault();
            if (newPos < 10) {
                newTEST = get_newBg.replaceAt(newPos, String.fromCharCode(e.keyCode));
                $(this).val(newTEST);
                $('#newBg').val(newTEST);

                setCaretToPos(document.getElementById("input_box"), newPos + 1);
            }
        }
    });
    $('#input_box').on('input change', function() {

    });
    $('#input_box').on('keyup', function(e) {

        if (!$(this).val()) {
            $('#newBg').val('−−−−−−−−−−');
        }
        var newPos = doGetCaretPosition(this);
        if (e.keyCode == 8 || e.keyCode == 46) {
            var get_newBg = $('#newBg').val();
            newTEST = get_newBg.replaceAt(newPos, '−');
            $('#newBg').val(newTEST);
            $(this).val(newTEST);
            console.log(newPos);
            setCaretToPos(document.getElementById("input_box"), newPos);
        }

    });

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
window.addEventListener("load", function() {
    var input = document.getElementsByTagName("input");

    input[0].addEventListener("keydown", function() {
        //  alert("Caret position: " + this.selectionStart);

        // You can also set the caret: this.selectionStart = 2;
    });
});