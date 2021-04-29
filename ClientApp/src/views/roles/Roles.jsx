import React from "react";
import { DataGrid } from "devextreme-react";
import { Item } from "devextreme-react/box";
import uri from "../../utils/uri";
import { store } from "../../services/store";
import { Column, Editing, Popup, Form,
    RequiredRule,
    StringLengthRule, } from "devextreme-react/data-grid";
import Title from "../../components/shared/Title";
import BlockHeader from "../../components/shared/BlockHeader";
import { dataAccess, resources } from "../../data/app";
import useAuthorization from "../../hooks/useAuthorization";



const Roles = props => {

    const { authorized } = useAuthorization([resources.usuarios, dataAccess.access ]);

    const title ='Roles'

    return authorized(
        <div className="container small">
            <Title title={title} />
            <BlockHeader title={title} />
            <DataGrid
                dataSource={store({ uri: uri.roles })}
                showBorders={true}
                showRowLines={true}
                hoverStateEnabled={true}
            >
                <Column dataField="id" caption="Id" width={60} visible={false} allowEditing={false} />
                <Column dataField="name" caption="Rol" />

                <Editing
                    mode="popup"
                    allowUpdating={true}
                    allowDeleting={false}
                    allowAdding={true}
                    useIcons={true}
                >
                    <Popup width={300} height={250}>
                    </Popup>
                    <Form colCount={1}>
                        <Item dataField="id" >
                        </Item>
                        <Item dataField="name" >
                            <RequiredRule message="El nombre es requerido" />
                            <StringLengthRule max={50} min={2} message="Máximo de caracteres 50 y 2 mínimo" />
                        </Item>                      
                    </Form>
                </Editing>
                
            </DataGrid>

        </div>
    );
}

export default Roles;