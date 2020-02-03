$(document).ready(function() {

    //var plceHoldr = ['−', '−', '−', '−', '−', '−', '−', '−', '−', '−'];
    $('#input_box').on('keypress', function(e) {
        this.value = this.value.replace(/[^0-9]/g, '');
        var get_newBgVal = $('#newBg').val().split('');
        var plceHoldr = $('#plceHolder_box').attr('placeholder').split('');
        var caretPosition = doGetCaretPosition(this);
        var newPos = caretPosition;
        get_newBgVal[newPos] = String.fromCharCode(e.keyCode);
        var join_newBg = get_newBgVal.join('');
        $('#newBg').val(join_newBg);
        console.log('On KeyPress Caret Position >>' + newPos);
        plceHoldr[newPos] = String.fromCharCode(e.keyCode);
        var plceHoldr_join = plceHoldr.join('');
        if (plceHoldr.length > 10) {
            e.preventDefault();
        } else {
            var currtCaret = newPos;
            $('#plceHolder_box').attr('placeholder', plceHoldr_join);
            setCaretToPos(document.getElementById("input_box"), currtCaret);
            //  console.log(newPos + '::::' + currtCaret);
        }
    });
    $('#input_box').on('keyup', function(e) {
        var caretPostionNo = doGetCaretPosition(this);
        var newPos = caretPostionNo;
        if (e.keyCode == 8 || e.keyCode == 46) {
            var newPlceHoldr = $('#plceHolder_box').attr('placeholder');
            var placeholdr_arry = newPlceHoldr.split('');
            placeholdr_arry[newPos] = '−';
            console.log('On Backspace caret Position >>' + newPos);
            $('#plceHolder_box').attr('placeholder', placeholdr_arry.join(''));
            $(this).val(placeholdr_arry.join(''));
            setCaretToPos(document.getElementById("input_box"), newPos);
        }
    });
})



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