function day(events) {
    return `
        <div class="Day">
            <i class="fas fa-meteor"></i>
            <h3>Monday's Weather</h3>
            <h4>Sky:</h4>
            <hr>
            <h3>Events</h3>
            <ul class="Events">
                ${events}
            </ul>
        </div>
    `
}

module.exports = day