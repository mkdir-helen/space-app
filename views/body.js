function body(content) {
    return `
        <div class="wrapper">
                ${mainNav()}
                ${topContainer()}
                ${content}
                ${footer()}
        </div>
    `
}

function mainNav() {
    return `
    <!-- Navigation -->
            <nav class="main-nav">
                <ul>
                    <li>
                        <a href="#">My Space <i class="fas fa-globe"></i></a>
    
                    </li>
                    <li>
                        <a href="#">Login <i class="fas fa-sign-in-alt"></i></a>
                    </li>
                    <li>
                        <a href="#">SignUp <i class="fas fa-user-plus"></i></a>
                    </li>
                    <li>
                        <a href="#">About <i class="fas fa-info"></i></a>
                    </li>
                </ul>
            </nav>
    `
}

function topContainer() {
    return `
    <!-- Top Container -->
    <section class="top-container">
        <header class="showcase">
            <h1>Space App</h1>
        </header>
        <div class="zipcode-container">
            <input class="searchControl" type="text" placeholder="City Name or ZipCode" id="searchInput">
            <button class="searchControl" id="searchBtn">Search</button>
        </div>
    </section>
    `
}

function footer() {
    return `
        <footer>
            <p>SpaceApp &copy; 2018</p>
        </footer>
    `
}

module.exports = body