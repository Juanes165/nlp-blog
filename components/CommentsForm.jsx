import React, { useRef, useState, useEffect } from "react";

import { submitComment } from "../services/";

const CommentsForm = ({ slug }) => {
    const [error, setError] = useState(false);
    const [localStorage, setLocalStorage] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const commentElement = useRef();
    const nameElement = useRef();
    const emailElement = useRef();
    const storeDataElement = useRef();

    useEffect(() => {
        nameElement.current.value = window.localStorage.getItem("name");
        emailElement.current.value = window.localStorage.getItem("email");
    }, []);

    const handleCommentSubmision = () => {
        setError(false);

        const { value: comment } = commentElement.current;
        const { value: name } = nameElement.current;
        const { value: email } = emailElement.current;
        const { checked: storeData } = storeDataElement.current;

        if(!comment || !name || !email) {
            setError(true);
            return;
        }

        const commentObj = { name, email, comment, slug };

        if(storeData) {
            window.localStorage.setItem("name", name);
            window.localStorage.setItem("email", email);
        } else {
            window.localStorage.removeItem("name", name);
            window.localStorage.removeItem("email", email);
        }

        submitComment(commentObj)
            .then(() => {
                setShowSuccessMessage(true);
                setTimeout(() => {
                    setShowSuccessMessage(false);
                }, 3000);
            })
    }

    return (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
            <h3 className="text-xl mb-8 font-semibold border-b pb-4">Deja un comentario</h3>
            <div className="grid grid-cols-1 gap-4 mb-4">
                <textarea
                    ref={commentElement}
                    className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
                    placeholder="Comentario"
                    name="comment"

                />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                <input
                    type="text"
                    ref={nameElement}
                    className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
                    placeholder="Nombre"
                    name="name"
                />
                <input
                    type="text"
                    ref={emailElement}
                    className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
                    placeholder="Correo"
                    name="email"
                />
            </div>
            <div className="grid grid-cols-1 gap-4 mb-4">
                <div>
                    <input ref={storeDataElement} type="checkbox" id="storeData" name="storeData" value="true"/>
                    <label className="text-gray-500 cursor-pointer ml-2" htmlFor="storeData">Guardar mis datos</label>
                </div>
            </div>
            {error && <p className="text-xs text-red-500">Completa todos los campos</p>}
            <div className="mt-8">
                <button 
                    type="button" 
                    onClick={handleCommentSubmision}
                    className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer"
                >
                    Comentar
                </button>
                {showSuccessMessage && <span className="text-xl float-right font-semibold mt-3 text-green-500">¡Tu comentario se ha enviado!</span>}
            </div>
        </div>
    )
}

export default CommentsForm;
