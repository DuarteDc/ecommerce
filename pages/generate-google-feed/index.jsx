import React from 'react'
import { wrapper } from '../../src/store'

import getRSSForGoogle from '../../src/lib/generateRSSForGoogle';
import getRSSForFacebook from '../../src/lib/generateRSSForFacebook';
import getRSS from '../../src/lib/generateRSS';

const FeedGoogle = () => {
    return (
        <div className="flex items-center justify-center min-h-screen text-2xl font-semibold">
           <p>Feed generado correctamente</p>
        </div>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(() =>
    async () => {
        await getRSSForGoogle();
        await getRSSForFacebook();
        await getRSS();
    }
);

export default FeedGoogle