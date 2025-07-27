import { useState, useEffect } from 'react'


export function useLocalStorage<T>(
    key: string,
    initialValue: T
): [T, (value: T) => void] {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key)
            return item ? (JSON.parse(item) as T) : initialValue
        } catch (error) {
            console.warn(`useLocalStorage: помилка парсингу ${key}`, error)
            return initialValue
        }
    })


    const setValue = (value: T) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value
            setStoredValue(valueToStore)
            window.localStorage.setItem(key, JSON.stringify(valueToStore))
        } catch (error) {
            console.error(`useLocalStorage: не вдалося зберегти ${key}`, error)
        }
    }


    useEffect(() => {
        try {
            const item = window.localStorage.getItem(key)
            if (item) {
                setStoredValue(JSON.parse(item))
            }
        } catch {
            // silent
        }
    }, [key])

    return [storedValue, setValue]
}