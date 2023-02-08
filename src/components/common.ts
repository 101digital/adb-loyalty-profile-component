export const thousandSeparator = (value: string) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const NumberFormatter = (value:string, decimal:number) => {
    return Number(parseFloat(value).toFixed(decimal)).toLocaleString('en', {
        minimumFractionDigits: 2,
    });
};

export const removeNonNumeric = (value: string) => {
    return value.replace(/[^0-9]/g, "");
}