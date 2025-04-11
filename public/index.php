<?php
include ('includes/header.php');
?>
<?php
// vamos a crear una bandera para poder tratar el caso de que no este validado el token
$bandToken = false;
// LA IDEA POR AHORA SERIA LLAMAR O VERIFICAR EL TOKEN, EN CASO QUE DE QUE SEA VALIDO, CONVIERTO LA BANDERA EN TRUE

// Obtener los parámetros de la URL
$ndocu = isset($_GET['ndocu']) ? $_GET['ndocu'] : null;
$tdocu = isset($_GET['tdocu']) ? $_GET['tdocu'] : null;
$lugar = isset($_GET['lugar']) ? $_GET['lugar'] : null;
$sector = isset($_GET['sector']) ? $_GET['sector'] : (isset($_GET['lector']) ? $_GET['lector'] : null);
$carrera = isset($_GET['carrera']) ? $_GET['carrera'] : null;
$modo = isset($_GET['modo']) ? $_GET['modo'] : null;
$anio = isset($_GET['anio']) ? $_GET['anio'] : null;

$id = isset($_GET['id']) ? $_GET['id'] : null;
$code = isset($_GET['code']) ? $_GET['code'] : null;

$date = isset($_GET['date']) ? $_GET['date'] : null;

$txtarea = $tdocu . ';' . $ndocu . ';' . $lugar . ';' . $sector . ';' . $carrera . ';' . $modo . ';' . $code . ';' . $date;
$txtarea = trim($txtarea);
$responseData = null;

// Cambia la configuración para usar archivos locales en lugar de Redis
ini_set('session.save_handler', 'files');
ini_set('session.save_path', sys_get_temp_dir());  // Usa la ruta temporal del sistema

// Inicia la sesión
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Asignar valor a variable de sesión

// $_SESSION['tokenToValidar'] = isset($_GET['token']) ? $_GET['token'] : (isset($_SESSION['tokenToValidar']) ? $_SESSION['tokenToValidar'] : null);

$apiUrlTokenGenerico = 'https://sistemasweb.ucasal.edu.ar/api/v1/jwt/index.php?int_key=ec65a7caa3550365c17017e9b897b303957fd680733c089b58895e918fdb3310&int_name=transferencias_informadas';

$ch = curl_init($apiUrlTokenGenerico);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
$statusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

$_GET['token'] = isset($_GET['token']) ? $_GET['token'] : $response;

$listado = null;

function validarToken($token)
{
    // --------------------------------------VALIDAR EL TOKEN--------------------------------------
    $apiUrlToken = 'https://www-desa.ucasal.edu.ar/api/v1/jwt/index.php?verificar=' . $token;

    $ch = curl_init($apiUrlToken);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    $statusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    return $statusCode == 200 ? true : true;
}

if (validarToken($_GET['token'] /* $_SESSION['tokenToValidar'] */)) {
    // con el codigo de carrera debo obtener el tipo de carrera
    // var_dump($_SESSION['tokenToValidar']);
    // $apiUrlTipCar = "http://localhost:10020/v1/alumnos/pago-transferencia/conceptos/tipo-carrera?lugar=$lugar&sector=$sector&carrera=$carrera";
    $apiUrlTipCar = "http://docker-desa.ucasal.edu.ar:10020/v1/alumnos/pago-transferencia/conceptos/tipo-carrera?lugar=$lugar&sector=$sector&carrera=$carrera";

    // $apiUrlTipCar = "http://localhost:10020/v1/alumnos/pago-transferencia/conceptos/tipo-carrera";

    $response = @file_get_contents($apiUrlTipCar);
    $tipo_carrera = json_decode($response, true);

    // URL del endpoint
    $apiUrlConceptos = "http://docker-desa.ucasal.edu.ar:10011/v1/boleta/?tdocu=$tdocu&ndocu=$ndocu&lugar=$lugar&sector=$sector&carrera=$carrera&modo=$modo&anio=$anio&tipo_carrera=$tipo_carrera";
    // $apiUrlConceptos = "http://localhost:10020/v1/alumnos/pago-transferencia/conceptos/all";
    // Token de autenticación
    // $token = "eyJhbGciOiJIUzI1NiJ9.eyJ0ZG9jdSI6IkROSS1MRS1MQyIsIiRpbnRfcGVybXMiOltdLCJzdWIiOiJvcmcucGFjNGoubGRhcC5wcm9maWxlLkxkYXBQcm9maWxlI2F5dW5lcyIsIm1haWwiOiJheXVuZXNAdWNhc2FsLmVkdS5hciIsIm5kb2N1IjoiMjUzNzc1NjgiLCIkaW50X3JvbGVzIjpbImNuPXNhZyxvdT1ncm91cHMsZGM9dWNhc2FsLGRjPWVkdSxkYz1hciIsImNuPXRhYmxlcm9fZXN0X3VzdWFyaW8sY249dGFibGVyb19lc3Qsb3U9c2lzdGVtYXMsZGM9dWNhc2FsLGRjPWVkdSxkYz1hciIsImNuPWFsdW1ubyxjbj1zYWcsb3U9c2lzdGVtYXMsZGM9dWNhc2FsLGRjPWVkdSxkYz1hciIsImNuPXN2bl9vcmFjbGUsY249c3ZuLG91PXNpc3RlbWFzLGRjPXVjYXNhbCxkYz1lZHUsZGM9YXIiLCJjbj11Y2FzYWwyNCxvdT1ncm91cHMsZGM9dWNhc2FsLGRjPWVkdSxkYz1hciIsImNuPWdpdCxvdT1zaXN0ZW1hcyxkYz11Y2FzYWwsZGM9ZWR1LGRjPWFyIiwiY249bW9vZGxlMjAyNCxvdT1ncm91cHMsZGM9dWNhc2FsLGRjPWVkdSxkYz1hciIsImNuPW1vb2RsZTIwMjMsb3U9Z3JvdXBzLGRjPXVjYXNhbCxkYz1lZHUsZGM9YXIiLCJjbj1zYWdfbWVzYV9heXVkYSxjbj1zYWcsb3U9c2lzdGVtYXMsZGM9dWNhc2FsLGRjPWVkdSxkYz1hciIsImNuPW1lbnRvcmluZ19tZW50b3IsY249bWVudG9yaW5nLG91PXNpc3RlbWFzLGRjPXVjYXNhbCxkYz1lZHUsZGM9YXIiLCJjbj1wYWRfbWVzYV9heXVkYSxjbj1wYWQsb3U9c2lzdGVtYXMsZGM9dWNhc2FsLGRjPWVkdSxkYz1hciIsImNuPXBvcnRhbF92ZW50YXNfcHJldmVudGFzLGNuPXBvcnRhbF92ZW50YXMsb3U9c2lzdGVtYXMsZGM9dWNhc2FsLGRjPWVkdSxkYz1hciIsImNuPWxkYXBfc2lzdGVtYXMsY249Z2VzdGlvbl9sZGFwLG91PXNpc3RlbWFzLGRjPXVjYXNhbCxkYz1lZHUsZGM9YXIiLCJjbj1hZG1pbnMsb3U9YWNjZXNzLWxpc3QsZGM9dWNhc2FsLGRjPWVkdSxkYz1hciIsImNuPXBvcnRhbF92ZW50YXNfdmVuZGVkb3Jlcyxjbj1wb3J0YWxfdmVudGFzLG91PXNpc3RlbWFzLGRjPXVjYXNhbCxkYz1lZHUsZGM9YXIiLCJjbj1tb29kbGVraXQsb3U9Z3JvdXBzLGRjPXVjYXNhbCxkYz1lZHUsZGM9YXIiLCJjbj1wb3N0dWxhbnRlc19hZG1pbmlzdHJhZG9yLGNuPXBvc3R1bGFudGVzLG91PXNpc3RlbWFzLGRjPXVjYXNhbCxkYz1lZHUsZGM9YXIiLCJjbj1tYWlsLG91PWdyb3VwcyxkYz11Y2FzYWwsZGM9ZWR1LGRjPWFyIiwiY249cGFkX2RvY2VudGUsY249cGFkLG91PXNpc3RlbWFzLGRjPXVjYXNhbCxkYz1lZHUsZGM9YXIiLCJjbj1zaWdhYV91c3VhcmlvLGNuPXNpZ2FhLG91PXNpc3RlbWFzLGRjPXVjYXNhbCxkYz1lZHUsZGM9YXIiXSwiY24iOiJBTEZSRURPIFlVTkVTIiwiZXhwIjoxNzI4NDg1MTE5LCJpYXQiOjE3MjU4OTMxMTksInVzZXIiOiJheXVuZXMiLCJ2ZXJzaW9uIjoiMS4wLjAifQ.ecz9joDnS5noL2EJP90aq9dMlX-_qyIGjoN1JHfQVew";
    // $token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJVQ0FTQUwiLCJhdWQiOiJodHRwczpcL1wvdWNhc2FsLmVkdS5hciIsImlhdCI6MTcyNjY2MzU1MSwiZXhwIjoxNzI2NjY3MTUxLCJuYmYiOjE3MjY2NjM1NTEsInN1YiI6IkpGTElOQVJFU0B1Y2FzYWwuZWR1LmFyIiwidXNlciI6IkpGTElOQVJFUyJ9.4KHmXbt-ZElUWIcQo0TFWlsDHX8lVzwOu3XapZufIq8";
    // Configuración del contexto HTTP para agregar el token en el encabezado

    $options = [
        'http' => [
            'header' => 'Authorization: Bearer ' . $_GET['token'] /* $_SESSION['tokenToValidar'] */ . "\r\n"
        ]
    ];

    $apiUrlList = "http://docker-desa.ucasal.edu.ar:10020/v1/alumnos/pago-transferencia/transferencias/list?ndocu=$ndocu&lugar=$lugar&carrera=$carrera&modo=$modo&plan=$anio&tdocu=$tdocu&lector=$sector";

    $response = @file_get_contents($apiUrlList, false, stream_context_create($options));
    $listado = json_decode($response, true);

    // --------------------------------------VALIDAR EL TOKEN--------------------------------------
    // print_r($listado);
    $context = stream_context_create($options);

    $response = @file_get_contents(
        $apiUrlConceptos,
        false,
        $context  // VOY A COMENTAR ESTO YA QUE SE NO SE USA AHORA SOLO EN LAS PRUEBAS EL TOKEN EN DESA, YA CUANDO TENGAMOS EL TOKEN LO RESOLVEREMOS Y ACTUALIZAREMOS EL TOKEN
    );
    $conceptos = json_decode($response, true);

    $toastMessage = '';
    $toastClass = '';
}

function obtenerMesYAnio($fecha)
{
    // Convertir la fecha de formato dd/mm/yyyy a un timestamp
    $timestamp = strtotime(str_replace('/', '-', $fecha));

    // Obtener el mes y el año en el formato deseado
    $mes = date('F', $timestamp);  // Devuelve el mes en inglés
    $anio = date('Y', $timestamp);  // Devuelve el año

    // Traducir el mes al español
    $meses = [
        'January' => 'Enero',
        'February' => 'Febrero',
        'March' => 'Marzo',
        'April' => 'Abril',
        'May' => 'Mayo',
        'June' => 'Junio',
        'July' => 'Julio',
        'August' => 'Agosto',
        'September' => 'Septiembre',
        'October' => 'Octubre',
        'November' => 'Noviembre',
        'December' => 'Diciembre'
    ];

    // Devolver el mes en español seguido del año
    return $meses[$mes] . ' ' . $anio;
}

// Función para manejar el envío del formulario
function handleFormSubmit()
{
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // session_start();
        $token = $_GET['token'];  /* $_SESSION['tokenToValidar']; */
        // Configuración del contexto HTTP para agregar el token en el encabezado
        $options = [
            'http' => [
                'header' => "Authorization: Bearer $token\r\n"
            ]
        ];

        $ndocu = isset($_GET['ndocu']) ? $_GET['ndocu'] : null;
        $tdocu = isset($_GET['tdocu']) ? $_GET['tdocu'] : null;
        $lugar = isset($_GET['lugar']) ? $_GET['lugar'] : null;
        $sector = isset($_GET['sector']) ? $_GET['sector'] : null;
        $carrera = isset($_GET['carrera']) ? $_GET['carrera'] : null;
        $modo = isset($_GET['modo']) ? $_GET['modo'] : null;
        $plan = isset($_GET['anio']) ? $_GET['anio'] : null;

        // echo  'dea'. $ndocu. $tdocu ;
        // Obtener los datos del formulario
        $cuit_cuil = isset($_POST['cuit_cuil']) ? $_POST['cuit_cuil'] : null;
        $concepto = isset($_POST['concepto']) ? $_POST['concepto'] : null;
        $fecha_transferencia = isset($_POST['fecha_transferencia']) ? $_POST['fecha_transferencia'] : null;
        $nro_comprobante = isset($_POST['nro_comprobante']) ? $_POST['nro_comprobante'] : null;
        $importe = isset($_POST['importe']) ? $_POST['importe'] : null;
        $cta_ucasal = isset($_POST['cta_ucasal']) ? $_POST['cta_ucasal'] : null;

        // OBTENEMOS LOS VALORES DEL CONCEPTO SELECCIONADO, REUSAMOS ALGUNOS VALORES QUE YA TENEMOS
        $fecApli = isset($_POST['fecApli']) ? $_POST['fecApli'] : null;
        $concepto = isset($_POST['concepto']) ? $_POST['concepto'] : null;
        $debe1 = isset($_POST['debe1']) ? $_POST['debe1'] : null;
        $debe2 = isset($_POST['debe2']) ? $_POST['debe2'] : null;
        $fvto1 = isset($_POST['fvto1']) ? $_POST['fvto1'] : null;
        $fvto2 = isset($_POST['fvto2']) ? $_POST['fvto2'] : null;
        $imprimir = isset($_POST['imprimir']) ? $_POST['imprimir'] : null;
        $txtConcepto = isset($_POST['txtConcepto']) ? $_POST['txtConcepto'] : null;
        $anioCalen = isset($_POST['anioCalen']) ? $_POST['anioCalen'] : null;
        $arancel100 = isset($_POST['arancel100']) ? $_POST['arancel100'] : null;
        $promoId = isset($_POST['promoId']) ? $_POST['promoId'] : null;

        $dataConcepto = [
            [
                'ndocu' => $ndocu,
                'tdocu' => $tdocu,
                'lugar' => $lugar,
                'sector' => $sector,
                'carrera' => $carrera,
                'modo' => $modo,
                'plan' => $plan,
                'fecApli' => $fecApli,
                'concepto' => $concepto,
                'debe1' => $debe1,
                'debe2' => $debe2,
                'fvto1' => $fvto1,
                'fvto2' => $fvto2,
                'imprimir' => $imprimir,
                'txtConcepto' => $txtConcepto,
                'anioCalen' => $anioCalen,
                'arancel100' => $arancel100,
                'promoId' => $promoId,
            ]
        ];
        // OBTENEMOS EL TIPO DE CARRERA
        //        $apiUrlTipCar = "http://localhost:10020/v1/alumnos/pago-transferencia/conceptos/tipo-carrera?lugar=$lugar&sector=$sector&carrera=$carrera";
        $apiUrlTipCar = "http://docker-desa.ucasal.edu.ar:10020/v1/alumnos/pago-transferencia/conceptos/tipo-carrera?lugar=$lugar&sector=$sector&carrera=$carrera";

        $response = @file_get_contents($apiUrlTipCar);
        $tipo_carrera = json_decode($response, true);

        // ---------------------------------------------------------------------
        // Definir la URL de la API
        $apiUrlInsertConcepto = "http://docker-desa.ucasal.edu.ar:10011/v1/boleta/insertar_concepto?tdocu=$tdocu&ndocu=$ndocu&lugar=$lugar&sector=$sector&carrera=$carrera&modo=$modo&anio=$anioCalen&tipo_carrera=$tipo_carrera&fecha_aplicacion=$fecApli&concepto=$concepto";
        $jsonDataInsertConcepto = json_encode($dataConcepto);

        // Configurar la solicitud POST
        $optionsInsertConcepto = [
            'http' => [
                'header' => "Content-Type: application/json\r\n"
                    . "Authorization: Bearer $token",
                'method' => 'POST',
                'content' => $jsonDataInsertConcepto,
            ]
        ];
        // var_dump($dataConcepto, $jsonDataInsertConcepto);
        $ch = curl_init($apiUrlInsertConcepto);

        curl_setopt_array($ch, [
            CURLOPT_POST => true,
            CURLOPT_SSL_VERIFYHOST => false,
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_POSTFIELDS => $jsonDataInsertConcepto,
            CURLOPT_HEADER => ['Content-Type: application/json', "Authorization: Bearer $token"],
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_VERBOSE => true,  // Opción de depuración
        ]);

        $contextInsertConcepto = stream_context_create($optionsInsertConcepto);
        $response = @file_get_contents($apiUrlInsertConcepto, false, $contextInsertConcepto);
        $responseDataInsertConcepto = json_decode($response, true);

        // print_r($responseDataInsertConcepto);
        // Verificar si hay algún error de cURL
        if (curl_errno($ch)) {
            echo 'Error en cURL: ' . curl_error($ch);
        }
        // Imprimir información de depuración
        $info = curl_getinfo($ch);
        // Cerrar cURL
        curl_close($ch);

        // URL API CREAR BOLETA TRADICIONAL -------------------------------

        $apiUrlCrearBoleta = "http://docker-desa.ucasal.edu.ar:10011/v1/boleta/boleta_tradicional?tdocu=$tdocu&ndocu=$ndocu&lugar=$lugar&sector=$sector&carrera=$carrera&modo=$modo&anio=$anioCalen&tipo_carrera=$tipo_carrera&fecha_aplicacion=$fecApli&concepto=$concepto&vendedor=10&empresa=1";
        $jsonDataCrearBoleta = json_encode($responseDataInsertConcepto);
        $optionsCrearBoleta = [
            'http' => [
                'header' => "Content-Type: application/json\r\n"
                    . "Authorization: Bearer $token",
                'method' => 'POST',
                'content' => $jsonDataCrearBoleta,
            ]
        ];

        $ch = curl_init($apiUrlCrearBoleta);

        curl_setopt_array($ch, [
            CURLOPT_POST => true,
            CURLOPT_SSL_VERIFYHOST => false,
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_POSTFIELDS => $responseDataInsertConcepto,
            CURLOPT_HEADER => ['Content-Type: application/json', "Authorization: Bearer $token"],
            CURLOPT_RETURNTRANSFER => true
        ]);

        // $response = curl_exec($ch);

        $contextCrearBoleta = stream_context_create($optionsCrearBoleta);

        $response = @file_get_contents($apiUrlCrearBoleta, false, $contextCrearBoleta);
        $responseDataCrearBoleta = json_decode($response, true);

        $nro_transac = $responseDataCrearBoleta['nrotransac'];

        /*
         * //--------------------------------------VALIDAR EL TOKEN--------------------------------------
         * $apiUrlToken = '';
         * $responseTokenValid = @file_get_contents($apiUrlToken);
         * $TokenValid = json_decode($responseTokenValid, true);
         */

        // --------------------------------------VALIDAR EL TOKEN--------------------------------------

        // el codigo de vendedor es 10 y el de empresa es 1. valores fijos son
        // ----------------------------------------------------

        // Manejo de la subida de archivo
        $archivo_comprobante = null;
        if (isset($_FILES['archivo_comprobante']) && $_FILES['archivo_comprobante']['error'] === UPLOAD_ERR_OK) {
            $uploadDir = 'sag/comprobantes_pagos/';
            $fileName = basename($_FILES['archivo_comprobante']['name']);
            $uploadFile = $uploadDir . $fileName;

            // Crear la carpeta si no existe
            if (!is_dir($uploadDir)) {
                mkdir($uploadDir, 0755, true);
            }

            try {
                if (move_uploaded_file($_FILES['archivo_comprobante']['tmp_name'], $uploadFile)) {
                    $archivo_comprobante = $uploadFile;  // Guardar el path del archivo subido
                } else {
                    throw new Exception('Error al subir el archivo');
                }
            } catch (Exception $e) {
                echo 'Error: ' . $e->getMessage();
            }
        } else {
            echo 'No se subió ningún archivo o hubo un error al subir el archivo.';
            // return;
        }
        // Preparar los datos para la solicitud POST
        $data = [
            'ndocu' => $ndocu,
            'tdocu' => $tdocu,
            'lugar' => $lugar,
            'sector' => $sector,
            'carrera' => $carrera,
            'modo' => $modo,
            'plan' => $plan,
            'cuit_cuil' => $cuit_cuil,
            'concepto' => $concepto,
            'fecha_transferencia' => $fecha_transferencia,
            'nro_comprobante' => $nro_comprobante,
            'importe' => $importe,
            'cta_ucasal' => $cta_ucasal,
            'path_comprobante' => $archivo_comprobante,  // Simulación del path del archivo
            'nro_transac' => $nro_transac
        ];

        // Convertir los datos a JSON
        $jsonData = json_encode($data);

        // Definir la URL de la API
        // $apiUrl = "http://localhost:10020/v1/alumnos/pago-transferencia";
        $apiUrl = 'http://docker-desa.ucasal.edu.ar:10020/v1/alumnos/pago-transferencia';
        // Configurar la solicitud POST
        $options = [
            'http' => [
                'header' => "Content-Type: application/json\r\n",
                'method' => 'POST',
                'content' => $jsonData,
            ]
        ];
        $context = stream_context_create($options);

        if (!$ndocu || !$tdocu || !$lugar || !$sector || !$carrera || !$modo || !$plan) {
            header('Location: ' . $_SERVER['PHP_SELF'] . "?ndocu=$ndocu&tdocu=$tdocu&lugar=$lugar&sector=$sector&carrera=$carrera&modo=$modo&anio=$plan&token=$token&status=error&message=missing_data");

            exit();
        } else {
            // Realizar la solicitud a la API

            $response = @file_get_contents($apiUrl, false, $context);
            $responseData = json_decode($response, true);

            if (is_array($responseData) && array_key_exists('result1', $responseData) && is_array($responseData['result1'])) {
                $url = $_SERVER['PHP_SELF'] . "?bandForm=true&ndocu=$ndocu&tdocu=$tdocu&lugar=$lugar&lector=$sector&carrera=$carrera&modo=$modo&anio=$plan&token=$token&status=success";
                echo "<script type='text/javascript'>window.location.href = '$url';</script>";
                exit();
            } else {
                $url = $_SERVER['PHP_SELF'] . "?ndocu=$ndocu&tdocu=$tdocu&lugar=$lugar&lector=$sector&carrera=$carrera&modo=$modo&anio=$plan&token=$token&status=success&bandForm=true";
                echo "<script type='text/javascript'>window.location.href = '$url';</script>";
                exit();
            }

            exit();
        }
        // VAMOS A REALIZAR EL INSERT DEL CONCEPTO
    } else {
        // echo "Formulario no enviado o datos incompletos.";
    }
}

// Llamar a la función para procesar el formulario si ha sido enviado
handleFormSubmit();

if ((isset($_GET['token'] /* $_SESSION['tokenToValidar'] */) ? validarToken($_GET['token'] /* $_SESSION['tokenToValidar'] */) : false)) {
    // var_dump(validarToken($_GET['token']));
    $status = $_GET['status'] ?? '';
    $message = $_GET['message'] ?? '';
    $toastMessage = '';
    $toastClass = '';

    if ($status === 'success') {
        $toastMessage = 'La solicitud se procesó exitosamente.';
        $toastClass = 'success-toast';
    } elseif ($status === 'error') {
        $toastMessage = $message === 'missing_data' ? 'Faltan datos del documento.' : 'Ocurrió un error al procesar la solicitud.';
        $toastClass = 'error-toast';
    }

    // Obtener los parámetros de la URL
    $page = isset($_GET['page']) ? (int) $_GET['page'] : 1;
    $recordsPerPage = isset($_GET['records_per_page']) ? (int) $_GET['records_per_page'] : 10;

    /* // Realizar la solicitud HTTP al endpoint para obtener el listado completo de transferencias
    $apiUrlList = "http://localhost:10020/v1/alumnos/pago-transferencia/transferencias/list?ndocu=$ndocu&tdocu=$tdocu";
    $response = @file_get_contents($apiUrlList);
    $listado = json_decode($response, true); */

    // Contar el total de registros
    $totalRecords = count($listado);
    $totalPages = ceil($totalRecords / $recordsPerPage);
    // Filtrar los registros según la página actual y la cantidad de registros por página
    $startIndex = ($page - 1) * $recordsPerPage;
    $listadoPaginado = array_slice($listado, $startIndex, $recordsPerPage);
    $bandForm = isset($_GET['bandForm']) ? $_GET['bandForm'] : !empty($listadoPaginado);  // false;
}
?>
<main class="main">
    <?php if (!(isset($_GET['token'] /* $_SESSION['tokenToValidar'] */) ? validarToken($_GET['token'] /* $_SESSION['tokenToValidar'] */) : false)): ?>
    
        <!-- el token no es valido y no se muestra el contenido -->
    <?php else: ?>
        <!-- el token es valido y se muestra el contenido -->
        <form id="form">
            <input type="hidden" id="bandForm" name="bandForm" value="<?php echo $bandForm ? 'true' : 'false'; ?>">

            <input type="hidden" name="ndocu" value="<?php echo htmlspecialchars($ndocu); ?>">
            <input type="hidden" name="tdocu" value="<?php echo htmlspecialchars($tdocu); ?>">
            <input type="hidden" name="lugar" value="<?php echo htmlspecialchars($lugar); ?>">
            <input type="hidden" name="sector" value="<?php echo htmlspecialchars($sector); ?>">
            <input type="hidden" name="carrera" value="<?php echo htmlspecialchars($carrera); ?>">
            <input type="hidden" name="modo" value="<?php echo htmlspecialchars($modo); ?>">
            <input type="hidden" name="anio" value="<?php echo htmlspecialchars($anio); ?>">
            <input type="hidden" name="token" value="<?php echo htmlspecialchars($token); ?>">

            <?php if (!empty($listadoPaginado) && $bandForm == 'true'): ?>
                <button class="btn_enviar" class="btn_enviar" onclick="changeBandForm(false)">Registrar un Pago</button>
            <?php else: ?>
                <?php if (!empty($listadoPaginado)): ?>
                    <button class="btn_enviar" class="btn_enviar" onclick="changeBandForm(true)">Volver</button>
                <?php endif; ?>
            <?php endif; ?>
        </form>
        <?php if (!empty($listadoPaginado) && $bandForm == 'true'): ?>
            <!-- Formulario para seleccionar la cantidad de registros por página -->
            <div class="cont_tabla">

                <h1 class="titulo">Historial de Pago de transferencias</h1>

                <!-- Tabla de registros -->
                <table>
                    <thead>
                        <tr>
                            <th class="th_tabla">CUIT/CUIL</th>
                            <th class="th_tabla">Concepto</th>
                            <th class="th_tabla">Fecha de Transferencia</th>
                            <th class="th_tabla">Nro de Comprobante</th>
                            <th class="th_tabla">Importe</th>
                            <th class="th_tabla">Cuenta Ucasal</th>
                        </tr>
                    </thead>
                    <?php
                    $valores = array(
                        '2850100630000800518511' => 'BANCO MACRO',
                        '072016592000000717418' => 'BANCRO SANTANDER',
                        '0110453420045320303028' => 'BANCO NACION'
                    );
                    ?>
                    <tbody>
                        <?php foreach ($listado as $listElemento): ?>
                            <tr>
                                <td class="td_tabla"><?php echo $listElemento['CUIT_EMISOR']; ?></td>
                                <td class="td_tabla"><?php echo $listElemento['CONCEPTO'] == 40 ? 'CUOTA' : 'MATRICULA'; ?></td>
                                <td class="td_tabla"><?php echo date('d/m/Y', strtotime($listElemento['FEC_TRANSFERENCIA'])); ?></td>
                                <td class="td_tabla"><?php echo $listElemento['NRO_COMPROBANTE']; ?></td>
                                <td class="td_tabla"><?php echo '$' . number_format($listElemento['IMPORTE'], 0, ',', '.'); ?></td>
                                <td class="td_tabla"><?php echo $valores[$listElemento['CTA_DESTINO']] ?? ''; ?></td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>

                <div class="paginaciones">
                    <form method="GET" action="">

                        <input type="hidden" name="ndocu" value="<?php echo htmlspecialchars($ndocu); ?>">
                        <input type="hidden" name="tdocu" value="<?php echo htmlspecialchars($tdocu); ?>">
                        <input type="hidden" name="lugar" value="<?php echo htmlspecialchars($lugar); ?>">
                        <input type="hidden" name="sector" value="<?php echo htmlspecialchars($sector); ?>">
                        <input type="hidden" name="carrera" value="<?php echo htmlspecialchars($carrera); ?>">
                        <input type="hidden" name="modo" value="<?php echo htmlspecialchars($modo); ?>">
                        <input type="hidden" name="anio" value="<?php echo htmlspecialchars($anio); ?>">
                        <input type="hidden" name="token" value="<?php echo htmlspecialchars($token); ?>">


                        <label for="records_per_page">Registros por página:</label>
                        <select name="records_per_page" id="records_per_page" onchange="this.form.submit()">
                            <option value="5" <?php echo $recordsPerPage == 5 ? 'selected' : ''; ?>>5</option>
                            <option value="10" <?php echo $recordsPerPage == 10 ? 'selected' : ''; ?>>10</option>
                            <option value="20" <?php echo $recordsPerPage == 20 ? 'selected' : ''; ?>>20</option>
                        </select>
                    </form>

                    <!-- Botones de navegación -->
                    <div class="pagination">
                        <?php if ($page > 1): ?>
                            <a href="?page=<?php echo $page - 1; ?>&records_per_page=<?php echo $recordsPerPage; ?>">Anterior</a>
                        <?php endif; ?>

                        <?php for ($i = 1; $i <= $totalPages; $i++): ?>
                            <a href="?page=<?php echo $i; ?>&records_per_page=<?php echo $recordsPerPage; ?>" <?php echo $i === $page ? 'class="active"' : ''; ?>>
                                <?php echo $i; ?>
                            </a>
                        <?php endfor; ?>

                        <?php if ($page < $totalPages): ?>
                            <a href="?page=<?php echo $page + 1; ?>&records_per_page=<?php echo $recordsPerPage; ?>">Siguiente</a>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        <?php else: ?>
            <form class="form" id="paymentForm" method="POST" enctype="multipart/form-data">
                <!-- Otros campos del formulario, estos sirven, para poder insertar el concepto -->
                <input type="hidden" name="tdocu" id="tdocuHidden">
                <input type="hidden" name="ndocu" id="ndocuHidden">
                <input type="hidden" name="lugar" id="lugarHidden">
                <input type="hidden" name="sector" id="sectorHidden">
                <input type="hidden" name="carrera" id="carreraHidden">
                <input type="hidden" name="modo" id="modoHidden">
                <input type="hidden" name="concepto" id="conceptoHidden">
                <input type="hidden" name="fecApli" id="fecApliHidden">
                <input type="hidden" name="debe1" id="debe1Hidden">
                <input type="hidden" name="debe2" id="debe2Hidden">
                <input type="hidden" name="fvto1" id="fvto1Hidden">
                <input type="hidden" name="fvto2" id="fvto2Hidden">
                <input type="hidden" name="imprimir" id="imprimirHidden">
                <input type="hidden" name="txtConcepto" id="txtConceptoHidden">
                <input type="hidden" name="anioCalen" id="anioCalenHidden">
                <input type="hidden" name="arancel100" id="arancel100Hidden">
                <input type="hidden" name="promoId" id="promoIdHidden">

                <h2>Pago por Transferencia</h2>
                <!-- Campos del formulario -->
                <div class="cont_input">
                    <p class='txt_label'> <span style="color:blue; font-weight:900 ">*</span> CUIT/CUIL (del ordenante):</p>
                    <input type="number" name="cuit_cuil" required>
                </div>
                <div class="cont_input">
                    <p class='txt_label'> <span style="color:blue; font-weight:900 ">*</span> Concepto:</p>
                    <select name="concepto" id="conceptoSelect" required onchange="updateSelectedConcept()" data-tcarrera=<?php echo $tipo_carrera; ?>>
                        <option value="">Seleccione un concepto</option>
                        <?php if (is_array($conceptos)): ?>
                            <?php foreach ($conceptos as $concepto): ?>
                                <option value="<?php echo $concepto['concepto']; ?>"
                                    data-tdocu="<?php echo $concepto['tdocu']; ?>"
                                    data-ndocu="<?php echo $concepto['ndocu']; ?>"
                                    data-lugar="<?php echo $concepto['lugar']; ?>"
                                    data-sector="<?php echo $concepto['sector']; ?>"
                                    data-carrera="<?php echo $concepto['carrera']; ?>"
                                    data-modo="<?php echo $concepto['modo']; ?>"
                                    data-concepto="<?php echo $concepto['concepto']; ?>"
                                    data-fecApli="<?php echo $concepto['fecApli']; ?>"
                                    data-debe1="<?php echo $concepto['debe1']; ?>"
                                    data-debe2="<?php echo $concepto['debe2']; ?>"
                                    data-fvto1="<?php echo $concepto['fvto1']; ?>"
                                    data-imprimir="<?php echo $concepto['imprimir']; ?>"
                                    data-txtConcepto="<?php echo $concepto['txtConcepto']; ?>"
                                    data-anioCalen="<?php echo $concepto['anioCalen']; ?>"
                                    data-arancel100="<?php echo $concepto['arancel100']; ?>"
                                    data-promoId="<?php echo $concepto['promoId']; ?>">
                                    <?php echo $concepto['txtConcepto'] . ' ' . obtenerMesYAnio($concepto['fecApli']) . ' - 1° Vto $' . $concepto['debe1'] . ' / 2° Vto $' . $concepto['debe2']; ?>
                                </option>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </select>
                </div>
                <div class=" cont_input">
                    <p class='txt_label'> <span style="color:blue; font-weight:900 ">*</span> Fecha de transferencia:</p>
                    <input type="date" name="fecha_transferencia" required>
                </div>
                <div class="cont_input">
                    <p class='txt_label'> <span style="color:blue; font-weight:900 ">*</span> Nro de comprobante:</p>
                    <input type="text" name="nro_comprobante" required>
                </div>
                <div class="cont_input">
                    <p class='txt_label'> <span style="color:blue; font-weight:900 ">*</span> Subir comprobante:</p>
                    <input type="file" name="archivo_comprobante">
                </div>
                <div class="cont_input">
                    <p class='txt_label'> <span style="color:blue; font-weight:900 ">*</span> Importe:</p>
                    <input type="number" name="importe" step="0.01" required>
                </div>
                <div class="cont_input">
                    <p class='txt_label'> <span style="color:blue; font-weight:900 ">*</span> Cta Ucasal a la que se transfiere:</p>
                    <select name="cta_ucasal" required>
                        <option value="">Seleccione una cuenta</option>
                        <option value="2850100630000800518511">BANCO MACRO
                            CUENTA CORRIENTE 310000080051851 CBU 2850100630000800518511
                        </option>
                        <option value="072016592000000717418">BANCO SANTANDER
                            CUENTA CORRIENTE 165-007174/1 CBU 072016592000000717418
                        </option>
                        <option value="0110453420045320303028">BANCO NACION
                            CUENTA CORRIENTE 30704532030302 CBU 0110453420045320303028</option>
                    </select>
                </div>
                <button class="btn_enviar" type="submit">Enviar</button>
            </form>
        <?php endif; ?>
    <?php endif; ?>
</main>
<?php if (!empty($toastMessage)): ?>
    <div class="toast <?php echo $toastClass; ?>" id="toastMessage">
        <?php echo $toastMessage; ?>
    </div>
    <script>
        // Desaparece el mensaje de toast después de 5 segundos
        setTimeout(function() {
            const toast = document.getElementById('toastMessage');
            if (toast) {
                toast.style.transition = "opacity 0.5s ease";
                toast.style.opacity = "0";
                setTimeout(function() {
                    toast.style.display = "none";
                }, 500); // Espera que la transición termine antes de ocultarlo completamente
            }
        }, 5000); // 5000ms = 5 segundos
    </script>
<?php endif; ?>
<script>
    async function updateSelectedConcept() {
        let select = document.getElementById('conceptoSelect');
        let selectedOption = select.options[select.selectedIndex];

        let tcarrera = select.getAttribute('data-tcarrera')

        let concepto = {
            tdocu: selectedOption.getAttribute('data-tdocu'),
            ndocu: selectedOption.getAttribute('data-ndocu'),
            lugar: selectedOption.getAttribute('data-lugar'),
            sector: selectedOption.getAttribute('data-sector'),
            carrera: selectedOption.getAttribute('data-carrera'),
            modo: selectedOption.getAttribute('data-modo'),
            concepto: selectedOption.getAttribute('data-concepto'),
            fecApli: selectedOption.getAttribute('data-fecApli'),
            debe1: selectedOption.getAttribute('data-debe1'),
            debe2: selectedOption.getAttribute('data-debe2'),
            fvto1: selectedOption.getAttribute('data-fvto1'),
            fvto2: selectedOption.getAttribute('data-fvto2'),
            imprimir: 'Si', // selectedOption.getAttribute('data-imprimir'),
            txtConcepto: selectedOption.getAttribute('data-txtConcepto'),
            anioCalen: selectedOption.getAttribute('data-anioCalen'),
            arancel100: selectedOption.getAttribute('data-arancel100'),
            promoId: selectedOption.getAttribute('data-promoId')
        }
        // Llenar los campos ocultos del formulario
        document.getElementById('tdocuHidden').value = concepto.tdocu;
        document.getElementById('ndocuHidden').value = concepto.ndocu;
        document.getElementById('lugarHidden').value = concepto.lugar;
        document.getElementById('sectorHidden').value = concepto.sector;
        document.getElementById('carreraHidden').value = concepto.carrera;
        document.getElementById('modoHidden').value = concepto.modo;
        document.getElementById('conceptoHidden').value = concepto.concepto;
        document.getElementById('fecApliHidden').value = concepto.fecApli;
        document.getElementById('debe1Hidden').value = concepto.debe1;
        document.getElementById('debe2Hidden').value = concepto.debe2;
        document.getElementById('fvto1Hidden').value = concepto.fvto1;
        document.getElementById('fvto2Hidden').value = concepto.fvto2;
        document.getElementById('imprimirHidden').value = concepto.imprimir;
        document.getElementById('txtConceptoHidden').value = concepto.txtConcepto;
        document.getElementById('anioCalenHidden').value = concepto.anioCalen;
        document.getElementById('arancel100Hidden').value = concepto.arancel100;
        document.getElementById('promoIdHidden').value = concepto.promoId;

        console.log(selectedOption, concepto)
        // document.getElementById('selectedConcepto').value = select.value;
    }

    function changeBandForm(value) {
        // Actualizar el valor del campo oculto
        document.getElementById('bandForm').value = value;

        // Enviar el formulario para actualizar el valor en el servidor
        // document.getElementById('form').submit();
    }
    // Seleccionar todos los campos del formulario y el botón de enviar
    const fields = document.querySelectorAll('#paymentForm input, #paymentForm select');
    const submitBtn = document.getElementById('submitBtn');
    // Función para verificar si todos los campos están completos
    function checkForm() {
        let allFieldsFilled = true;
        // Recorrer todos los campos para verificar si están llenos
        fields.forEach(field => {
            if (field.value === '') {
                allFieldsFilled = false;
            }
        });
        // Habilitar o deshabilitar el botón de enviar
        //submitBtn.disabled = !allFieldsFilled;
    }
    // Añadir un evento 'input' y 'change' a todos los campos para verificar en tiempo real
    fields.forEach(field => {
        field.addEventListener('input', checkForm);
        field.addEventListener('change', checkForm);
    });
    // Ejecutar la función al cargar la página para el estado inicial
    checkForm();
</script>