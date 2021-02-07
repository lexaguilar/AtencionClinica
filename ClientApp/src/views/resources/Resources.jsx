import React, { useState, useEffect } from "react";
import { Box, DataGrid, SelectBox } from "devextreme-react";
import { Item } from "devextreme-react/box";
import http from "../../utils/http";
import uri from "../../utils/uri";
import { store } from "../../services/store";
import { Column, Editing, Popup } from "devextreme-react/data-grid";



const Resources = props => {

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

    return (
        <div className="container medium">

            <Box direction="row" width="100%" height={75}>
                <Item ratio={0} baseSize="260px">
                    <SelectBox items={roles}
                        placeholder="Selecciona un Rol"
                        showClearButton={true} valueExpr="id" displayExpr="name" onValueChanged={changeHandler} />
                </Item>
            </Box>
            <Box direction="row" width="100%" height={75}>

                <Item ratio={1}>
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
                            <Popup width={800} height={480}>

                            </Popup>
                        </Editing>
                        <Column dataField="resourceId" caption="Id" width={60} visible={false} allowEditing={false}/>
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