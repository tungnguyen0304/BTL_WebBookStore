<?php
# Check if this product is in DB, return error meesage if any
function check_product_ID($conn, $ID)
{
    // 0: ID tồn tại.
    // 1: ID không tồn tại.
    // 2: Lỗi thực thi câu lệnh SQL.

    $qry = "SELECT * 
            FROM product 
            WHERE ID = ?";
    $stmt = mysqli_prepare($conn, $qry);
    mysqli_stmt_bind_param($stmt, 's', $ID);
    $success = mysqli_stmt_execute($stmt);

    if ($success) {
        // Store result for use with mysqli_stmt_num_rows
        mysqli_stmt_store_result($stmt);  

        if (mysqli_stmt_num_rows($stmt) != 1) {
            return 1;
        } else {
            return 0;
        }
    }

    return 2;
}

function name_is_changed($conn, $ID, $name)
{
    $qry = "SELECT name 
            FROM product 
            WHERE ID = ?";
    $stmt = mysqli_prepare($conn, $qry);
    mysqli_stmt_bind_param($stmt, 's', $ID);
    $success = mysqli_stmt_execute($stmt);
    
    if ($success) {
        // Store result for use with mysqli_stmt_num_rows
        mysqli_stmt_store_result($stmt);  

        if (mysqli_stmt_num_rows($stmt) == 1) {
            // Get name in the result
            mysqli_stmt_bind_result($stmt, $resultName);
            mysqli_stmt_fetch($stmt);

            if ($name == $resultName) {
                return false;
            }
        }
    }

    return true;
}

function check_product_available($conn, $productID, $qty)
{
    // 0: Sản phẩm có hàng và đủ số lượng.
    // 1: Sản phẩm không còn hàng.
    // 2: Số lượng không đủ.

    // Check if the product is in stock
    $select_product_query = "SELECT current_qty, in_stock 
                            FROM product 
                            WHERE ID = ?";
    $stmt = mysqli_prepare($conn, $select_product_query);
    mysqli_stmt_bind_param($stmt, "i", $productID);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_bind_result($stmt, $current_qty, $in_stock);
    mysqli_stmt_fetch($stmt);
    mysqli_stmt_close($stmt);

    // If the product is not in stock, return 1
    if (!$in_stock) {
        return 1;
    }

    // Check if the available quantity is enough ?
    if ($current_qty < $qty) {
        // If the available quantity is not enough, return 2 (Số lượng hiện tại < Số lượng muốn mua)
        return 2;
    }

    return 0;
}

function get_product_price($conn, $productID)
{
    // Prepare the SQL query to retrieve the price of the product with the given ID
    $query =   "SELECT price 
                FROM product 
                WHERE ID = ?";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "i", $productID);
    mysqli_stmt_execute($stmt);

    // Get the result of the query
    mysqli_stmt_bind_result($stmt, $price);
    mysqli_stmt_fetch($stmt);

    // Close the database connection and return the price
    mysqli_stmt_close($stmt);
    return $price;
}

function update_product_qty($conn, $productID, $qty)
{
    // Update the sold and current quantity of the product
    $update_product_query = "UPDATE product 
                            SET sold_qty = sold_qty + ?, current_qty = current_qty - ? 
                            WHERE ID = ?";
    $stmt = mysqli_prepare($conn, $update_product_query);
    mysqli_stmt_bind_param($stmt, "iii", $qty, $qty, $productID);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);
}
