<?php 
session_start();

require_once('cors.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    require_once('DBConnect.php');
    require_once('utils/test_input.php');   
    require_once('utils/user_info_utils.php');
    require_once('utils/get_user_info.php');
    require_once('utils/check_access.php');

    // Check user 
    check_user_access();

    // Get POST data from client
    $post_data = json_decode(file_get_contents('php://input'), true);    
    $name = test_input($post_data['name']);
    $phone = test_input($post_data['phone']);
    $email = test_input($post_data['email']);
    $address = test_input($post_data['address']);

    # Get ID of user
    $ID = $_SESSION['ID'];

    // Check validity
    $errors = array();

    // Check validity
    if (!checkName($name)) {
        $errors['name'] = "Tên không được trống và ít hơn 50 ký tự bao gồm các ký tự Việt Nam và khoảng trắng";
    } 

    if (!empty($phone)) {
        if (!checkPhone($phone)) {
            $errors['phone'] = "SĐT không hợp lệ";
        }
    }

    if (!empty($email)) {
        if (!checkEmail($email)) {
            $errors['email'] = "Email không hợp lệ";
        }    
    }   

    if (strlen($address) > 255) {
        $errors['address'] = "Địa chỉ phải ít hơn 255 ký tự";
    }    

    if (!empty($errors)) {
        http_response_code(400); // invalid user input
        header('Content-Type: application/json');
        echo json_encode($errors);
        mysqli_close($conn);
        exit();
    }

    $userData = getUserInfoByID($conn, $ID);

    if (!$userData) {
        http_response_code(500);
        echo "Access database failed";        
        mysqli_close($conn);
        exit();
    }

    $prevPhone = $userData['phone'];
    $prevEmail = $userData['email'];

    # Check if phone, email is conflict
    if (!empty($phone) && $prevPhone != $phone && checkPhoneUsedByOthers($conn, $phone)) {
        $errors['phone'] = "Số điện thoại đã được sử dụng, vui lòng sử dụng số điện thoại khác";
    }
    if (!empty($email) && $prevPhone != $email && checkEmailUsedByOthers($conn, $email)) {
        $errors['email'] = "Email đã được sử dụng, vui lòng sử dụng email khác";
    }    
    
    if (!empty($errors)) {
        http_response_code(409); // conflict
        header('Content-Type: application/json');
        echo json_encode($errors);
        mysqli_close($conn);
        exit();
    }    

    $qry = "UPDATE user
            SET name = ?, phone = ?, email = ?, address = ?
            WHERE ID = ?";
    $stmt = mysqli_prepare($conn, $qry);
    mysqli_stmt_bind_param($stmt, 'sssss', $name, $phone, $email, $address, $ID);

    // Update data in the database
    $success = mysqli_stmt_execute($stmt);         

    // If the insert was successful, return a success message
    if ($success) {
        echo "User edited successfully";
    } else {
        http_response_code(500);
        echo "Access database failed";
    }    
    
    // Close DB Connection
    mysqli_close($conn);
}
?>