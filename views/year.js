function year(yearName, months) {
    return `
        <div class="year">
            <h1>${yearName}</h1>
            ${months}
        </div>
    `
}

module.exports = year