$(document).ready(function () {
    var newTEST;
    var fired = false;
    $("#input_box").keydown(function (e) {
        if (!fired) {
            fired = true;
        } else if (e.keyCode == 8) { // 8 is the keyCode for backspace
            e.preventDefault();
        }
    });

    $("#input_box").keyup(function (e) {
        fired = false;
        var newPos = doGetCaretPosition(this);
        if (e.keyCode == 8 || e.keyCode == 46) {
            var get_newBg = $('#newBg').val();
            newTEST = get_newBg.replaceAtFirst(newPos, '−');
            $('#newBg').val(newTEST);
            $(this).val(newTEST);
            setCaretToPos(document.getElementById("input_box"), newPos);
        }
    });

    $('#input_box').on("keypress", function (e) {
        var newPos = doGetCaretPosition(this);
        var get_newBg = $('#newBg').val();
        var valid = (e.which >= 48 && e.which <= 57);
        var code = String.fromCharCode(e.keyCode);
        //alert(typeof (code));

        if (typeof (code) != Number) {
            e.preventDefault();
        } else {
            if ($(this).val().length < 10) {
                if ((e.which >= 49 && e.which <= 52) && newPos == 0) {
                    e.preventDefault();
                } else {
                    var this_val = $(this).val();
                    newTEST = get_newBg.replaceAtFirst(newPos, String.fromCharCode(e.keyCode));
                    console.log(newTEST);
                    var i = 0;
                    if (newTEST == 1) {

                    } else {
                        $('#newBg').val(newTEST);
                    }
                }
            } else {
                if (newPos < 10) {
                    if ((e.which >= 49 && e.which <= 52) && newPos == 0) {
                        e.preventDefault();
                    } else {
                        newTEST = get_newBg.replaceAtFirst(newPos, String.fromCharCode(e.keyCode));
                        if (newTEST == 1) {
                            alert("hi");
                        } else {
                            $(this).val(newTEST);
                            $('#newBg').val(newTEST);
                            setCaretToPos(document.getElementById("input_box"), newPos + 1);
                        }
                    }
                }
            }

        }
    });


    $('#input_box').on("cut copy paste", function (e) {
        e.preventDefault();
    });

    String.prototype.replaceAtFirst = function (index, replacement) {
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
