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
                        <a href="/">My Space <i class="fas fa-globe"></i></a>
    
                    </li>
                    <li>
                        <a href="/logout">Log-Out <i class="fas fa-sign-in-alt"></i></a>
                    </li>
                    
                    <li>
                        <a href="/about">About <i class="fas fa-info"></i></a>
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

module.exports = body;