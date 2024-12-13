<?php
session_start();
# 0: Ok
# 1: User logged out or session timed out -> Redirect user to Re-login
# 2: Unauthorized access

// Check Admin
function check_admin_access()
{
    // Check if the user is logged in and has the 'role' field set in the session variable
    if (isset($_SESSION['ID']) && isset($_SESSION['role'])) {
        $role = $_SESSION['role'];

        // Check if the User is an Admin (role = 1)
        if ($role == 1) {
            return;
        } else {
            // Other users don't have access to the comment-retrieval action
            http_response_code(401);
            die("Unauthorized access");
        }
    } else {
        // User is not logged in
        http_response_code(408);
        die("Session has timed out or user is not logged in");
    }
}

// Check User
function check_user_access()
{
    // Check if the user is logged in and has the 'role' field set in the session variable. Normal User (role = 0)
    if (isset($_SESSION['ID']) && isset($_SESSION['role'])) {
        return;
    } else {
        // User is not logged in
        http_response_code(408);
        die("Session has timed out or user is not logged in");
    }
}
