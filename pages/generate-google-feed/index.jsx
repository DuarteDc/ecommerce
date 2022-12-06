import React from 'react'
import { wrapper } from '../../src/store'

import getRSSForGoogle from '../../src/lib/generateRSSForGoogle';
import getRSSForFacebook from '../../src/lib/generateRSSForFacebook'

const FeedGoogle = () => {
    return (
        <div className="flex items-center justify-center min-h-screen text-2xl font-semibold">
            404
            <hr className='w-[.2px] h-[3.6rem] bg-gray-400 mx-5' />
            <span className="text-sm font-normal">This page could not be found.</span>
        </div>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(() =>
    async () => {
        await getRSSForGoogle();
        await getRSSForFacebook();
    }
);

export default FeedGoogle