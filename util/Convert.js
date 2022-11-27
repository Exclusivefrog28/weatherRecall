//input: Celsius
export function convertTemp(temp, unit) {
    switch (unit) {
        case ' K':
            return parseFloat((temp + 273.15).toFixed(1));
        case '°F':
            return parseFloat((1.8 * temp + 32).toFixed(1));
        default:
            return temp;
    }
}

//input: millimeters
export function convertLength(length, unit) {
    if (unit === 'inch') {
        return parseFloat((length * 0.0393700).toFixed(3));
    }
    return length;
}
