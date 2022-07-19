import React from 'react';
import FacilityBox from '../ui/facilityBox';

import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PaymentIcon from '@mui/icons-material/Payment';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

export const FacilityArea = () => {
    
    return (
        <section className="bg-[#333] py-9">
            <div className="px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
                <FacilityBox
                  icon={<LocalAirportIcon className="text-4xl" />}
                  title="Envíos Nacionales"
                />
                <FacilityBox
                  icon={<AttachMoneyIcon className="text-4xl" />}
                  title="Garantia de Devolución de Dinero"
                />
                <FacilityBox
                  icon={<PaymentIcon className="text-4xl" />}
                  title="Muchas Formas de Pago"
                />
                <FacilityBox
                  icon={<QuestionMarkIcon className="text-4xl" />}
                  title="Soporte en Linea 24/7"
                />
            </div>
        </section>
    );
};