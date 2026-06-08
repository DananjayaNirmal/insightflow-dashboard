<?php
require_once "../config/db.php";

$result = $conn->query("SELECT * FROM insights ORDER BY created_at DESC");

$rows = [];
while ($row = $result->fetch_assoc()) {
    $rows[] = $row;
}

echo json_encode($rows);
?>
