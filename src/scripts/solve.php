<?php
$size = $_GET["size"];
$epsilon = $_GET["e"];
$matrix_a = array();
for ($i=1; $i <= $size; $i++) {
  for ($j=1; $j <= $size; $j++){
    $matrix_a[$i][$j] = $_GET["a".$i.$j];
  }
}

// проверка сходимости
$equal_1 = 1;
for ($i=1; $i <= $size; $i++) {
  $sum = 0;
  for ($j=1; $j <= $size; $j++){
    if ($j !== $i){
      $sum = $sum + abs($matrix_a[$i][$j]);
    }
  }
  if (abs($matrix_a[$i][$i]) <= $sum){
    $equal_1 = 0;
  }
}
$equal_2 = 1;
if ($equal_1 === 0) {
  for ($j = 1; $j <= $size; $j++) {
    $sum = 0;
    for ($i=1; $i <= $size; $i++){
      if ($j !== $i){
        $sum = $sum + abs($matrix_a[$i][$j]);
      }
    }
    if (abs($matrix_a[$j][$j]) <= $sum){
      $equal_2 = 0;
    }
  }
}
$solve = array();
if ($equal_1 === 1 && $equal_2 === 1){
  $vector_b = array();
  $matrix_alpha = array();
  $vector_beta = array();
  $delta = array();

  $new_solve = array();

  for ($i=1; $i <= $size; $i++){
    $vector_b[$i] = $_GET["b".$i];
  }

  for ($i=1; $i <= $size; $i++)
    for ($j=1; $j <= $size; $j++){
      if ($i !== $j){
        $matrix_alpha[$i][$j] = -$matrix_a[$i][$j]/$matrix_a[$i][$i];
      } else {
        $matrix_alpha[$i][$i] = 0;
      }
  }
  for ($i=1; $i <= $size; $i++){
    $vector_beta[$i] = $vector_b[$i] / $matrix_a[$i][$i];
  }

  //начальние приближение
  for ($i=1; $i <= $size; $i++){
    $solve[$i] = $vector_beta[$i];
  }

  for ($i=1; $i <= $size; $i++){
    $new_solve[$i] = 0;
  }
  // норма матрицы альфа
  $norma_alpha = 0;
  for ($i = 1; $i <= $size; $i++ ){
    $sum = 0;
    for ($j = 1; $j <= $size; $j++ ){
      $sum = $sum + abs($matrix_alpha[$i][$j]);
    }
    if ($sum >= $norma_alpha) {
      $norma_alpha = $sum;
    }
  }

  $inc  = 0;
  $flag_continue = 1;
  do{
    $inc++;
    for ($i=1; $i <= $size; $i++){
      $new_solve[$i] = 0;
      for ($j=1; $j <= $size; $j++){
        if ($i !== $j) {
          $new_solve[$i] = $new_solve[$i] + $matrix_alpha[$i][$j] * $solve[$i] + $vector_beta[$i];
      }
    }
    }

    // норма разности решений
    $norma_solve = 0;
    $sum = 0;
    for ($k = 1; $k <= $size; $k++ ){
      $sum = abs($new_solve[$k] - $solve[$k]);
      if ($sum >= $norma_solve) {
        $norma_solve = $sum;
      }
    }
    if ($norma_solve <= (1 - $norma_alpha) * $epsilon / $norma_alpha) {
      $flag_continue = 0;
    } else {
      $flag_continue = 1;
      for ($i = 1; $i <= $size; $i++ )
        $solve[$i] = $new_solve[$i];
    }

  } while ($flag_continue === 1 && $inc < 1000);
}
echo json_encode($solve);
?>
