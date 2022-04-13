import { Chip, Grid } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { startLoadAdministrableLogo } from "../../../src/actions/administrableActions"
import Layout from "../../../src/components/Layouts"
import { BannerImage } from "../../../src/components/ui/bannerImage"
import { wrapper } from "../../../src/store"

const columns = [
    { field: 'id', headerName: 'ID', width: 200 },
    { field: 'fullname', headerName: 'Nombre Completo', width: 300 },

    {
        field: 'paid', headerName: 'Estatus', description: 'Muestra el estatus de la orden', width: 200,
        renderCell: (params) => {
            return (
                params.row.paid
                    ? <Chip color="success" label="Pagada" variant="outlined" />
                    : <Chip color="error" label="Pendiente" variant="outlined" />
            )
        }
    }
]

const rows = [
    { id:"622cde80c01e577a18e6bc5e", fullname: "Lorem, ipsum dolor.", paid: false },
    { id:"622cde80c01e577a18e6bc5e", fullname: "Lorem, ipsum dolor.", paid: true },
    { id:"622cde80c01e577a18e6bc5e", fullname: "Lorem, ipsum dolor.", paid: false },
    { id:"622cde80c01e577a18e6bc5e", fullname: "Lorem, ipsum dolor.", paid: true },
]

const Ordenes = () => {

    return (
        <Layout>
            <BannerImage
                title="Mis Pedidos"
            />
            <section className="container mx-auto mb-40 mt-20">
                <Grid container>
                    <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                        />
                    </Grid>
                </Grid>
            </section>
        </Layout>

    )
}

export const getServerSideProps = wrapper.getServerSideProps((store) =>
    async () => {
        await store.dispatch(startLoadAdministrableLogo());
    })

export default Ordenes