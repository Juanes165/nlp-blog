import React from "react";
import moment from "moment";

import { MathJax, MathJaxContext } from "util/better-react-mathjax";
import { mathjaxConfig } from "util/mathjax-config";

const PostDetail = ({ post }) => {

    const getContentFragment = (obj, index) => {
        let modifiedText = obj.text;
        if (obj.text) {
            if (obj.bold) {
                modifiedText = (<b key={index}>{modifiedText}</b>);
            }

            if (obj.italic) {
                modifiedText = (<em key={index}>{modifiedText}</em>);
            }

            if (obj.underline) {
                modifiedText = (<u key={index}>{modifiedText}</u>);
            }

            if (obj.code) {
                modifiedText = (<code className="bg-gray-100 p-2 rounded-lg mb-8" key={index}>{modifiedText}</code>);
            }
            //return (<MathJax>{modifiedText}</MathJax>);
            return modifiedText;
        };

        switch (obj.type) {

            // Headers
            case 'heading-one':
                return <h1 key={index} className="text-3xl font-semibold mb-4">{obj.children.map((item, i) => <React.Fragment key={i}>{getContentFragment(item, i)}</React.Fragment>)}</h1>;
            case 'heading-two':
                return <h2 key={index} className="text-2xl font-semibold mb-4">{obj.children.map((item, i) => <React.Fragment key={i}>{getContentFragment(item, i)}</React.Fragment>)}</h2>;
            case 'heading-three':
                return <h3 key={index} className="text-xl font-semibold mb-4">{obj.children.map((item, i) => <React.Fragment key={i}>{getContentFragment(item, i)}</React.Fragment>)}</h3>;
            case 'heading-four':
                return <h4 key={index} className="text-lg font-semibold mb-4">{obj.children.map((item, i) => <React.Fragment key={i}>{getContentFragment(item, i)}</React.Fragment>)}</h4>;
            case 'heading-five':
                return <h5 key={index} className="text-md font-semibold mb-4">{obj.children.map((item, i) => <React.Fragment key={i}>{getContentFragment(item, i)}</React.Fragment>)}</h5>;
            case 'heading-six':
                return <h6 key={index} className="text-md font-semibold mb-4">{obj.children.map((item, i) => <React.Fragment key={i}>{getContentFragment(item, i)}</React.Fragment>)}</h6>;

            // Parrafo
            case 'paragraph':
                return <p key={index} className="mb-8">{obj.children.map((item, i) => <React.Fragment key={i}>{getContentFragment(item, i)}</React.Fragment>)}</p>;
            case 'link':
                return <a key={index} className="text-pink-500 hover:underline" href={obj.href} target="_blank">{obj.children.map((item, i) => <React.Fragment key={i}>{getContentFragment(item, i)}</React.Fragment>)}</a>;

            // Bloque de codigo
            case 'code-block':
                return <pre key={index} className="bg-gray-200 p-4 rounded-lg mb-8 whitespace-pre-wrap">{obj.children.map((item, i) => <React.Fragment key={i}>{getContentFragment(item, i)}</React.Fragment>)}</pre>;

            // Cita
            case 'block-quote':
                return <blockquote key={index} className="border-l-4 border-pink-500 pl-4 mb-8">{obj.children.map((item, i) => <React.Fragment key={i}>{getContentFragment(item, i)}</React.Fragment>)}</blockquote>;

            // Listas con puntos y numeros
            case 'bulleted-list':
                return <ul key={index} className="list-disc list-outside mb-8">{obj.children.map((item, i) => <React.Fragment key={i}>{getContentFragment(item, i)}</React.Fragment>)}</ul>;
            case 'numbered-list':
                return <ol key={index} className="list-decimal list-outside mb-8">{obj.children.map((item, i) => <React.Fragment key={i}>{getContentFragment(item, i)}</React.Fragment>)}</ol>;

            // Hijos de las listas (para renderizar los items de cada lista)
            case 'list-item':
                return <li key={index} className="ml-4 mb-4">{obj.children.map((item, i) => <React.Fragment key={i}>{getContentFragment(item, i)}</React.Fragment>)}</li>;
            case 'list-item-child':
                return obj.children.map((item, i) => <React.Fragment key={i}>{getContentFragment(item, i)}</React.Fragment>);

            // Tablas
            case 'table':
                return (
                    <div className="overflow-x-auto mb-8" key={index}>
                        <table key={index} className="table-auto mb-8 w-full">
                            {obj.children.map((item, i) => <React.Fragment key={i}>{getContentFragment(item, i)}</React.Fragment>)}
                        </table>
                    </div>
                );
            case 'table_body':
                return (
                    <tbody key={index}>
                        {obj.children.map((item, i) => <React.Fragment key={i}>{getContentFragment(item, i)}</React.Fragment>)}
                    </tbody>
                );
            case 'table_row':
                return (
                    <tr key={index}>
                        {obj.children.map((item, i) => <React.Fragment key={i}>{getContentFragment(item, i)}</React.Fragment>)}
                    </tr>
                );
            case 'table_cell':
                return (
                    <td key={index} className="border border-gray-400 p-2">
                        {obj.children.map((item, i) => <React.Fragment key={i}>{getContentFragment(item, i)}</React.Fragment>)}
                    </td>
                );
            
            // Imagenes
            case 'image':
                return (
                    <img
                        key={index}
                        alt=""
                        height={obj.height}
                        width={obj.width}
                        src={obj.src}
                        className="h-full w-full rounded-lg mb-8"
                    />
                );

            // Iframe
            case 'iframe':
                return (
                    <iframe
                        key={index}
                        height={obj.height}
                        width={obj.width}
                        src={obj.url}
                        className="rounded-lg mb-8"
                    />
                );

            // Classname personalizados
            case 'class':
                return (
                    <div key={index} className={obj.className}>
                        {obj.children.map((item, i) => <React.Fragment key={i}>{getContentFragment(item, i)}</React.Fragment>)}
                    </div>
                );
        }
    }
    
    return (
        <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-8 mb-8">
            <div className="relative overflow-hidden shadow-md mb-6">
                <img
                    src={post.featuredImage.url}
                    alt=""
                    className="object-top h-full w-full rounded-t-lg"
                />
            </div>
            <div className="px-4 lg:px-0">
                <div className="flex items-center mb-8 w-full">
                    <div className="flex items-center mb-4 lg:mb-0 w-full lg:w-auto mr-8">
                        <img
                            alt={post.author.name}
                            height="30px"
                            width="30px"
                            className="align-middle rounded-full"
                            src={post.author.photo.url}
                        />
                        <p className="inline align-middle text-gray-700 ml-2 text-lg">{post.author.name}</p>
                    </div>
                    <div className="font-medium text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>
                            {moment(post.createdAt).locale('en').format('MMM DD, YYYY')}
                        </span>
                    </div>
                </div>
                <h1 className="mb-8 text-4xl font-semibold">
                    {post.title}
                </h1>
                {/* {console.log(post.content.raw)} */}
                <MathJaxContext version={3} config={mathjaxConfig}>
                    <MathJax className="overflow-auto">
                        {post.content.raw.children.map((obj, index) => {

                            return getContentFragment(obj, index);
                        })}
                    </MathJax>
                </MathJaxContext>
            </div>
        </div>
    )
}

export default PostDetail;
