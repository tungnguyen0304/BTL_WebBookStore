<?php
function test_input($data)
{
    // Remove spaces at the beginning and end of a string.
    $data = trim($data);

    // Removes backslashes (\) characters from data. This is necessary because when users enter special characters like \', \", PHP often adds backslashes to protect these characters.
    // For example, the string "O\'Reilly" after applying stripslashes() will become "O'Reilly".
    $data = stripslashes($data);

    // Convert special characters to HTML entities to avoid Cross-Site Scripting (XSS) attacks.
    $data = htmlspecialchars($data);
    
    return $data;
}
