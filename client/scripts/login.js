window.onload = function() {
    document.getElementById('loginForm').onsubmit = (event) => { 
        event.preventDefault(); //prevent reloading page
        login(); 
    };
}

async function login() 
{
    const username = document.getElementById('usernameInput').value;
    const password = document.getElementById('passwordInput').value;
    if(username && password)
    {
        document.getElementById("loginError").innerHTML = "New text!";
        const loginUrl = 'http://localhost:3000/music/login?username=' + username + '&password=' + password;
        console.log("Login request made @" + loginUrl);
        let response = await fetch(loginUrl);
        //success status
        if(response.status >= 200 && response.status < 300)
        {
            response.text().then(function(text) { 
                const userId = text.split("-")[0];
                const userName = text.split(" ")[2];;
                sessionStorage.setItem('userId', userId); 
                sessionStorage.setItem('userName', userName); 
            });
            window.location.href = './user-page.html';
        }
        else
        {
            response.text().then(function(text) { showLoginError(text); });
        }
    }
    else
    {
        showLoginError("You need to type in username and password!");
    }
}

function showLoginError(text)
{
    const loginErrorText = document.getElementById('loginError');
    loginErrorText.hidden = false;
    loginErrorText.innerHTML = text;
    loginErrorText.style.animation = 'fading 4s';
    setTimeout(() => { loginErrorText.hidden = 'true'; }, 3900);
}