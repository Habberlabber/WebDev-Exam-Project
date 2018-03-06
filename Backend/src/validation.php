<?

function validateUserObject($user, $required = false){
  $requiredFields = [
    "first_name",
    "last_name",
    "email",
    "password",
    "user_type",
    "birthday",
    "creation_date"
  ];
  
  if($required){
    foreach ($requiredFields as $val) {
      if(!isset($user->$val))
        return false;
    }
  }

  foreach ($user as $key => $value) {

    switch ($key) {
      case 'first_name':
      case 'last_name':
        if(strlen($value) < 2 || strlen($value) > 32)
          return false;
        break;
      case 'email':
        if(!filter_var($value, FILTER_VALIDATE_EMAIL))
          return false;
        break;
      case 'password':
        if(strlen($value) < 8)
          return false;
        break;
      case 'birthday':
        $today = date("Y-m-d"); // Get current date
        $today = new DateTime($today); // Convert current date to datetime
        $birth = new DateTime($value); // Convert given user birthday to datetime
        $diff = $today->diff($birth); // Get the difference
        if($diff->y < 18) // If the diccerence in years are less than 18
          return false; 
        break;
      case 'description':
        if(strlen($value) < 32 || strlen($value) > 255)
          return false;
        break;
    }

  }
  return true;
}