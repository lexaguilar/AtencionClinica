import React, { useState } from 'react';
import { Popup, FileUploader, Button } from 'devextreme-react';
import DateBox from 'devextreme-react/date-box';

import notify from 'devextreme/ui/notify';
import http from '../../utils/http';

const Nuevo = props => {

    let formElement = React.createRef();

    const [ open, setOpen ] = useState(false);
    const [ loading, setLoading ] = useState(false);

    const [ date, setDate ] = useState(new Date());

    const onChange = e => {
        setDate(e.value)
    }

    const showPopup = () => setOpen(true); 

    const hideInfo = ({ reload }) => {

        setOpen(false)

        if (reload) {

            let { onSave } = props;
            onSave();

        }
    }

    const onClick = () => {

        let files = formElement.current.instance._files;

        if(files.length == 0){
            notify(`Seleccione un archivo`, 'error');
        }else{
            setLoading(true);
            let file = files[0].value;

            http(`percapitas/post/file/year/${date.getFullYear()}/month/${date.getMonth() + 1}`).asFile(file).then(r => {

                notify(`Su archivo ${r.name} se ha agregado correctamente`);
                setLoading(false);
                hideInfo({ reload: true });

            }).catch(err =>{
                setLoading(false);
                notify(err, 'error');
            });
        }        

    }

    return (
        <div className="container">
            <Button
                width={180}
                text="Subir desde excel"
                type="normal"
                icon="exportxlsx"
                stylingMode="contained"
                onClick={showPopup}
            />
            <Popup
                width={500}
                height={500}
                title="Subir archivo"
                onHiding={hideInfo}
                visible={open}
            >
                <form id="form" method="post" encType="multipart/form-data">
                    <img width={480} src={require('../../svg/formatxlx.png')}></img>
                    <FileUploader ref={formElement}
                        selectButtonText="Seleccione un archivo"
                        labelText=""
                        allowedFileExtensions={['.xls', '.xlsx']} uploadMode="useForm" 
                    />
                    <DateBox defaultValue={date}
                        placeholder="Year: 2020"
                        showClearButton={true}
                        useMaskBehavior={true}
                        type="date"
                        onValueChanged={onChange}
                        displayFormat={"MM/yyyy"} />
                        
                    <Button disabled={loading} className="button" text={loading? 'Subiendo' : 'Subir archivo'} type="success" onClick={onClick} />
                </form>
            </Popup>
        </div>
    );
}

export default Nuevo;