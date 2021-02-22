import React, { useState } from 'react';
import { Popup, FileUploader, Button } from 'devextreme-react';
import Form, {
    SimpleItem,
    GroupItem
} from 'devextreme-react/form';
import notify from 'devextreme/ui/notify';
import http, { path } from '../../utils/http';
import uri from '../../utils/uri';
import { RequiredRule } from 'devextreme-react/data-grid';
import ButtonForm from '../../components/buttons/ButtonForm';

const Nuevo = (props) => {
   
    const [visible, setVisible] = useState(false);
    const [saving, setSaving] = useState(false);

    let formElement = React.createRef();

    const showPopup = (e) => {
        setVisible(true);
    }

    const hideInfo = ({ cancel }) => {
        setVisible(false);

        if (cancel) {

            let { onSave } = props;
            onSave();

        }
    }

    const onClick = () => {

        if(formElement.current.instance._files.length){

            let file = formElement.current.instance._files[0].value;
            setSaving(true);

            http(uri.fileRates.insert).asFile(file).then(r => {

                notify(`Su archivo ${r.name} agregado correctamente`);
                setSaving(false);
                hideInfo({ cancel: true });

            }).catch(err =>{

                setSaving(false);
                notify(err, 'error');

            });
        }else
            notify('Debe de seleccionar un archivo de excel','warning')

    }

    const textSaving = "Subir archivo";

    return (
        <div id="container">
            <Button
                width={180}
                text="Subir desde excel"
                type="success"                    
                icon="exportxlsx"
                stylingMode="outlined"
                onClick={showPopup}
            />
            <Popup
                width={400}
                height={500}
                title="Subir archivo"
                onHiding={hideInfo}
                visible={visible}
            >
                <form id="form" method="post" encType="multipart/form-data">
                    <img width={350} src={require('../../svg/formatRates.png')}></img>
                    <FileUploader ref={formElement}
                        selectButtonText="Seleccione un archivo"
                        labelText=""
                        allowedFileExtensions={['.xls', '.xlsx']} uploadMode="useForm" />
                    <ButtonForm saving={saving} textSaving={textSaving} onClick={onClick}/>
                </form>
            </Popup>
        </div>
    )
    
}

export default Nuevo;