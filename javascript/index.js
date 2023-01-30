$(document).ready(function(){

    $('#menu').click(function(){
        $(this).toggleClass('fa-times');
        $('.nav-links').toggleClass('nav-toggle')
    });

});

// your web apps firebas configuration
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
function register (e) {
    e.preventDefault()
    debugger
    // Get all our input fields
    full_name = document.getElementById('full_name').value
    email = document.getElementById('email').value
    phone_number = document.getElementById('phone_number').value
    message = document.getElementById('message').value

    // Validate input feilds
    if (validate_field(full_name) == false || validate_email(email) == false || validate_field(phone_number) == false || validate_password(message) == false){
        alert('One or more extra fields are incorrect')
        return
    }

    //Move on with auth
    auth.createUserWithEmailAndPassword(email,message)
    .then((res) => {
        console.log(res)
        // Declare user variable 
        var user = auth.currentUser

        // Add this current user to Firebase Database
        var database_ref = database.ref( )

        // Create user data
        var user_data = {
            full_name : full_name,
            email : email,
            phone_number : phone_number,
            message : message,
            last_login : Date.now()
        }
        
        database_ref.child('users/' + user.uid).set(user_data)

        alert('message sent')

    })
    .catch((err) => {
        // Firebase will use this to alert of its errors
        var error_code = err.error_code
        var error_message = err.error_message

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

function validate_password(message) {
    if(message < 6) {
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

// function sendEmail( email, message ){
//     // firebase.databse.sendrequest(cat(email,message))
//         database_ref.child('emails/' + user.uid).set(user_data)

//         alert('email sent')
//     // emailjs.sendEmail(email, message)
// }