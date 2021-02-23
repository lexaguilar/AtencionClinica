# AtencionClinica
-Admisionar solo desde el area admision
-Reglas para beneficiarios menores de 12
-Poner fecha de incio para kardex y traer saldo anterior

# Catalogos Inciados
-Areas dBSAHME --Admision debe ser la 1
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
    
