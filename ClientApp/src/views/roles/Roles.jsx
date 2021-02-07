import React, { useState, useEffect } from "react";
import { Box, DataGrid, SelectBox } from "devextreme-react";
import { Item } from "devextreme-react/box";
import http from "../../utils/http";
import uri from "../../utils/uri";
import { store } from "../../services/store";
import { Column, Editing, Popup } from "devextreme-react/data-grid";



const Roles = props => {

    return (
        <div className="container medium">

            <Box direction="row" width="100%" height={75}>

                <Item ratio={1}>
                    <DataGrid
                        dataSource={store({ uri: uri.roles })}
                        showBorders={true}
                        showRowLines={true}
                    >
                        <Editing
                            mode="popup"
                            allowUpdating={true}
                            allowDeleting={false}
                            allowAdding={true}
                            useIcons={true}

                        >
                            <Popup width={600} height={375}>

                            </Popup>
                        </Editing>
                        <Column dataField="id" caption="Id" width={60} visible={false} allowEditing={false}/>
                        <Column dataField="name" caption="Rol" width={200}  />
                    </DataGrid>
                </Item>

            </Box>

        </div>
    );
}

export default Roles;