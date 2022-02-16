import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Footer from "../../src/components/Layouts/Footer";
import Slider from "../../src/components/Layouts/Slider";
import Link from "next/link";
import AsideBar from "../../src/components/categories/AsideBar";
import Layout from "../../src/components/Layouts";

const Category = () => {
    const products = [
        { id: "1", name: "hola mundo", description: "some description some description some description some description ", price: "800", img: "http://animation.com.mx/img/productos/P%C3%B3steres.png", available: "9", discount: "20" },
        { id: "2", name: "hola mundo", description: "some description some description some description some description ", price: "800", img: "http://animation.com.mx/img/productos/P%C3%B3steres.png", available: "9", discount: "20" },
        { id: "3", name: "hola mundo", description: "some description some description some description some description ", price: "800", img: "http://animation.com.mx/img/productos/P%C3%B3steres.png", available: "9", discount: "20" },
        { id: "4", name: "hola mundo", description: "some description some description some description some description ", price: "800", img: "http://animation.com.mx/img/productos/P%C3%B3steres.png", available: "9", discount: "20" },
        { id: "5", name: "hola mundo", description: "some description some description some description some description ", price: "800", img: "http://animation.com.mx/img/productos/P%C3%B3steres.png", available: "9", discount: "20" },
        { id: "6", name: "hola mundo", description: "some description some description some description some description ", price: "800", img: "http://animation.com.mx/img/productos/P%C3%B3steres.png", available: "9", discount: "20" },
        { id: "7", name: "hola mundo", description: "some description some description some description some description ", price: "800", img: "http://animation.com.mx/img/productos/P%C3%B3steres.png", available: "9", discount: "20" },
        { id: "8", name: "hola mundo", description: "some description some description some description some description ", price: "800", img: "http://animation.com.mx/img/productos/P%C3%B3steres.png", available: "9", discount: "20" },
        { id: "9", name: "hola mundo", description: "some description some description some description some description ", price: "800", img: "http://animation.com.mx/img/productos/P%C3%B3steres.png", available: "9", discount: "20" },
    ];
    const categories = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    return (
        <Layout>
            <div className="h-96 overflow-hidden hidden md:block">
                <Slider />
            </div>
            <section className="container mx-auto">
                <h1 className="ml-4 md:ml-0 font-bold text-lg md:text-2xl my-2">Hola mundo</h1>
                <div className="my-3 w-full md:w-1/3">
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label"
                                color="warning"
                            >Ordenar Por
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Ordenar Por"
                                color="warning"
                            >
                                <MenuItem value={10}>Precio</MenuItem>
                                <MenuItem value={20}>Fecha</MenuItem>
                                <MenuItem value={30}>Tamaño</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5">
                    <div class="h-screen bg-gray-100 hidden md:block p-4 border-gray-50">
                        <AsideBar />
                    </div>
                    <div className="col-span-4">
                        {
                            products.map(pro => (
                                <Link href="/products/12">
                                    <article className="border-2 border-gray-100 md:border-gray-300 mb-2 px-2 mx-0 md:mx-2 lg:mx8 md:px-8 py-4 rounded cursor-pointer">
                                        <div className="flex flex-row items-center md:mr-2">
                                            <div>
                                                <img src={pro.img} alt="" className="w-40" />
                                            </div>
                                            <div>
                                                <h3 className="text-md md:text-2xl font-bold">{pro.name}</h3>
                                                <p className="text-sm">{pro.description}</p>
                                                <p className="font-semibold">${pro.discount}</p>
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </section>
        </Layout>
    )
}
export default Category;