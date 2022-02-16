import { useEffect, useState } from "react";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import SettingsIcon from '@mui/icons-material/Settings';
import Layout from "../../src/components/Layouts";

const Profile = () => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const users = localStorage.getItem('user');
        setUser(JSON.parse(users))
    }, []);
    console.log(user);
    return (
        <Layout>
            <section className="container mx-auto mt-10 bg-gray-200 p-10">
                <div className="grid grid-cols-1 md:grid-cols-3">
                    <div className="w-full flex justify-center">
                        <img src="https://media.istockphoto.com/photos/gingerbread-man-3d-rendering-isolated-on-white-background-picture-id1250677513?k=20&m=1250677513&s=612x612&w=0&h=KVAes7pQUH0XRDhRGqXy0na2tyaTWbCCpZ8U1r1EpNw=" alt="" className="w-full md:w-2/3 rounded-full" />
                    </div>
                    <div className="col-span-1 md:col-span-2 relative">
                        <span className="float-right">
                            <SettingsIcon className="cursor-pointer" />
                        </span>
                        <div>
                            <p className="text-2xl uppercase">Lorem ipsum dolor sit amet.</p>
                            <span className="flex mt-4 items-center">
                                <EmailIcon />
                                <p className="text-xl mx-2">algo@gmail.com</p>
                            </span>
                            <span className="flex mt-4 items-center">
                                <LocalPhoneIcon />
                                <p className="text-xl mx-2">8222302939</p>
                            </span>
                            <span className="flex mt-4 items-center">
                                <LocationOnIcon />
                                <p className="text-lg mx-2">aqui o all #121</p>
                            </span>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="text-center text-2xl mx-10 uppercase font-bold">Compras realizadas</h2>
                    <table class="w-full">
                        <thead>
                            <tr>
                                <th>Song</th>
                                <th>Artist</th>
                                <th>Year</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                                <td>Malcolm Lockyer</td>
                                <td>1961</td>
                            </tr>
                            <tr>
                                <td>Witchy Woman</td>
                                <td>The Eagles</td>
                                <td>1972</td>
                            </tr>
                            <tr>
                                <td>Shining Star</td>
                                <td>Earth, Wind, and Fire</td>
                                <td>1975</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </Layout>
    )
}

export default Profile