import { useSelector } from 'react-redux';
import { wrapper } from '../../src/store';

import Layout from '../../src/components/Layouts';
import { BannerImage } from '../../src/components/ui';
import CardPermissions from '../../src/components/permissions/CardPermissions';

import { useToggle } from '../../src/hooks/useToggle';
import { startLoadAdministrableLogo, startLoadCountryPermissions, loadOneCountryPermissions } from '../../src/actions/administrableActions';
import { Modal } from '../../src/components/ui/modal';
import { useDispatch } from 'react-redux';
import PermissionsDetail from '../../src/components/permissions/PermissionsDetail';

import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { startLoadCurrencies } from '../../src/actions/countryAcctions';


const CountryPermissions = () => {

    const { countryPermissions, country } = useSelector(state => state.administrable);

    const [openModal, toggleOpenModal] = useToggle();
    const dispatch = useDispatch();

    const getOnePermission = async (permission) => {
        toggleOpenModal();
        await dispatch(loadOneCountryPermissions(permission))
    }

    return (
        <Layout>
            <BannerImage
                title="Permisos de exportación"
                banner="bg-banner15"
            />
            <section className="container mx-auto min-h-screen ">
                <div className="mt-20">
                    <Breadcrumbs
                        aria-label="breadcrumb"
                        separator={<NavigateNextIcon fontSize="small" />}
                    >
                        <Link href="/" passHref className="no-underline">
                            <div className="flex items-center justify-between cursor-pointer text-gray-600">
                                <HomeIcon />
                                <span className="text-lg font-Poppins ml-3 ">Inicio</span>
                            </div>
                        </Link>
                        <Typography variant="subtitle1" className="text-base font-Poppins text-[#e91e63]">
                            Permisos de exportación
                        </Typography>
                    </Breadcrumbs>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-Poppins">
                    {
                        countryPermissions.map(({ _id, country, image, attachments, createdAt }) => (
                            <CardPermissions
                                key={_id}
                                _id={_id}
                                name={country}
                                image={image}
                                attachments={attachments}
                                date={createdAt}
                                toggleOpenModal={toggleOpenModal}
                                getOnePermission={getOnePermission}
                            />
                        ))
                    }
                </div>
            </section>
            <Modal
                handleOpenCheckout={toggleOpenModal}
                open={openModal}
                actions={false}
                fullWidth={true}
                maxWidth="md"
            >
                <PermissionsDetail
                    countryPermission={country}
                />
            </Modal>
        </Layout>
    )
}

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
    await store.dispatch(startLoadCountryPermissions());
    await store.dispatch(startLoadAdministrableLogo());
    await store.dispatch(startLoadCurrencies());
    return {
        revalidate: 3600
    }
});

export default CountryPermissions;