<?php
$servername = "localhost";
$username = "root";
$password = "0918600051MySQL";
$dbname = "bookstore";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
