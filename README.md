# AtencionClinica

# Pedientes

-Validar lotes
-Todo lo que es date, mandarlo formateado a 00:00 horas
-Llenar sabana de datos

# Listos
ç
-Registrar descargue de inventario y procedimientos en la ultima admision o cita
-Admisionar solo desde el area admision
-Reglas para beneficiarios menores de 12
-Poner Home Page
-Poner el doctor en la farmacia
-Poner fecha de incio para kardex y traer saldo anterior
-Opcion de reset password
-Reset store usuarios al momento de login
-Historial de medicamentos
-Color en las col editables
-Poner cantidad al momento de descargar inventario
-Validar costos promedios
# Nice to Have





# Catalogos Inciados
-Areas dBSAHME --Admision debe ser la 2
-Specialties dBSAHME
-BeneficiaryStatus No administrable
-CustomerStatus No administrable
-Roles No administrable
-CustomerTypes No administrable
-Resources No administrable
-RolResources No administrable
-Rols No administrable
-CIE10 dBSAHME
-Relationships No administrable
    INSERT INTO ClinicalCare.dbo.Relationships(	NAME )
    SELECT atb.Descripcion FROM  adTipoBeneficiario AS atb WHERE atb.IDTipoBeneficiario NOT IN (0,4,7)
-Sexs No administrable
-OutPutProductTypes  No administrable
-OutPutProductStates No administrable
-InPutProductTypes No administrable
-InPutProductStates No administrable
-ProductStates No administrable

#
Clinica2021*
# TODO
Reglas para beneficiarios menores de 12
Crear catalogos de departamentos y municipios
Obtener catalog activos para crear y todos para editar
-Tablas
    Products
    Families
    Presentations
    

-Comprobar la existencia de objetos : true
-Generar Script para objetos dependientes: true
-Incluir DROP y CREATE en el script : Incluir DROP y CREATE en el script+
-Incluir encabezados en el scrip : false
-Tipos de datos que se deben incluir : Esquemas y Datos
-Incluir indeces en el script : true
