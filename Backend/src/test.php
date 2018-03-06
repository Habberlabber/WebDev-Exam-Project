<? 

$array = Array("Peter"=>"35", "Ben"=>"37", "Joe"=>"43");
print_r($array);
echo json_encode($array);
print_r(json_decode(json_encode($array)));
