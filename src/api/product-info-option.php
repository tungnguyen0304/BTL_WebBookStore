<?php
require_once('cors.php');
require_once('DBConnect.php');

# Get categories list
$categoriesList = $conn->query( "SELECT * 
                                        FROM category");
$categoriesList = $categoriesList->fetch_all(MYSQLI_ASSOC);

# Convert ID from string (default) to int
foreach ($categoriesList as &$row) {
    $row['ID'] = (int) $row['ID'];
}

# Get authors list
$authorList = $conn->query( "SELECT * 
                                    FROM author");
$authorList = $authorList->fetch_all(MYSQLI_ASSOC);

# Convert ID from string (default) to int
foreach ($authorList as &$row) {
    $row['ID'] = (int) $row['ID'];
}

# Get manufacturers list
$manufacturerList = $conn->query("SELECT * 
                                        FROM manufacturer");
$manufacturerList = $manufacturerList->fetch_all(MYSQLI_ASSOC);

# Convert ID from string (default) to int
foreach ($manufacturerList as &$row) {
    $row['ID'] = (int) $row['ID'];
}

$res = array(
    "categoriesList" => json_encode($categoriesList),
    "authorsList" => json_encode($authorList),
    "manufacturersList" => json_encode($manufacturerList)
);

header('Content-Type: application/json');
echo json_encode($res);

// Close DB Connection
mysqli_close($conn);
