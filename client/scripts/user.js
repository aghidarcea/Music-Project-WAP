window.onload = function() {
    document.getElementById('logo').innerText = sessionStorage.getItem('userName') + "'s bootleg spotify";
    document.getElementById('logoutForm').onsubmit = (event) => { 
        event.preventDefault(); //prevent reloading page
        logout();
    };
}

function logout()
{
    sessionStorage.clear();
    window.location.href = './login-page.html';
} 

/*
sessionStorage.setItem('key', 'value');

// Get saved data from sessionStorage
let data = sessionStorage.getItem('key');

// Remove saved data from sessionStorage
sessionStorage.removeItem('key');

// Remove all saved data from sessionStorage
sessionStorage.clear();
*/