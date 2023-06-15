import React from "react";
import Image from "next/image";

const Author = ({ author }) => {
    return (
        <div className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-20">
            <div className="absolute left-0 right-0 -top-14 flex justify-center">
                <Image
                    alt={author.name}
                    unoptimized
                    height={100}
                    width={100}
                    className="align-middle rounded-full"
                    src={author.photo.url}
                />
            </div>
            <h3 className="text-white my-4 text-2xl font-bold">{author.fullName}</h3>
            <p className="text-white text-lg mb-6">{author.bio}</p>
            <span className="text-white text-lg font-semibold">Contacto: </span>
            <span className="text-white text-lg">{author.email}</span>
        </div>
    )
}

export default Author;
