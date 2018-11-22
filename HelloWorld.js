var express = require('express');
var app = express();
var bodyParser= require('body-parser');

app.use(bodyParser.urlencoded({ extended: true}))
app.use(express.static('public'));

//parte para FIREBASE


var firebase = require("firebase");
var admin = require("firebase-admin");
// Fetch the service account key JSON file contents
var serviceAccount = require("./fastpark-cd1a8-firebase-adminsdk-5h2ni-25773741f2.json");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fastpark-cd1a8.firebaseio.com"
});

// Initialize Firebase
// TODO: Replace with your project's customized code snippet
var config = {
  apiKey: "AIzaSyAVaten_qJLQb3YyQC_k-CW_rrTX8Bya6I",
  authDomain: "fastpark-cd1a8.firebaseapp.com",
  databaseURL: "https://fastpark-cd1a8.firebaseio.com",
  projectId: "fastpark-cd1a8",
  storageBucket: "fastpark-cd1a8.appspot.com",
  messagingSenderId: "86398450595"
};
firebase.initializeApp(config);


// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.database();
var ref = db.ref("restricted_access/secret_document");
ref.once("value", function(snapshot) {
  console.log(snapshot.val());
});

app.get('/', function(req, res) {
  console.log('Hola mundo');
  res.render("hola");
  res.send('Hola Mundo!');
});

//Post para el login
app.post('/signIn', function(req,res){
  firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode === 'auth/wrong-password') {
      alert('Wrong password.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
  });
  return res.redirect('../images/profile.html');
});

//Post para el signup
app.post('/signUp', function(req,res){
    //res.send('home');
    console.log(req.body.email + " "+ req.body.contraseña);
    
    firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.contraseña).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...

    });
  
        //db.ref("Users").push(newUser);
    
    return res.redirect('../images/userdata.html');
    
});

app.post('/datosUser',function(req,res){
  
  
  var dueño;
  if(req.body.dueño="si_dueño")
      dueño=true;
  else if(req.body.dueño= "no_dueño")
    dueño=false;
  
  var newUser ={
    Nombre:req.body.nombre,
    Apellido:req.body.apellido,
    Edad:req.body.edad,
    Dueño:dueño   
  } 
  
  console.log(firebase.auth().currentUser.uid);
  db.ref('Users').child(firebase.auth().currentUser.uid).set(newUser);  
    
  return res.redirect('../images/profile.html');

});


app.get('/profile',function(req,res){


    var list;
    var userId= firebase.auth().currentUser.uid;
    console.log(userId);
    db.ref("Users").once('value').then(function(snapshot){
      console.log(snapshot.val());
      console.log(snapshot.key);
      console.log('ahi va el bueno');
      console.log(snapshot.child('12345').child('Nombre').val());
    
    });
    console.log(document.getElementById("nombre"));
   // res.render(profile.html,{ title: 'tii'});
 
  
  //console.log(req.body.firstname);
  //res.send('login');
  //db.ref("Usuarios").push(newUser)
});


app.listen(3000, function() {
  console.log('Aplicación ejemplo, escuchando el puerto 3000!');
});

