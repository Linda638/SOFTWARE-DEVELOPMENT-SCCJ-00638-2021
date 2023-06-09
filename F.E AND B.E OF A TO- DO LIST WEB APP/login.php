<?php
session_start();

$host = "localhost";
$username = "root";
$password = "";
$database = "todolistdb";

// Create a connection
$conn = mysqli_connect($host, $username, $password, $database);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Handle login form submission
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Retrieve form data
    $email = $_POST["email"];
    $password = $_POST["password"];

    // Verify user credentials
    $sql = "SELECT * FROM users WHERE email = '$email' AND password = '$password'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) === 1) {
        // User found, login successful
        $_SESSION['email'] = $email; // Set the email in the session
        header("Location: home.html");
        exit();
    } else {
        // Invalid credentials
        echo '<script>alert("Invalid email or password."); window.location.href = "login.html";</script>';
    }
}

mysqli_close($conn);
?>
