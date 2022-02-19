import React, { useEffect, useRef, useState } from 'react'

const Countdown = () => {
    const [timerMinutes, setTimerMinutes] = useState('05');
    const [timerSeconds, setTimerSeconds] = useState('00');
    let interval = useRef();

    const startTimmer = () => {
        const currentDate = new Date().getTime();
        const countDownTime = new Date(currentDate + 300000).getTime();

        interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = countDownTime - now;

            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (interval < 0) {
                clearInterval(interval.current);
            } else {
                setTimerMinutes("0" + minutes);
                setTimerSeconds(seconds);
            }

        }, 1000);
    }
    useEffect(() => {
        startTimmer();
        return () => {
            clearInterval(interval.current);
        }
    }, [])
    return (
        <section className="mt-10">
            <div className='text-center'>
                <p>Tienes 5 minutos para finalizar la compra</p>
            </div>
            <div className="text-5xl flex justify-center mt-5 text-[#fa440a] font-bold">
                <div>
                    <p>{timerMinutes}</p>
                </div>
                <span>:</span>
                <div>
                    <p>{timerSeconds}</p>
                </div>
            </div>
        </section>
    )
}

export default Countdown;

