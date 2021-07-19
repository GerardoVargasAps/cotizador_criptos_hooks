import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled'
import Error from './Error'
import useMoneda from '../hooks/useMoneda'
import useCriptomoneda from '../hooks/useCriptomoneda'
import Axios from 'axios';


const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: white;
    transition: background-color 3s ease;

    &:hover{
        background-color: #326ac0;
        cursor: pointer;
    }
`

const Formulario = ({guardarMoneda, guardarCriptomoneda}) => {

    //State del listado de criptomonedas
    const [listaCripto, guardarCriptomonedas] = useState([])
    const [error, guardarError] = useState(false)


    //Arreglo de Monedas
    const MONEDAS = [
        {codigo: 'MXN', nombre: 'Peso Mexicano'},
        {codigo: 'USD', nombre: 'Dolar de Estados Unidos'},
        {codigo: 'EUR', nombre: 'Euro'},
        {codigo: 'GBP', nombre: 'Libra Esterlina'}
    ]

    // Utilizar useMoneda
    const [moneda, SelectMonedas] = useMoneda('Elije tu Moneda', '', MONEDAS)

    //Utilizar useCryptomoneda
    const [cripto, SelectCripto] = useCriptomoneda('Elije tu Criptomoneda', '', listaCripto)

    //Ejecutar llamado a la API
    useEffect(() => {
        const consultarAPI = async () => {
            const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`
            const resultado = await Axios.get(url)

            guardarCriptomonedas(resultado.data.Data)
        }
        consultarAPI()
    }, [])

    //cuando el usuario hace submit
    const cotizarMoneda = e => {
        e.preventDefault()

        //validar su ambos campos estan llenos
        if(moneda === '' || cripto === '') {
            guardarError(true)
            return
        }

        //pasar los datos a otro componente
        guardarError(false)
        guardarMoneda(moneda)
        guardarCriptomoneda(cripto)
    }

    return ( 
        <form
            onSubmit={cotizarMoneda}
        >

            {error ? <Error mensaje="Todos los campos son obligatorios!" /> : null}

            <SelectMonedas/>

            <SelectCripto/>

            <Boton
                type="submit"
                value="Calcular"
            />
        </form>
     );
}
 
export default Formulario;