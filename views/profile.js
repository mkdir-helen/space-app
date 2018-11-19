function profile(){
    return `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="../css/myspce.css">
        <script defer src="https://use.fontawesome.com/releases/v5.5.0/js/all.js" integrity="sha384-GqVMZRt5Gn7tB9D9q7ONtcp4gtHIUEW/yG7h98J7IpE3kpi+srfFyyB/04OV6pG0"
            crossorigin="anonymous"></script>
        <title>MySpace </title>
    </head>
    
    <body>
        <div class="wapper">
            <div class="backdrop"></div>
            <div class="modal"></div>
            <!-- Navigation -->
            <nav class="main-nav">
                <ul>
                    <li>
                        <a href="#">MySpace <i class="fas fa-globe"></i></a>
    
                    </li>
                    <li>
                        <a href="#">Log-Out <i class="fas fa-sign-in-alt"></i></a>
                    </li>
                    <li>
                        <a href="#">Edit Profile <i class="fas fa-user-plus"></i></a>
                    </li>
                    <li>
                        <a href="#">Friends <i class="fas fa-user-friends"></i></a>
                    </li>
                </ul>
            </nav>
            <!-- Top Container -->
            <section class="top-container">
                <header class="showcase">
                    <h1> WELCOME BACK (USERNAME) </h1>
                    <!-- Todo add Username in welcome back -->
                    <h3>Welcome back</h3>
                </header>
            </section>
            <!-- Dayes Section -->
            <section class="Boxes">
                    <div class="week">
    
                        <div class="Day">
                            <i class="fas fa-meteor"></i>
                            <h3>Events</h3>
                            <ul class="Events">
                                <li>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, sapiente?
                                </li>
                                <li>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, sapiente?
                                </li>
                                <li>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, sapiente?
                                </li>
                            </ul>
                        </div>
                        <div class="Day">
                            <i class="fas fa-meteor"></i>
                            <h3>Events</h3>
                            <ul class="Events">
                                <li>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, sapiente?
                                </li>
                                <li>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, sapiente?
                                </li>
                                <li>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, sapiente?
                                </li>
                            </ul>
                        </div>
    
                    <div class="Day">
                            <i class="fas fa-meteor"></i>
                            <h3>Events</h3>
                            <ul class="Events">
                                <li>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, sapiente?
                                </li>
                                <li>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, sapiente?
                                </li>
                                <li>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, sapiente?
                                </li>
                            </ul>
                        </div>
                </section>
                        
            <footer>
                <p>SpaceApp &copy; 2018</p>
            </footer>
        </div>
        <!-- Wrapper Ends -->
        <div>
            <!-- <script src="../scripts/main.js"></script> -->
        </div>
    </body>
    
    </html>
    `;
}

module.exports = profile;