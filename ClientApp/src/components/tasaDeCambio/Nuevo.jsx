import React from 'react';
import { Popup, FileUploader, Button } from 'devextreme-react';
import Form, {
    SimpleItem,
    GroupItem
} from 'devextreme-react/form';
import notify from 'devextreme/ui/notify';
import http, { path } from '../../utils/http';
import uri from '../../utils/uri';
import { RequiredRule } from 'devextreme-react/data-grid';

class Nuevo extends React.Component {
    constructor(props) {
        super(props);
        this.showPopup = this.showPopup.bind(this);
        this.hideInfo = this.hideInfo.bind(this);
        this.onClick = this.onClick.bind(this);
        this.formElement = React.createRef();
        this.state = {
            popupVisible: false
        };
    }

    showPopup(e) {
        this.setState({
            popupVisible: true
        });
    }

    hideInfo({ cancel }) {
        this.setState({
            popupVisible: false
        });

        if (cancel) {

            let { onSave } = this.props;
            onSave();

        }
    }

    onClick() {
        let file = this.formElement.current.instance._files[0].value;
        http(uri.file.insert).asFile(file).then(r => {
            notify(`Su archivo ${r.name} agregado correctamente`);
            this.hideInfo({ cancel: true })
        });

    }

    render() {

        return (
            <div id="container">
                <Button
                    width={180}
                    text="Subir desde excel"
                    type="normal"
                    icon="exportxlsx"
                    stylingMode="contained"
                    onClick={this.showPopup}
                />
                <Popup
                    width={400}
                    height={500}
                    title="Subir archivo"
                    onHiding={this.hideInfo}
                    visible={this.state.popupVisible}
                >
                    <form id="form" method="post" encType="multipart/form-data">
                        <img width={350} src={require('../../svg/formatxlx.png')}></img>
                        <FileUploader ref={this.formElement}
                            selectButtonText="Seleccione un archivo"
                            labelText=""
                            allowedFileExtensions={['.xls', '.xlsx']} uploadMode="useForm" />
                        <Button className="button" text="Subir archivo" type="success" onClick={this.onClick} />
                    </form>
                </Popup>
            </div>
        )
    }
}

export default Nuevo;