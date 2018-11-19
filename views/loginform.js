function loginform(){
    return `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="../css/stylelogin.css">
        <script defer src="https://use.fontawesome.com/releases/v5.5.0/js/all.js" integrity="sha384-GqVMZRt5Gn7tB9D9q7ONtcp4gtHIUEW/yG7h98J7IpE3kpi+srfFyyB/04OV6pG0"
            crossorigin="anonymous"></script>
        <title>Login </title>
    </head>
    
    
    <div class="login">
        
        <h1 class="login-header">Log in</h1>
        
        <form action="/login" method="POST" class="login-container">
            <p><input type="text" placeholder="Username" name="username"></p>
            <p><input type="password" placeholder="Password" name="password"></p>
            <p>
                <input type="submit" value="Buckle Up"> 
                <button class="btn btn-danger">  
                <a href="/google/login"> Sign in With Google Account
                <i class="fab fa-google"></i>
                </a>
                </button>
            </p>
            <!-- TODO send to signup page -->
            <p class="text--center">Not a member? <a href="/register">Sign up now</a> 
        </form>
    </div>
    
    `;
}

module.exports = loginform;