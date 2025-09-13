<?php
$autoloadCandidates = [
  __DIR__ . '/vendor/autoload.php',
  dirname(__DIR__) . '/vendor/autoload.php',
];
$autoload = null;
foreach ($autoloadCandidates as $candidate) {
  if (file_exists($candidate)) { $autoload = $candidate; break; }
}
if (!$autoload) { http_response_code(500); echo 'Autoloader not found'; exit; }
require $autoload;

use Dompdf\Dompdf;
use Dompdf\Options;

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: POST, OPTIONS');
  header('Access-Control-Allow-Headers: Content-Type, Accept');
  exit;
}
header('Access-Control-Allow-Origin: *');

$raw = file_get_contents('php://input');
$input = json_decode($raw, true);
$html = is_array($input) && isset($input['html']) ? (string)$input['html'] : '';

if ($html === '') {
  http_response_code(400);
  echo 'Missing html';
  exit;
}

$options = new Options();
$options->set('isRemoteEnabled', true);
$options->set('isHtml5ParserEnabled', true);

$dompdf = new Dompdf($options);
$dompdf->loadHtml($html, 'UTF-8');
$dompdf->setPaper('A4', 'portrait');

try {
  $dompdf->render();
  $pdf = $dompdf->output();

  if (ob_get_length()) ob_end_clean();
  header('Content-Type: application/pdf');
  header('Content-Disposition: attachment; filename="Leonid-Vinikov-Resume.pdf"');
  header('Content-Transfer-Encoding: binary');
  header('Accept-Ranges: bytes');
  header('Content-Length: ' . strlen($pdf));
  echo $pdf;
  exit;
} catch (Throwable $e) {
  http_response_code(500);
  echo 'Render error';
  exit;
}