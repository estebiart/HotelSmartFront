export const setLocalStorage = (key: string, value: any) => {
    if (typeof value === 'string') {
        localStorage.setItem(key, value); 
    } else {
        localStorage.setItem(key, JSON.stringify(value)); 
    }
};

export const getLocalStorage = (key: string) => {
    return localStorage.getItem(key);
};
