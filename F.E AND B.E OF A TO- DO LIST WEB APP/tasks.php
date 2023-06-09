<?php
$host = "localhost";
$username = "root";
$password = "";
$database = "todolistdb";

// Create a connection
$connection = mysqli_connect($host, $username, $password, $database);

// Check connection
if (!$connection) {
    die("Connection failed: " . mysqli_connect_error());
}

// Perform a simple query to fetch tasks
$query = "SELECT * FROM tasks";
$result = mysqli_query($connection, $query);

if ($result) {
    // Fetch rows from the result set
    $tasks = array();
    while ($row = mysqli_fetch_assoc($result)) {
        // Add each task to the array
        $tasks[] = $row;
    }

    // Convert the tasks array to JSON
    $jsonTasks = json_encode($tasks);

    // Send the JSON response
    header('Content-Type: application/json');
    echo $jsonTasks;

    // Free the result set
    mysqli_free_result($result);
} else {
    echo "Error executing query: " . mysqli_error($connection);
}

// Close the connection
mysqli_close($connection);
?>
