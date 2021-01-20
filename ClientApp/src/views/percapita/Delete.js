import React, { useState } from 'react';
import { Popup, FileUploader, Button } from 'devextreme-react';
import DateBox from 'devextreme-react/date-box';

import notify from 'devextreme/ui/notify';
import http from '../../utils/http';
import { getMonthName } from '../../utils/common';

const Delete = props => {

    console.log(props);

    const { month, year } = props;

    const [ open, setOpen ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const showPopup = () => setOpen(true); 


    const hideInfo = ({ reload }) => {

        setOpen(false)

        let { onDelete } = props;

        if (reload) onDelete();
        
    }

    const deletePercapita = (params) => {

        setLoading(true);
        
        http(`percapitas/delete/year/${year}/month/${month}`).asGet()
        .then(resp => {
            setLoading(false);
            hideInfo({reload : true});
            notify('Registro eliminado correctamente')
        }).catch(err => {
            setLoading(false);
            notify(err,'error');
        });
    }

    return (
        <div className="">
            <Button
                width={180}
                text="Eliminar percapita"
                type="danger"
                icon="remove"
                stylingMode="outlined"
                onClick={showPopup}
            />
            <Popup
                width={450}
                height={200}
                title="Confirmar"
                onHiding={hideInfo}
                visible={open}
            >
               <p>Esta seguro de eliminar el percapita del mes {getMonthName(month)}/{year}</p>
               <Button
                    width={180}
                    text= {loading ? 'Eliminando...' : "Eliminar percapita"}
                    disabled={loading}
                    type="danger"
                    icon="remove"
                    stylingMode="contained"
                    onClick={deletePercapita}
                />
            </Popup>
        </div>
    );
}

export default Delete;