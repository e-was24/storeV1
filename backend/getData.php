<?php
$json = file_get_contents('data/data.json');
$data = json_decode($json, true);

// cek apakah decoding berhasil
if (is_array($data)) {
    // Filter hanya yang sale = true
    $onSaleItems = array_filter($data, function($item) {
        return isset($item['seller_product_status']) && $item['seller_product_status'] === true;
    });

    echo "<h2>Daftar Produk</h2>";
    echo "<ul>";
    foreach ($onSaleItems as $item) {
        echo "<li>";
        echo "Category: " . htmlspecialchars($item['category'] ?? 'N/A') . " | ";
        echo "Brand: " . htmlspecialchars($item['brand'] ?? 'N/A') . " | ";
        echo "Harga: Rp" . number_format((float)($item['price'] ?? 0), 0, ",", ".");
        echo "</li>";
    }
    echo "</ul>";
} else {
    echo "Gagal membaca data";
}
?>
