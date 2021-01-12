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



--activos
3036004
3054260
3353745
3431322
3479267
3603066
3604821

--no activos
21087217
21240380
21749762
21836844
21959282