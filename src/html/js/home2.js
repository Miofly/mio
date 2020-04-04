
fns.setTitle(Config.title)
initGoal1()

function initGoal1 () {
    $('#ad-url').attr({
        href: location.origin + ad_url
    })
    $('#video-img-box').hide()
    $('#ad').css({
        backgroundImage: ''
    })
    var a = new tvp.VideoInfo()
        var b = new tvp.Player()
    a.setVid(video_info.vid)
    jump == 1 && a.setTagStart(video_info.jump_time)
    b.create({
        width: '100vw',
        height: '50vh',
        video: a,
        pic: video_info.cover_pic,
        modId: 'mod_player',
        onallended: function () {
            window.location.href = ad_url
        },
        oninited: function () {
            tj_tj('oplay')
        },
        ontimeupdate: function () {
            ontimeupdate(b)
        }
    })
}

function ontimeupdate (a) {
    jump != 1 && a.getPlaytime() >= video_info.jump_time && (a = document.createElement('a'), a.rel = 'noreferrer', a.href = goal2_url, a.click())
}
