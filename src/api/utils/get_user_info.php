<?php
function getUserInfoByUsername($conn, $username)
{
    // Prepare the SELECT statement
    $stmt = mysqli_prepare($conn, "SELECT * 
                                                FROM user 
                                                WHERE username = ?");
    mysqli_stmt_bind_param($stmt, "s", $username);
    $success = mysqli_stmt_execute($stmt);

    if ($success) {
        $result = mysqli_stmt_get_result($stmt);
        $data = mysqli_fetch_assoc($result);

        return $data;
    } else {
        return null;
    }
}

function getUserInfoByID($conn, $ID)
{
    // Prepare the SELECT statement
    $stmt = mysqli_prepare($conn, "SELECT name, username, address, email, phone 
                                                FROM user 
                                                WHERE ID = ?");

    if (!$stmt) {
        error_log("Prepare statement failed: " . mysqli_error($conn));

        return null;
    }

    // Bind the ID parameter (integer)
    mysqli_stmt_bind_param($stmt, "i", $ID);

    // Execute the statement
    $success = mysqli_stmt_execute($stmt);

    if ($success) {
        // Fetch and return the user data
        $result = mysqli_stmt_get_result($stmt);
        $data = mysqli_fetch_assoc($result);

        return $data;
    } else {
        error_log("Execute statement failed: " . mysqli_error($conn));

        return null;
    }
}
