import React, {Fragment, useState} from 'react';

const useMoneda = () => {

    //state de nuestro custom hook
    const [state, actualizarState] = useState('')

    const Seleccionar = () => (
        <Fragment>
            <label>Moneda</label>
            <select>
                <option value="MXN">Peso Mexicano</option>
            </select>
        </Fragment>
    )


    //retornar Stare, interfaz y fn que modicia el state
    return [state, Seleccionar, actualizarState];

}

export default useMoneda