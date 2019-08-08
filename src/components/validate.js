// Phone Number Validation
export const isValid = (n) => {

    var firstChar;
    var number;
    var pattern = /^([0]{1})([7-9]{1})([0|1]{1})([\d]{1})([\d]{7,8})$/g;

    if (!n || n.length < 5) return false;

    if (typeof n === 'number') {

        // numbers never begin with 0, force this to become a string
        number = '0' + n;

    } else if (typeof n === 'string') {

        firstChar = n.substring(0, 1);

        // user may supply 0 before the number or not
        // e.g 0703 or 703 (two types of people ¯\_(ツ)_/¯)
        // either way supply missing leading 0
        number = (firstChar === '0') ? n : '0' + n;

    } else {

        return false;

    }

    // remove all whitespace(s) before running test 
    return pattern.test(number.replace(/\s+/g, ''));

};    
   
export const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;

export const  validateForm = ({errors, ...rest}) => {
    let valid =true;
    // validate form errors
Object.values(errors).forEach(val => {
        val.length > 0 && (valid = false);
    })
    Object.values(rest).forEach(val => {
            val === null && (valid = false)
        })
    return valid
};

