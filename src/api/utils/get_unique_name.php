<?php
function convert_vi_to_en($str)
{
    $str = preg_replace("/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/", "a", $str);
    $str = preg_replace("/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/", "e", $str);
    $str = preg_replace("/(ì|í|ị|ỉ|ĩ)/", "i", $str);
    $str = preg_replace("/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/", "o", $str);
    $str = preg_replace("/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/", "u", $str);
    $str = preg_replace("/(ỳ|ý|ỵ|ỷ|ỹ)/", "y", $str);
    $str = preg_replace("/(đ)/", "d", $str);
    $str = preg_replace("/(À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ)/", "A", $str);
    $str = preg_replace("/(È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ)/", "E", $str);
    $str = preg_replace("/(Ì|Í|Ị|Ỉ|Ĩ)/", "I", $str);
    $str = preg_replace("/(Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ)/", "O", $str);
    $str = preg_replace("/(Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ)/", "U", $str);
    $str = preg_replace("/(Ỳ|Ý|Ỵ|Ỷ|Ỹ)/", "Y", $str);
    $str = preg_replace("/(Đ)/", "D", $str);

    return $str;
}
function get_unique_name($conn, $str)
{
    $str = convert_vi_to_en($str);

    // Thay thế các ký tự không phải chữ cái/ số bằng dấu '-'
    $str = preg_replace('/[^\\pL\d]+/u', '-', $str);

    // Xóa dấu '-' ở đầu và cuối chuỗi
    $str = trim($str, '-');

    // Chuyển chuỗi về chữ thường
    $str = strtolower($str);

    // Thay các ký tự không phải a-z hoặc 0-9 bằng dấu '-'
    $str = preg_replace('/[^a-z0-9]+/i', '-', $str);

    // Loại bỏ các dấu '-' lặp lại
    $str = preg_replace('/--+/', '-', $str);

    // Check if unique_name already exists
    $result = mysqli_query($conn, "SELECT unique_name 
                                                FROM product 
                                                WHERE unique_name = '$str'");

    if (mysqli_num_rows($result) > 0) {
        $i = 1;

        while (true) {
            $newStr = $str . "-" . $i;
            $result = mysqli_query($conn, "SELECT unique_name 
                                                        FROM product 
                                                        WHERE unique_name = '$newStr'");

            if (mysqli_num_rows($result) == 0) {
                $str = $newStr;
                break;
            }

            $i++;
        }
    }

    // Return the resulting unique name
    return $str;
}
