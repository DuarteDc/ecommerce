import {useState} from 'react';

export const useCounter = (initialNumber = 0) =>{
    const [counter , setCounter ] = useState(initialNumber);

    const increaseBy = (value) =>{
        setCounter(prev=> Math.max(prev + value ,1));
    }

    return {
        counter,
        increaseBy
    }
}

