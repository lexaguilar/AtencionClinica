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

const Nuevo = (props) => {
   
    const [visible, setVisible] = useState(false);

    let formElement = React.createRef();

    const showPopup = (e) => {
        setVisible(true);
    }

    const hideInfo = ({ cancel }) => {
        setVisible(true);

        if (cancel) {

            let { onSave } = props;
            onSave();

        }
    }

    const onClick = () => {
        let file = formElement.current.instance._files[0].value;
        http(uri.fileRates.insert).asFile(file).then(r => {
            notify(`Su archivo ${r.name} agregado correctamente`);
            hideInfo({ cancel: true })
        });

    }

        return (
            <div id="container">
                <Button
                    width={180}
                    text="Subir desde excel"
                    type="normal"
                    icon="exportxlsx"
                    stylingMode="contained"
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
                        <Button className="button" text="Subir archivo" type="success" onClick={onClick} />
                    </form>
                </Popup>
            </div>
        )
    
}

export default Nuevo;