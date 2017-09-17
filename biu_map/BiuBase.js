/**
 * Created by liushaojie on 2017/9/16.
 */
class BiuBase {
    constructor() {
        this.initGetSet()
    }
    initGetSet() {
        Object.defineProperty(this, 'data', {
            set: v => {
                this._data = v
                log('我竟然被设置成了', this.data)
                this.update()
            },
            get: () => {
                return this._data
            }
        })
    }
}