import React, { useState, useEffect } from "react";
import { Box, DataGrid, SelectBox } from "devextreme-react";
import { Item } from "devextreme-react/box";
import http from "../../utils/http";
import uri from "../../utils/uri";
import { store } from "../../services/store";
import { Column, Editing, Popup, Form } from "devextreme-react/data-grid";
import Title from "../../components/shared/Title";
import BlockHeader from "../../components/shared/BlockHeader";
import useAuthorization from "../../hooks/useAuthorization";
import { dataAccess, resources } from "../../data/app";



const Resources = props => {

    const { isAuthorization, Unauthorized } = useAuthorization([resources.usuarios, dataAccess.access ]);

    const [roles, setRoles] = useState([]);
    const [rolId, setRolId] = useState(0);

    const onLoad = (e) => {
        http(uri.roles.get).asGet().then(resp => {
            setRoles(resp);
        });
    }

    useEffect(() => {
        onLoad();
    }, [0]);

    const changeHandler = (e) => {

        setRolId(e.value ?? 0);
    }

    const title ='Recursos'

    return !isAuthorization 
    ?  <Unauthorized />  
    : (
        <div className="container medium">
            <Title title={title} />
            <BlockHeader title={title} />
            <Box direction="row" width="100%" height={75}>
                <Item ratio={0} baseSize="260px">
                    <label>Seleccione un rol:</label>
                    <SelectBox items={roles}
                        placeholder="Selecciona un Rol"
                        showClearButton={true} valueExpr="id" displayExpr="name" onValueChanged={changeHandler} />
                </Item>
            </Box>
            <Box direction="row" width="100%" height={75}>

                <Item ratio={1}>
                    <label>Acceso a recursos</label>
                    <DataGrid
                        dataSource={store({ uri: { get: uri.resources(rolId), insert: uri.resources(rolId) } })}
                        showBorders={true}
                        showRowLines={true}
                    >
                        <Editing
                            mode="popup"
                            allowUpdating={true}
                            allowDeleting={false}
                            allowAdding={false}
                            useIcons={true}

                        >
                            <Popup title="Configuracion" width={300} height={350}>

                            </Popup>
                            <Form colCount={1}>
                                <Item dataField="name"/>                                             
                                <Item dataField="canRead"/>                                             
                                <Item dataField="canCreate"/>                                             
                                <Item dataField="canUpdate"/>                                             
                                <Item dataField="canDelete"/>                                             
                            </Form>
                        </Editing>
                        <Column dataField="name" caption="Recurso" width={200} allowEditing={false} />
                        <Column dataField="canRead" caption="Leer" allowFiltering={false} width={160} />
                        <Column dataField="canCreate" caption="Crear" allowFiltering={false} width={160} />
                        <Column dataField="canUpdate" caption="Actualizar" allowFiltering={false} width={160} />
                        <Column dataField="canDelete" caption="Borrar" allowFiltering={false} width={160} />
                    </DataGrid>
                </Item>

            </Box>

        </div>
    );
}

export default Resources;