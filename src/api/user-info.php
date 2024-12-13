<?php
require_once('cors.php');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    require_once('DBConnect.php');
    require_once('utils/check_access.php');
    require_once('utils/get_user_info.php');

    if (!isset($_SESSION['ID'])) {
        http_response_code(401); // Unauthorized
        echo json_encode(["message" => "User not logged in."]);
        exit;
    }

    check_user_access();

    $ID = isset($_SESSION['ID']) ? (int)$_SESSION['ID'] : 0; // Ép kiểu ID thành số nguyên

    // Kiểm tra ID có hợp lệ ?
    if ($ID === 0) {
        http_response_code(400);
        echo "Invalid User ID";
        exit;
    }

    // Get data from the database
    $result = getUserInfoByID($conn, $ID);

    // Nếu truy vấn thành công, trả về dữ liệu người dùng
    if ($result) {
        header('Content-Type: application/json');
        echo json_encode($result);
    } else {
        http_response_code(404);
        echo "User " . $ID . " not found";
    }

    // Close DB Connection
    mysqli_close($conn);
}
