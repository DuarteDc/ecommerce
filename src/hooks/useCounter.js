import {useState} from 'react';

export const useCounter = (initialNumber = 1) =>{
    const [counter , setCounter ] = useState(initialNumber);

    const increaseBy = (value) =>{
        setCounter(Math.max(counter + value ,1));
    }

    return {
        counter,
        increaseBy,        
        setCounter
    }
}

