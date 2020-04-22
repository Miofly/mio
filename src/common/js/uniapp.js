const ui = {
    showImg (url) {
        uni.previewImage({
            urls: [url],
            current: 0
        })
    },
    // loading设置
    showLoading (title = '正在加载', mask = true) {
        uni.showLoading({
            title: title,
            mask: mask // 防止触摸穿透
        })
    },
    // 提示信息
    showToast (title = '操作成功', icon = 'none', duration = 1300, mask = true) {
        uni.showToast({
            title: title,
            icon: icon,
            duration: duration,
            mask: mask
        })
    },
    // 云函数请求统一封装
    yunFun (name, params, success, showToast = true, message = '正在玩命的加载中', fail = (err) => {
        this.showToast('请求失败', 'none')
        console.log(err)
        // this.yunError(err)
    }) {
        if (showToast) {
            this.showLoading(message) // 加载loading
        }
        wx.cloud.callFunction({
            name: name, // 云函数名称
            data: params,
        }).then(res => { // 调用成功
            uni.hideLoading()
            // console.log(res)
            success(res)
        }).catch(err => {
            // console.log(err)
            uni.hideLoading()
            fail(err)
        })
    },
}

export {
    ui
}
