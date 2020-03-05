import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled'
import Error from "./Error";

import useMoneda from '../hooks/useMoneda'
import useCriptomoneda from "../hooks/useCriptomoneda"

import axios from 'axios'

const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: background-color 0.3s ease;
  outline:none;
  &:hover {
    background-color: #326ac0;
    cursor: pointer;
  }
`;

const Formulario = () => {

  //state del listado de criptomonedas
  const[listacripto, guardarCriptomonedas] = useState([

  ])

  const[error, actualizarError] = useState(false)

    const MONEDAS = [
      {codigo: 'USD', nombre: 'Dolar de Estados Unidos'},
      {codigo: 'MXN', nombre: 'Peso Mexicano'},
      {codigo: 'EUR', nombre: 'Euro'},
      {codigo: 'GBP', nombre: 'Libra Esterlina'}
    ]


    //utilizar useMoneda
    const [Moneda, SelectMonedas] = useMoneda('Elige tu moneda', '', MONEDAS)


    //utilizar useCriptomonedas
    const[criptomoneda, SelectCripto] = useCriptomoneda('Elige tu Criptomoneda', '', listacripto)


    //ejecutar llamado a la API
    useEffect(() => {
      const consultarAPI = async () => {
        const url =
          "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD&api_key=3edc46f857883f5b0e9d225a9cc7c7fe0d6fd93133b3b3a333b684ef49ec499c";
          const resultado = await axios.get(url)
            //state del listado de criptomonedas
            guardarCriptomonedas(resultado.data.Data);
      }

      consultarAPI()
    }, [])




      //cuando el usuario hace submit
      const cotizarMoneda = e => {
        e.preventDefault();
        //validar si ambos campos estan llenos
        if(Moneda === '' || criptomoneda === ''){
          actualizarError(true)
          return
        }

        //caso contraio pasar los datos al  componente principal
        actualizarError(false)
      }


    return (    
      <form
        onSubmit = {cotizarMoneda}
      >

        {error ? <Error mensaje="Todos los campos son obligatorios"/> : null}

        <SelectCripto />
        <SelectMonedas />
        <Boton type="submit" value="Calcular" />
      </form>
    );
}
 
export default Formulario;