import React, { useRef, useState } from 'react';
import { Popup, FileUploader, Button } from 'devextreme-react';

import notify from 'devextreme/ui/notify';
import http from '../../utils/http';

const FromExcel = props => {

    let formElement = useRef();

    const [ open, setOpen ] = useState(false);
    const [ loading, setLoading ] = useState(false);

   
    const showPopup = () => {     
        formElement.current.instance.reset();   
        setOpen(true); 

    } 

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

            http(`products/post/file`).asFile(file).then(r => {

                notify(`Su archivo ${r.name} se ha agregado correctamente`);
                hideInfo({ reload: true });

            }).catch(err =>{
                notify(err, 'error');
            }).finally(() => {
                setLoading(false);
            });
        }        

    }

    return (
        <div className="">
            <Button
                width={180}
                text="Subir desde excel"
                type="success"
                icon="xlsxfile"
                stylingMode="contained"
                onClick={showPopup}
            />
            <Popup
                width={500}
                height={450}
                title="Subir archivo"
                onHiding={hideInfo}
                visible={open}
            >
                <form id="form" method="post" encType="multipart/form-data">
                    <p>El archivo debe contener el siguiente formato</p>
                    <img width={480} src={require('../../svg/producto-format.png')}></img>
                    <FileUploader 
                        ref={formElement}
                        selectButtonText="Seleccione un archivo"
                        labelText=""
                        allowedFileExtensions={['.xls', '.xlsx']} uploadMode="useForm" 
                    />                 
                        
                    <Button disabled={loading} className="button" text={loading? 'Subiendo...' : 'Subir archivo'} type="success" onClick={onClick} />
                </form>
            </Popup>
        </div>
    );
}

export default FromExcel;