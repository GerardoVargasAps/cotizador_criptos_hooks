import React from 'react';
import styled from '@emotion/styled'

const ResultadoDiv = styled.div`
    color: white;
    font-family: Arial, Helvetica, sans-serif;
`
const Info = styled.p`
    font-size: 18px;

    span{
        font-weight: bold;
    }
`
const Precio = styled.p`
    font-size: 30px;
    
    span{
        font-weight: bold;
    }
`


const Cotizacion = ({resultado}) => {

    if(Object.keys(resultado).length === 0) return null
    console.log(resultado)

    return ( 
        <ResultadoDiv>
            <Precio>El precio actual es: <span>{resultado.PRICE}</span></Precio>
            <Info>Precio más Alto del día: <span>{resultado.HIGHDAY}</span></Info>
            <Info>Precio más Bajo del día: <span>{resultado.LOWDAY}</span></Info>
            <Info>Variación últimas 24 hrs: <span>{resultado.CHANGEPCT24HOUR}</span></Info>
            <Info>Última actualización: <span>{resultado.LASTUPDATE}</span></Info>

        </ResultadoDiv>
    );
}
 
export default Cotizacion;