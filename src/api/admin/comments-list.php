<?php
// Get list of comments (Admin only)

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once('../cors.php');

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    require_once('../DBConnect.php');
    require_once('../utils/test_input.php');
    require_once('../utils/check_access.php');

    // Check admin access
    check_admin_access();

    // Sanitize and validate the q parameter
    $q = isset($_GET['q']) ? test_input($_GET['q']) : '';

    // Prepare a statement to fetch comments
    if ($q === '') {
        // If there are no search parameters, the API will fetch all comments from "product_comment" table along with the information: 
        // u.username: User name (from the user table). p.name: Product name (from the product table).
        $stmt = mysqli_prepare($conn, 'SELECT c.*, u.username AS user_name, p.name AS product_name 
                                                    FROM product_comment c 
                                                    LEFT JOIN user u ON c.userID = u.ID 
                                                    LEFT JOIN product p ON c.productID = p.ID');
    } else {
        // In case of search parameters.
        // Add a LIKE filter condition to search for a partial string match in c.content (comment content).
        $q = '%' . $q . '%';
        $stmt = mysqli_prepare($conn, 'SELECT c.*, u.name AS user_name, p.name AS product_name 
                                                    FROM product_comment c 
                                                    LEFT JOIN user u ON c.userID = u.ID 
                                                    LEFT JOIN product p ON c.productID = p.ID 
                                                    WHERE c.content LIKE ?');
        mysqli_stmt_bind_param($stmt, 's', $q);
    }

    // Execute the statement and fetch the results
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $comments = mysqli_fetch_all($result, MYSQLI_ASSOC);

    if ($comments) {
        header('Content-Type: application/json');
        echo json_encode($comments);
    } else {
        http_response_code(404);
        echo "No comments match";
    }

    // Close the statement and connection
    mysqli_stmt_close($stmt);
    mysqli_close($conn);
}
