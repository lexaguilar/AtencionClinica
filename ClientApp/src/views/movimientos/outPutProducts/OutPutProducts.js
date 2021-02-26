import React from 'react';
import BlockHeader from '../../../components/shared/BlockHeader';
import Title from '../../../components/shared/Title';
import { dataAccess, resources } from '../../../data/app';
import useAuthorization from '../../../hooks/useAuthorization';

const OutPutProducts = () => {

    const { isAuthorization, Unauthorized } = useAuthorization([resources.movimientos, dataAccess.access ]);

    const title = "Salida de inventario";

    return !isAuthorization 
    ?  <Unauthorized />  
    : (
        <div className="container">
            <Title title={title}/>
            <BlockHeader title={title}/>     
            
        </div>
    );
}

export default OutPutProducts;
