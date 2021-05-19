import React, { useEffect, useState } from 'react';
import List from 'devextreme-react/list';
import uri from '../../utils/uri';
import http from '../../utils/http';
import HemoLogDetails from './HemoLogDetails';
import { Button } from 'devextreme-react';
import notify from 'devextreme/ui/notify';
import { formatDate } from '../../utils/common';


const HemoLog = () => {

    const [hemoLogs, setHemoLogs] = useState([]);
    const [loading, setLoadging] = useState(false);
    const [currentLog, setCurrentLog] = useState(0);

    const renderListItem = (item) => {
        return (
            <div>
                <div className="hotel">
                    <div className="name">{item.group.name}</div>
                    <div className="address">{`${formatDate(item.date)}`}</div>
                    {/* <div className={`type ${item.Hotel_Class.toLowerCase()}`} /> */}
                </div>              
            </div>
        );
    }

    const handleListSelectionChange = (e) => {
        const current = e.addedItems[0];
        if (current) {
            setCurrentLog(current.id);
        }
    }

    const downloadProducts = e => {
        setLoadging(true);
        http(uri.hemoLogs.insert)
        .asPost()
        .then(data => {

            loadData();
            setLoadging(false);

        }).catch(err => {

            setLoadging(false);
            notify(err, 'error');

        });

    }

    const loadData = (e) => http(uri.hemoLogs.get).asGet().then(data => setHemoLogs(data));

    useEffect(() => {

        loadData();

    }, [0]);

    return (
        <div className="container">
            <div className="left">
                <Button 
                    disabled={loading} 
                    text={loading ? 'Cargando...' : 'Descargar el dia de hoy'} 
                    type="default" 
                    icon="download" 
                    onClick={downloadProducts}/>
                <List
                    selectionMode="single"
                    dataSource={hemoLogs}
                    onSelectionChanged={handleListSelectionChange}
                    itemRender={renderListItem}
                />
            </div>
            <div className="right">
                <HemoLogDetails groupId={currentLog}/>
            </div>
        </div>
    );
}

export default HemoLog;
