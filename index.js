// uor web apps firebas configuration
var firebaseConfig = {
  apiKey: "AIzaSyA5nfj3AyXSZRkcNru-MfZiPqCPbQ6tK90",
  authDomain: "firbase-database-d984f.firebaseapp.com",
  projectId: "firbase-database-d984f",
  storageBucket: "firbase-database-d984f.appspot.com",
  messagingSenderId: "600168655826",
  appId: "1:600168655826:web:5effe31b88d78c341c360b"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig); 
// Inittialize Variables
const auth = firebase.auth()
const database = firebase.database()

// Set up register function
function register () {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
    full_name = document.getElementById('full_name').value
    favorite_song = document.getElementById('favorite_song').value
    milk_before_cereal = document.getElementById('milk_before_cereal').value

    // Validate input feilds
    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Email or password is incorrect')
        return
        // Don't return the code
    }
    if (validate_field(full_name) == false || validate_field(favorite_song) == false || validate_field(milk_before_cereal) == false){
        alert('One or more extra fields are incorrect')
        return
    }
    
    //Move on with auth
    auth.createUserWithEmailAndPassword(email,password)
    .then(function(){
        // Declare user variable 
        var user = auth.currentUser

        // Add this current user to Firebase Database
        var database_ref = database.ref( )

        // Create user data
        var user_data = {
            email : email,
            full_name : full_name,
            favorite_song : favorite_song,
            milk_before_cereal : milk_before_cereal,
            last_login : Date.now()
        }
        
        database_ref.child('users/' + user.uid).set(user_data)

        alert('User Created!')

    })
    .catch(function(error) {
        // Firebase will use this to alert of its errors
        var error_code = error_code
        var error_message = error_message

        alert(error_message)
    })

}

// set up login function

function login () {
  email = document.getElementById('email').value
  password = document.getElementById('password').value

  if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or password is incorrect')
      return
  }

  auth.signInWithEmailAndPassword(email, password)
      .then(function() {
          // Declare user variable 
        var user = auth.currentUser

        // Add this current user to Firebase Database
        var database_ref = database.ref( )

        // Create user data
        var user_data = {
            last_login : Date.now()
        }
        
        database_ref.child('users/' + user.uid).update(user_data)

        alert('User Logged In!')
      })
      .catch(function(error){
          var error_code = error_code
          var error_message = error_message
          
          alert(error_message)
      })
  
}

// validate functions
function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
        // Email is good 
        return true
    } else {
      // Email is bad
        return false
    }
}

function validate_password(password){
// Firebase only accepts lengths greater than 6
if (password < 6) {
    return false
} else {
    return true
}
}
function validate_field(field) {
    if (field == null) {
        return false
    }
    if (field.length <= 0) {
        return false
    } else {
        return true
    }
}