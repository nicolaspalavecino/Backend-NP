# ÚLTIMA PRÁCTICA INTEGRADORA

## USERS

### User Model
Se modificó el modelo y se agregaron las propiedades:
- Documents: Array. Contiene objetos con propiedades 'name' y 'reference'.
- status: Boolean.
- last_connection: String | Se actualiza cada vez que el usuario se logea (Función timeNow en 'utils.js')

### Users Docs - POST '/users/:email/documents'
- Multer configuration: Dentro de 'utils.js' se configuró multer para que se pueda almacenar X tipo de documento en una carpeta distinta dependiendo el nombre del input al cual es cargado el archivo.
- Se modificó la lógica del cambio de rol para que luego de cargar estos documentos (3 según la consigna) el usuario se convierta en premium. El endpoint de la vista es 'premium/:email'. Allí se encuentra el formulario cuya función está linkeada con el js llamado 'upgradePremium.js' dentro de 'public'. Dentro del service de 'uploadDocuments' se agregan los documentos al usuario y se modifica el status de false a true.

# ENTREGA FINAL (Parcial)

## ELIMINAR USUARIOS INACTIVOS

### Vista USERS
Cuando te logeas con el admin en la barra de navegación hay una vista que trae todos los usuarios de la BD. Eventualmente en esa misma vista voy a aplicar lo de eliminar usuarios inactivos (Lo probé con POSTMAN)

### Delete usuarios inactivos - DELETE '/users'
- periodTime: Es una función dentro de 'utils.js' que compara la fecha/hora actual con la de last_connection de cada usuario y obtiene la diferencia en horas.
- Service de USERS: Agregué dos métodos. 'getIdleUsers' que trae todos los usuarios cuya última conexión fue hace 48hs o más y 'deleteIdleUsers' que elimina a esos usuarios (hay una modificación que tras eliminarlos los agrega nuevamente a la BD, lo hice solo para no tener que estar agregando un usuario nuevo cada vez que lo probaba, así que eso se va a borrar eventualmente).
- Service de EMAIL: Método 'sendDeletedNotification' que envía un email a aquellos usuarios eliminados.
