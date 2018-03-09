<?

  // Function that returns the contents of any datafile as JSON or string based on 2th parameter
  function getData($tablename, $array = false) {
    $config = include('config.php');
    $filename = $tablename . '.json'; // Create the filename from the function parameter
    $data = file_get_contents($config['dataPath'].$filename); // Get contents of the file
    $data = json_decode($data); // Convert the contnets to JOSN
    if($array) { // If the result should be an array
      $dataAsArray = []; // Create empty aray
      foreach ($data as $i => $value) { // loop througt DB object
        if($i != "primary_key") // Ignore primary_key
          array_push($dataAsArray, $value); // Add data object to array
      }
      return json_encode($dataAsArray); // Return as string
    } else { // Íf not array
      return $data; // Return the json
    }
  }

  // Function that updates the content of a file based on tablename and contents
  function updateData($tablename, $contents) {
    $config = include('config.php');
    $filename = $tablename . '.json'; // Create the filename from the function parameter
    $data = json_encode($contents); // Convert the contnets to string
    file_put_contents($config['dataPath'].$filename, $data); // Update the file
  }  

  // Function that adds the given objest to the givne file
  function addData($tablename, $object) {
    $config = include('config.php');
    $filename = $tablename . '.json'; // Create the filename from the function parameter
    $data = file_get_contents($config['dataPath'].$filename); // Get contents of the file
    $data = json_decode($data); // Turn string to json object
    $id = ++$data->primary_key; // Indent the primary_key and save new value to be used as key for new object
    $object['id'] = $id; // Set the id on the user-object
    $data->$id = $object; // Set the objecs with the new key to be the given object
    $data = json_encode($data); // Convert the array to string
    file_put_contents($config['dataPath'].$filename, $data); // Update the file
  }

  function deleteData($tablename, $id){
    $config = include('config.php');
    $filename = $tablename . '.json'; // Create the filename from the function parameter
    $data = file_get_contents($config['dataPath'].$filename); // Get contents of the file
    $data = json_decode($data); // Turn string to json object
    if(!empty($data->$id)){ // If an item with the given id exists
      unset($data->$id); // unset the item
      $data = json_encode($data); // Convert the data to string
      file_put_contents($config['dataPath'].$filename, $data); // Update the file
      return true;
    }
    return false;
  }