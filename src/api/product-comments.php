<?php
require_once('cors.php');
require_once('DBConnect.php');

// Get the productID parameter from the request
$productID = isset($_GET['productID']) ? $_GET['productID'] : '';

// Fetch all comments for the given productID
$sql = "SELECT pc.*, u.username, u.role AS userRole 
        FROM product_comment pc 
        JOIN user u ON pc.userID = u.ID 
        WHERE pc.productID = '$productID' AND pc.status IS NULL";
$result = mysqli_query($conn, $sql);

// Return the comments as a JSON array
$comments = array();
while ($row = mysqli_fetch_assoc($result)) {
    $comments[] = $row;
}
header('Content-Type: application/json');
echo json_encode($comments);

// Close the database connection
mysqli_close($conn);
?>