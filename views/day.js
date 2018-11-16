function day(date, events) {
    return `
        <div class="Day">
            <i class="fas fa-meteor"></i>
            <h3>${date}</h3>
            <hr>
            <h3>Events</h3>
            <ul class="Events">
                ${events}
            </ul>
        </div>
    `
}

module.exports = day