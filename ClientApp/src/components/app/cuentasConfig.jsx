import React, { useState, useEffect } from 'react';
import http from '../../utils/http';
import TextBox from 'devextreme-react/text-box';
import { Button } from 'devextreme-react/button';
import notify from 'devextreme/ui/notify';

function CuentasConfig(){

    const [  data, setData ] = useState({
        separadores : '',
        niveles : []
    });

    const getConfig = async() =>{
        await http('app/config/get-info').asGet().then(resp => setData(resp));
    }

    const setSeparador = e => {
        setData({
            separadores : e.value,
            niveles : [...data.niveles]
        })
    }

    const setNiveles = (value, nivel) =>{
        setData({
            separadores : data.separadores,
            niveles : [...data.niveles.filter(x => x.nivel != nivel), ...[{nivel:nivel, longitud : value}]].sort((a, b) => a.nivel - b.nivel)
        })
    }

    const add = () => {
        setNiveles('1', (data.niveles.length + 1));
    };

    const save = () =>{
        console.log(data);
        http('app/config/set-info').asPost(data).then(resp => {
            console.log(resp);
            notify('Configuracion de cuentas guardado');
        });
    }

    useEffect(() =>{
        getConfig();
    },[]);

   

    return (
        <div className="dx-fieldset">
            <div className="dx-field">
                <div className="dx-field-label">Separadores</div>
                <div className="dx-field-value">
                    <TextBox value={data.separadores} defaultValue="" onValueChanged={setSeparador} />
                </div>
            </div>
            {data.niveles && data.niveles.map((nivel) => {
                return <div className="dx-field">
                            <div className="dx-field-label">Nivel {nivel.nivel}</div>
                            <div className="dx-field-label">Longitud:</div>
                            <div className="dx-field-value">
                                <TextBox value={nivel.longitud} onValueChanged={e => setNiveles(e.value, nivel.nivel)} />
                            </div>
                        </div>
            })}
            <div className="dx-field">
                <div className="dx-field-label"></div>
                <div className="dx-field-value">
                    <Button icon="plus"
                    onClick={add} />
                </div>
            </div>
            <div className="dx-field">
                <div className="dx-field-label">Ejemplo:</div>
                <div className="dx-field-value">
                    <TextBox disabled={true} value={data.niveles.reduce((actual, nuevo) => {
                                        return actual + data.separadores +'0'.repeat(nuevo.longitud)
                                    },'').substring(1)} />
                </div>
            </div>
            <div className="dx-field">
                <div className="dx-field-label"></div>
                <div className="dx-field-value">
                    <Button icon="save"
                    type="success"
                    text="Guardar"
                    onClick={save} />
                </div>
            </div>
        </div>
    )

    
}

 export default CuentasConfig;