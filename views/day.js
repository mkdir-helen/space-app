function day(date, events) {
    return `
        <div class="Day">
        <!--  <i class="fas fa-meteor"></i>  -->
            <h3>${date}</h3>
            <!-- <hr> -->
            <div class="events">
                <h3>Events</h3>
                <ul class="Events">
                    ${events}
                </ul>
            </div>
        </div>
    `
}

module.exports = day