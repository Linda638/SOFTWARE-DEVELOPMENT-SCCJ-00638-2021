<?php
$host = "localhost";
$username = "root";
$password = "";
$database = "todolistdb";

// Create a connection
$conn = mysqli_connect($host, $username, $password, $database);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Handle sign-up form submission
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Retrieve form data
    $firstName = $_POST["req1"];
    $lastName = $_POST["letters"];
    $dateOfBirth = $_POST["date"];
    $email = $_POST["emailer"];
    $password = $_POST["password"];
    $confirmPassword = $_POST["confirmPassword"];

    // Check if password and confirm password match
    if ($password !== $confirmPassword) {
        echo '<script>alert("Error: Passwords do not match!"); window.location.href = "signup.html";</script>';
        exit();
    }

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo '<script>alert("Error: Invalid email format!"); window.location.href = "signup.html";</script>';
        exit();
    }

    // Insert user data into the "users" table
    $sql = "INSERT INTO users (first_name, last_name, date_of_birth, email, password) VALUES ('$firstName', '$lastName', '$dateOfBirth', '$email', '$password')";
    
    if (mysqli_query($conn, $sql)) {
        // User registered successfully
        echo '<script>alert("Registration successful!"); window.location.href = "home.html";</script>';
        exit();
    } else {
        // Error occurred
        echo "Error: " . mysqli_error($conn);
    }
}

mysqli_close($conn);
?>
