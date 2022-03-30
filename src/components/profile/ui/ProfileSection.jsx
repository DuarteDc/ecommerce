import { useState } from "react";

import FormProfile from "../FormProfile";

const ProfileSection = ({ user }) => {

    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="col-span-1 md:col-span-2 relative overflow-hidden">
            {
                isEditing ? (
                    <FormProfile {...user} setIsEditing={setIsEditing} className="animate__animated animate__fadeIn" />
                ) : (
                    <div className="border-2 border-gray-200 p-10 relative animate__animated animate__fadeIn">
                        <div className="my-4">
                            <p className="text-lg">Nombre completo:</p>
                            <p className="text-gray-500">{user.fullname}</p>
                        </div>
                        <div className="my-4">
                            <p className="text-lg">Correo electronico:</p>
                            <p className="text-gray-500">{user.email}</p>
                        </div>
                        <div className="my-4">
                            <p className="text-lg">Telefono:</p>
                            <p className="text-gray-500">{user.phone.phone_number}</p>
                        </div>
                        <p
                            className="absolute bottom-4 right-4 cursor-pointer"
                            onClick={() => setIsEditing(true)}
                        >Editar</p>
                    </div>
                )
            }
        </div>
    )
}

export default ProfileSection