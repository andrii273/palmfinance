export function formattedNumber(number) {
    const absNumber = Math.abs(number);

    const options = {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    };

    const formattedWithOptions = absNumber.toLocaleString('en-US', options);

    return number < 0 ? '(' + formattedWithOptions + ')' : formattedWithOptions;
}