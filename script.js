// import firebase from "firebase/compat/app";
// import "firebase/compat/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyDDajDdqf1KZTd4oU_3oTMhz-86AqR87BQ",
    authDomain: "datos-de-formulario-ae3e9.firebaseapp.com",
    projectId: "datos-de-formulario-ae3e9",
    storageBucket: "datos-de-formulario-ae3e9.appspot.com",
    messagingSenderId: "60195772076",
    appId: "1:60195772076:web:4609442ec44a41e9d37109",
    measurementId: "G-8YS11S0TQQ"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();



document.getElementById('formulario').addEventListener('submit',
(event) =>{
    event.preventDefault()

    let entradaNombre = document.getElementById('name');
    let errorNombre = document.getElementById('nameError')
    if(entradaNombre.value.trim() === ''){
        errorNombre.textContent = 'Introduci tu nombre';
        errorNombre.classList.add('error-message');
    }else{
        errorNombre.textContent = '';
        errorNombre.classList.remove('error-message');
    }

    let entradaEmail = document.getElementById('email');
    let errorEmail = document.getElementById('emailError')
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let contraseñaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
    
    if(!emailPattern.test(entradaEmail.value)){
        errorEmail.textContent = 'Introduci un Email valido';
        errorEmail.classList.add('error-message');
    }else{
        errorEmail.textContent = '';
        errorEmail.classList.remove('error-message');
    }
    let entradaContraseña = document.getElementById('password');
    let errorContraseña = document.getElementById('passwordError')
    if(!contraseñaPattern.test(entradaContraseña.value)){
        errorContraseña.textContent = 'Tu contraseña debe tener  Minimo 8 caracteres Maximo 15 -\n\nAl menos una letra mayúscula -\n\nAl menos una letra minucula -\n\n\Al menos un dígito -\n\nNo espacios en blanco -\n\nAl menos 1 caracter especial';
        errorContraseña.classList.add('error-message');
    }else{
        errorContraseña.textContent = '';
        errorContraseña.classList.remove('error-message');
    }
    if(!errorNombre.textContent && !errorEmail.textContent && !errorContraseña.textContent){
        db.collection("users").add({
            nombre: entradaNombre.value,
            email: entradaEmail.value,
            password: entradaContraseña.value
        })
        .then((docRef) => {
            alert('El formulario se ha enviado con exito!', docRef.id)
            document.getElementById('formulario').reset();
        })
        .catch((error) => {
            alert("Error adding document: ", error);
        });

        
    }
})


