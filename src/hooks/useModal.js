import {useState} from 'react';

export const useModal = (initalState = false) =>{
    const [isOpen, setIsOpen] = useState(initalState);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    
    return [isOpen, openModal, closeModal];
}