<?php
require_once "../config/db.php";

$data = json_decode(file_get_contents("php://input"), true);
$insight = $data["insight"];

$stmt = $conn->prepare("INSERT INTO insights (insight_text) VALUES (?)");
$stmt->bind_param("s", $insight);
$stmt->execute();

echo json_encode(["status" => "success"]);
?>
