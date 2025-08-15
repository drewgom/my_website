<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

// Define allowed image extensions
$allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'JPG', 'JPEG', 'PNG', 'GIF', 'WEBP'];

// Get the current directory
$directory = __DIR__;

// Array to store image filenames
$images = [];

try {
    // Scan the directory for files
    $files = scandir($directory);
    
    foreach ($files as $file) {
        // Skip current and parent directory indicators
        if ($file === '.' || $file === '..') {
            continue;
        }
        
        // Get file extension
        $extension = pathinfo($file, PATHINFO_EXTENSION);
        
        // Check if it's an image file and if the file actually exists
        if (in_array($extension, $allowedExtensions) && is_file($directory . '/' . $file)) {
            $images[] = $file;
        }
    }
    
    // Sort images alphabetically for consistent ordering
    sort($images);
    
    // Return JSON response
    echo json_encode([
        'success' => true,
        'images' => $images,
        'count' => count($images),
        'generated' => date('Y-m-d H:i:s')
    ]);
    
} catch (Exception $e) {
    // Return error response
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Failed to read directory',
        'message' => $e->getMessage()
    ]);
}
?>