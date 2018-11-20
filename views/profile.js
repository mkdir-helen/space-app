function profile(FavsDiv, FriendsDiv, LocationDiv) {
    return `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="../css/myspace.css">
    <link rel="stylesheet" href="">
    <script defer src="https://use.fontawesome.com/releases/v5.5.0/js/all.js" integrity="sha384-GqVMZRt5Gn7tB9D9q7ONtcp4gtHIUEW/yG7h98J7IpE3kpi+srfFyyB/04OV6pG0"
        crossorigin="anonymous"></script>
    <title>MyProfile</title>
</head>

<body>
    <!-- Navigation -->
    <nav class="main-nav">
        <ul>
            <li>
                <a href="/events">Home<i class="fas fa-globe"></i></a>

            </li>
            <li>
                <a href="/logout">Log-Out <i class="fas fa-sign-in-alt"></i></a>
            </li>
            <li>
                <a href="/about">About <i class="fas fa-info"></i></a>
            </li>
        </ul>
    </nav>
    <section class="top-container">
        <header class="showcase">
            <h1>My Profile</h1>
        </header>
    </section>


    <div class="Profile-Content">
        ${FavsDiv}
        ${FriendsDiv}
        ${LocationDiv}
    </div>

</body>

</html>
    `;
}

function myFavsDiv(spaceObjects) {
    const spaceObjectDivs = spaceObjects.map(spaceObject => {
        return `
        <div class="Space-Objects">
            <h6 class="ObjectName">${spaceObject.name}</h6>
        </div>
    `
    }).join("")
    return ` 
    <div class="My-Favorites">
            <h4 class="myFavs"> My Favorites </h4>
            ${spaceObjectDivs} 
            <form method="Post" action="/favorite">
            Space Object Name <input type="text" name="username">
            <input type="Submit" value="Submit">
            </form>
    </div>

`


}


function myFriendsDiv(Friends) {
    const myFriendsDiv = Friends.map(Friends => {
        return `
        <div class="Friend">
            <h6 class="FriendName">${Friends.name}</h6>
        </div>
    `
    }).join("")
    return ` 
    <div class="My-Friends">
            <h4 class="myFriends"> My Friends </h4>
            ${myFriendsDiv} 
    </div>
`
}

function myLocation(Location) {
    return `
    <div class="Current-Location">
            <h4>Current Location${Location[0]},${Location[1]}</h4>
        </div>
    `

}

module.exports = {profile,
    myFavsDiv,
    myFriendsDiv,
    myLocation
} 