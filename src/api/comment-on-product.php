<?php
session_start();

require_once('cors.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    require_once('DBConnect.php');
    require_once('utils/test_input.php');
    require_once('utils/check_access.php');

    check_user_access();

    // Get the userID from the Session Variable
    $userID = $_SESSION['ID'];
    $username = $_SESSION['username'];
    $userRole = $_SESSION['role'];

    // Read the raw Request-body and Decode it as JSON
    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body);

    // Extract the productID and content values from the JSON data
    $productID = isset($data->productID) ? test_input($data->productID) : '';
    $content = isset($data->content) ? test_input($data->content) : '';

    // Check if the required fields are not empty
    if ($productID !== '' && $content !== '') {
        // Prepare the SQL statement to insert the comment and to avoid SQL Injection errors.
        $stmt = mysqli_prepare($conn, 'INSERT INTO product_comment (userID, productID, content, comment_datetime) 
                                                    VALUES (?, ?, ?, NOW())');

        // Bind variables to SQL queries.
        mysqli_stmt_bind_param($stmt, 'iis', $userID, $productID, $content);

        // Execute the statement and check if the insertion was successful
        if (mysqli_stmt_execute($stmt)) {
            // Insertion successful, retrieve the inserted comment from the database. 
            // Sending this data back allows the client to display the new comment directly without having to make another GET request to reload the entire comment list.
            $commentID = mysqli_stmt_insert_id($stmt);

            $stmt = mysqli_prepare($conn, 'SELECT * 
                                                        FROM product_comment 
                                                        WHERE ID = ?');
            mysqli_stmt_bind_param($stmt, 'i', $commentID);
            mysqli_stmt_execute($stmt);

            $result = mysqli_stmt_get_result($stmt);

            // Convert the result to an associative array. Each column of the table will become an element in the array, with the column name as 'key' and the corresponding value as 'value'.
            $comment = mysqli_fetch_assoc($result);

            // Add additional information to the comments array:
            $comment['username'] = $username;
            $comment['userRole'] = $userRole;

            // Set the content type of the response and return data. Set a header to tell the browser or client that the response body will be in JSON format.
            header('Content-Type: application/json');

            // Encode the $comment array into a JSON string and output it to send back to the client.
            echo json_encode($comment);
        } else {
            // Insertion failed, return an error message
            http_response_code(500);
            echo "Error inserting comment into database";
        }

        // Close the statement and connection. Close mysqli_stmt, which releases the resources associated with the prepared statement ($stmt). This close helps avoid unnecessary resource usage.
        mysqli_stmt_close(statement: $stmt);
        
        // Close the connection to the database ($conn). This also saves resources, avoiding unnecessary connections to existing databases.
        mysqli_close($conn);
    } else {
        // Required fields are empty, return a bad request error
        http_response_code(400);
        echo "Missing or invalid parameters";
    }
}
