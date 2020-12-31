import React from 'react';
import { connect } from 'react-redux';
import Form, {
    ButtonItem,
    SimpleItem,
    GroupItem,
    Label,
    EmailRule,
    RequiredRule,
    AsyncRule,
    
} from 'devextreme-react/form';
import 'devextreme-react/text-area';
import { setAppInfo } from '../../store/app/appActions';
import notify from 'devextreme/ui/notify';
import { createStore, createCustomStore } from '../../utils/proxy';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import uri from '../../utils/uri';
import CuentasConfig from './cuentasConfig';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onValueChanged = this.onValueChanged.bind(this);
        this.validationCallback = this.validationCallback.bind(this);
        this.state = {
            defaultVisible: false,
            saving: false,
          };
    }

    handleSubmit(e) {

        e.preventDefault();

        let { setAppInfo, app } = this.props;

        this.setState({ saving: true });

        setAppInfo(app)
        .then(x => {
            this.setState({ saving: false });
            notify({ message: 'Sus cambios han sido guardados correctamente'}, 'success', 3000)
        })
        .catch(err => {
            this.setState({ saving: false });
            notify({ message: err }, 'error', 3000)
        });

    }

    onValueChanged(e){

        this.setState({
            defaultVisible : !e.value
        })

    }

    validationCallback(params) {
        let { app } = this.props;
        return new Promise(resolve => {

            let result = app.gererarProcesosContables && params.value > 0;
            resolve(result);

        })

    }

    render() {

        let { app } = this.props;

        let render = x => {
            return  <SimpleItem dataField={x.name} id={x.name} editorType="dxSelectBox"
                        editorOptions={{
                            disabled : this.state.defaultVisible,
                            searchEnabled: true,
                            dataSource: createCustomStore(uri.cuentasLevels(4))(),
                            valueExpr: "id",
                            displayExpr: item => item ? `${item.numero} - ${item.descripcion}` : '',
                            showClearButton:true
                        }}>
                        <Label text={x.caption} />
                        <AsyncRule
                            message="Este campo es requerido para proceso contable"
                            validationCallback={this.validationCallback} />
                    </SimpleItem>
        }

        const selectsVta = [
                 {name : 'vtaInventarioCuentaId',caption: 'Cuenta Inventario'}
                ,{name : 'vtaCostoVentaCuentaId', caption: 'Cuenta Costo Vta'}
                ,{name : 'vtaIvaPorPagarCuentaId', caption: 'Iva Por Pagar'}
                ,{name : 'vtaVentaCuentaId', caption: 'Cuenta de venta'}
                ,{name : 'vtaCajaGeneralCuentaId', caption: 'Cuenta Caja'}
                ,{name : 'vtaClienteCuentaId', caption: 'Cuenta Cliente'}
        ].map(render);

        const selectsComp = [
           {name : 'compIvaAcreditableCuentaId', caption: 'Cuenta Iva Acred'}
          ,{name : 'compCtaxPagarCuentaId', caption: 'Cuenta por pagar'}
        ].map(render);

        return (
            <div className="container small">
                <Tabs defaultActiveKey="general" id="uncontrolled-tab-example">
                    <Tab eventKey="general" title="General">
                        <form onSubmit={this.handleSubmit}>
                            <Form formData={app}>

                                <GroupItem caption="Datos Generales"  colCount={4}>
                                    <GroupItem colSpan={4}>
                                        <SimpleItem  dataField="name" editorType="dxTextBox">
                                            <RequiredRule message="El nombre es requerido" />
                                            <Label text="Nombre" />
                                        </SimpleItem>
                                        <SimpleItem dataField="fullName" editorType="dxTextBox">
                                            <Label text="Nombre completo" />
                                        </SimpleItem>
                                        <SimpleItem dataField="slogan" editorType="dxTextBox"/>
                                        <SimpleItem dataField="Correo" editorType="dxTextBox">
                                            <EmailRule message="Correo no es valido" />
                                        </SimpleItem>
                                        <SimpleItem dataField="telefono" editorType="dxTextBox">
                                            <RequiredRule message="El telefono es requerido" />
                                        </SimpleItem>
                                    </GroupItem>
                                </GroupItem>

                                <GroupItem caption="Configuración" colCount={4}>
                                    <GroupItem colSpan={3}>
                                        <SimpleItem dataField="cantDecimales"  editorType="dxNumberBox" >
                                            <RequiredRule message="El nombre es requerido" />
                                            <Label text="Decimales" />
                                        </SimpleItem>
                                        <SimpleItem dataField="ivaAverage" editorType="dxNumberBox" >
                                            <RequiredRule message="El iva es requerido" />
                                            <Label text="IVA" />
                                        </SimpleItem>
                                        <SimpleItem dataField="areaId" editorType="dxSelectBox"
                                            editorOptions={{
                                                dataSource: createStore('areas'), valueExpr: "id", displayExpr: "descripcion",
                                            }}>
                                            <RequiredRule message="El area es requerida" />
                                            <Label text="Area Inicial" />
                                        </SimpleItem>
                                        <SimpleItem dataField="monedaId" editorType="dxSelectBox"
                                            editorOptions={{
                                                dataSource: createStore('moneda'), valueExpr: "id", displayExpr: "descripcion", showClearButton:true
                                            }}>
                                            <Label text="Moneda" />
                                        </SimpleItem>
                                    </GroupItem>
                                </GroupItem>

                                <GroupItem caption="Configuración Contable Venta" colCount={4}>
                                    <GroupItem colSpan={4}>

                                    </GroupItem>
                                    <SimpleItem  colSpan={4} dataField="gererarProcesosContables"
                                        editorType="dxCheckBox"
                                        editorOptions = {{
                                            onValueChanged : this.onValueChanged
                                        }}
                                        >
                                        <Label text="Generar procesos contables" />
                                    </SimpleItem>
                                    <GroupItem colSpan={4}>
                                        {selectsVta}
                                    </GroupItem>
                                </GroupItem>

                                <GroupItem caption="Configuración Contable Compra" colCount={4}>
                                    <GroupItem colSpan={4}>
                                        {selectsComp}
                                    </GroupItem>
                                </GroupItem>

                                <ButtonItem horizontalAlignment="left" buttonOptions={{
                                    text: this.state.saving ? 'Guardando...' : 'Guardar información',
                                    type: 'success',
                                    useSubmitBehavior: true,
                                    disabled:this.state.saving
                                }} />

                            </Form>
                        </form>
                    </Tab>
                    <Tab eventKey="cuentas" title="Cuentas">
                        <CuentasConfig></CuentasConfig>
                    </Tab>                  
                </Tabs>
                
            </div>
        );
    }
}

const mapStateToProps = state => ({
    app: state.appInfo,
    error: state.error
});

const mapDispatchToPros = ({
    setAppInfo
});

export default connect(mapStateToProps, mapDispatchToPros)(App);

