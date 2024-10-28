import React from "react";
import { BsDisplay } from "react-icons/bs";

interface TituloTabProps {
    title: string;
}

const TituloTab: React.FC<TituloTabProps> = ({ title }) => {

    const styleContainer = {
        marginTop: '2rem',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
    };

    const styleImg = {
        with: '45px',
        height: '45px'
    };

    const styleTitulo = {
        color: '000',
        fontSize: '30px',
        fontWeight: '400',
        marginBottom: '0px',
    };

    return (
        <div style={styleContainer}>
            <img src={'/logo-unp-gris.png'} alt="Icon" style={styleImg} />
            <p style={styleTitulo}>{title}</p>
        </div>
    );

};

export default TituloTab;