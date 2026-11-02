import { useState, useEffect } from "react";

const useLocalStorage = (key,initialValue) => {
    const [value, setValue] = useState(()=>{
        const savedValue = localStorage.getItem(key);

        return savedValue !== null ? JSON.parse(savedValue) : initialValue;
    })

    useEffect(()=>{
        localStorage.setItem(key, JSON.stringify(value));
    }, [key,value]);

    return [value,setValue];
};

export default useLocalStorage;