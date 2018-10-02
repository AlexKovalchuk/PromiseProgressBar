function getControlSum(barcode){
    let  sum = {even:0, odd:0};
    let even, odd;
    for(let i=0; i < barcode.length; i++){
        let method = (i % 2) ?   'odd' : 'even' ;
        sum[method] += Number(barcode.charAt(i));
    }
    return sum.even  +  sum.odd * 3;
}
function patternValidate(pattern = '', val){
    if(!!pattern){
        return pattern.test(val);
    }
    return true;
}
function checkEan(eanCode) {
    let eCode = eanCode;
    var ValidChars = "0123456789";
    for (let i = 0; i < eanCode.length; i++) {
        var digit = eanCode.charAt(i);
        if (ValidChars.indexOf(digit) == -1) {
            return false;
        }
    }
    // Add five 0 if the code has only 8 digits
    if (eanCode.length == 8 ) {
        eanCode = "00000" + eanCode;
    }
    // Check for 13 digits otherwise
    else if (eanCode.length != 13) {
        return false;
    }

    // Get the check number
    var originalCheck = eanCode.substring(eanCode.length - 1);
    eanCode = eanCode.substring(0, eanCode.length - 1);
    let total = getControlSum(eanCode);
    // Calculate the checksum
    // Divide total by 10 and store the remainder
    let checksum = total % 10;
    // If result is not 0 then take away 10
    if (checksum != 0) {
        checksum = 10 - checksum;
    }
    // Return the result
    if (checksum != originalCheck) {
        return false;
    }
    return true;
}

export default function validateBarcode(v){
    return patternValidate(/^029[0,1]{1}\d{9}$/, v) && checkEan(v);
}
