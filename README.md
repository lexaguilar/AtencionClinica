# AtencionClinica

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

#
clinica2021
# TODO
Reglas para beneficiarios menores de 12
Crear catalogos de departamentos y municipios

--activos
2333924
2353281
2362229
2547819
2688970

