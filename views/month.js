function month(monthName, days) {
    return `
    <div class="week">
    <h1 class="Week-Title sticky">${monthName}</h1>
        ${days}
    </div>
    `
}

module.exports = month