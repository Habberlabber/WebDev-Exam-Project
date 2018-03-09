<? 
$today = date("Y-m-d");
echo "<br> Today: $today <br>";
$today = new DateTime($today);
print_r($today);
$bday = '2000-03-06';
echo "<br> B-Day: $bday <br>";
$birth = new DateTime('2000-03-06');
print_r($birth);
$diff = $today->diff($birth);
echo "<br> Diff: $diff->y";
