function month(monthName, days) {
    return `
    <h1 class="Week-Title sticky">${monthName}</h1>
    <div class="week">
    ${days}
    </div>
    `
}

module.exports = month