import React from 'react'

function Cliente({cliente}) {
    const {nombre, empresa, email, telefono, id} = cliente;
    return (
        <tr>
            <td className='p-6'>
                {cliente.nombre}
            </td>
        </tr>
    )
}

export default Cliente