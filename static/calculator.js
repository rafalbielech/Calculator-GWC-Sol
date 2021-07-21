//global calculator state
const calculator_state = {
    val: '0',
    op_stack: [],
    operand_string: ""
};


// reset calculator state
function resetCalculator() {
    calculator_state.val = '0';
    calculator_state.op_stack = [];
    calculator_state.operand_string = "";
}

$('button').click(function (event) {
    // capture what was clicked & type of button
    let click_event = $(this).val();
    let button_type = event.target.className;

    // if numeric or decimal button is clicked, then add it to the running operand string
    if (button_type.includes("numeric") || button_type.includes("decimal")) {
        calculator_state.operand_string = calculator_state.operand_string.concat(click_event);
        $('.calculator-screen').val(calculator_state.operand_string);
    }

    // if user selects an operator
    if (button_type.includes("operator")) {
        // if the button is an operator, we want to turn operand string to a float and add it to our operator stack
        try {
            calculator_state.op_stack.push(parseFloat(calculator_state.operand_string));
        } catch (err) {
            // if there is an error turning operand string to float, show ERROR and print to console
            console.log("Cannot parse " + calculator_state.operand_string + " to a float");
            $('.calculator-screen').val("ERROR");
        }

        // add operator to operator stack and clear out operand string
        calculator_state.operand_string = "";
        if (click_event != "=") {
            calculator_state.op_stack.push(click_event);
        }
        $('.calculator-screen').val("");
    }

    if (button_type.includes("all-clear")) {
        resetCalculator();
        $('.calculator-screen').val("");
    }


    if (button_type.includes("equal-sign")) {
        let operator_type = "";
        let running_val = calculator_state.val;
        if (calculator_state.op_stack.length > 1) {
            // if there is something on the stack already, use it to modify the the running val
            if (typeof (calculator_state.op_stack[0]) == "number" && String(calculator_state.op_stack[0]) != 'NaN') {
                running_val = calculator_state.op_stack.shift();
            }
            // iterate through the queue and get vals
            while (typeof (i = calculator_state.op_stack.shift()) !== 'undefined') {
                if (String(i) != 'NaN') {
                    if (typeof (i) == "string") {
                        operator_type = i;
                    } else {
                        if (operator_type == "+") {
                            running_val += i;
                        } else if (operator_type == "-") {
                            running_val -= i;
                        } else if (operator_type == "*") {
                            running_val *= i;
                        } else if (operator_type == "/") {
                            running_val /= i;
                        }
                    }
                }
            }
        }

        // update screen
        calculator_state.val = running_val;
        calculator_state.operand_string = "";

        $('.calculator-screen').val(running_val);
    }
});