import { useState, useEffect } from 'react';

export default function useLocalStorage (STOREG_KEY, defaultValue) {
    const [state, setState] = useState(() => {
        return (JSON.parse(window.localStorage.getItem(STOREG_KEY))
            ?? defaultValue)
    });

    useEffect(() => {
        window.localStorage.setItem(STOREG_KEY, JSON.stringify(state));
    }, [STOREG_KEY, state]);

    return [state, setState]
}