import React from 'react';
import DataGrid, {
    Column,
    Paging,
    Scrolling,
    Selection,
    FilterRow,
    HeaderFilter,
} from 'devextreme-react/data-grid';
import DropDownBox from 'devextreme-react/drop-down-box';

const BeneficiaryDDBComponent = props => {

    const [currentValue, setCurrentValue] = useState(props.data.value);
    dropDownBoxRef = React.createRef();

    const onSelectionChanged = (e) => {

        setCurrentValue(e.selectedRowKeys[0]);
        props.data.setValue(currentValue);

        if (e.selectedRowKeys.length > 0) {

            console.log(e.selectedRowsData[0]);
            this.dropDownBoxRef.current.instance.close();

        }

    }

    const contentRender = () => {
        return (
            <DataGrid
                dataSource={this.props.data.column.lookup.dataSource}
                remoteOperations={true}
                keyExpr="id"
                height={280}
                selectedRowKeys={[currentValue]}
                hoverStateEnabled={true}
                onSelectionChanged={onSelectionChanged}
                focusedRowEnabled={true}
                defaultFocusedRowKey={currentValue}
                rowAlternationEnabled={true}
            >
                <FilterRow visible={true} />
                <HeaderFilter visible={true} />
                <Column dataField="nombre" />
                <Paging enabled={true} pageSize={10} />
                <Scrolling mode="virtual" />
                <Selection mode="single" />
            </DataGrid>
        );
    }

    const dropDownOptions = { width: 500 };

    return (
        <DropDownBox
            ref={dropDownBoxRef}
            dropDownOptions={dropDownOptions}
            dataSource={this.props.data.column.lookup.dataSource}
            value={currentValue}
            displayExpr="nombre"
            valueExpr="id"
            contentRender={contentRender}>
        </DropDownBox>
    );
}

export default BeneficiaryDDBComponent;
