function year(yearName, months) {
    return `
        <div class="year">
            <h1 class="sticky">${yearName}</h1>
            </div>
            ${months}
    `
}

module.exports = year