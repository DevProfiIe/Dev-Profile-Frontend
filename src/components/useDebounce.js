import { useEffect, useState } from "react";

// 검색 자동완성을 위한 커스텀 Hook
function useDebounce(value, delay = 500) {
    const [debounceVal, setDebounceVal] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceVal(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        }
    }, [value, delay]);

    return debounceVal;
}

export default useDebounce;