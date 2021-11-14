export const progress = (a, b) => {
    let c = ((a / b).toFixed(2) * 100)
    return c > 100 ? 100 : c;
}

export const getProgressColor = (a, b) => {
    let v = progress(a, b)
    return (v >= 80 ? 'bg-red-500' : 'bg-blue-500') + ' text-xs text-white rounded h-4 flex items-center';
}

export const bytesToSize = (bytes) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (parseInt(bytes) === 0) return '0 KB';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

export const checkOnline = (lastData) =>{
    const a = new Date(lastData) - 1;
    const b = new Date()
    console.log([lastData, b, b - a])
    return (b - a) > 400
}