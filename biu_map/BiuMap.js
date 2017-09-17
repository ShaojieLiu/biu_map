/**
 * Created by liushaojie on 2017/9/16.
 */
class BiuMap extends BiuBase {
    constructor(canvas) {
        super()
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        this.preset()
        this._data = {}
        this._eleArr = []
    }
    preset() {
        this.option = {
            inside: {
                vPadding: 5,
                hPadding: 10,
            },
            outside: {
                vSpace: 10,
                hSpace: 20,
            },
            text: {
                size: 20,
                font: 'serif',
                placeHolder: '未命名节点',
            }
        }
    }
    initWH(n) {
        const { text, inside } = this.option
        const p = n.title || text.placeHolder
        this.ctx.font = text.size + 'px ' + text.font
        n.ctnW = this.ctx.measureText(p).width
        n.ctnH = text.size
        n.rectW = n.ctnW + inside.hPadding * 2
        n.rectH = n.ctnH + inside.vPadding * 2
        n.children.map(c => this.initWH(c))
    }
    initPosX(n, offsetX) {
        const { outside } = this.option
        n.posX = offsetX
        offsetX = n.rectW + outside.hSpace + offsetX
        n.children.map(c => this.initPosX(c, offsetX))
    }
    initMaxH(n) {
        const { outside } = this.option
        const l = n.children.length
        let childRectHSum = 0, childMaxHSum = 0
        if(l > 0) {
            const childMaxHArr = n.children.map(c => this.initMaxH(c))
            childMaxHSum = childMaxHArr.reduce((sum, curr) => sum + curr, 0) + outside.vSpace * (l - 1)
            const firstC = n.children[0], lastC = n.children[l - 1]
            childRectHSum = childMaxHSum - ( firstC.maxH - firstC.rectH ) / 2 - ( lastC.maxH - lastC.rectH ) / 2
        }
        n.childMaxHSum = childMaxHSum
        n.childRectHSum = childRectHSum
        n.maxH = n.rectH > childMaxHSum ? n.rectH : childMaxHSum
        return n.maxH
    }
    initPosY(n, offsetY) {
        const { outside } = this.option
        n.posY = n.posY || offsetY
        const firstC = n.children[0]
        const firstCPara = firstC ? firstC.maxH - firstC.rectH : 0
        let nextY = n.posY + n.rectH / 2 - n.maxH / 2
        //log(n.title, n.posY, nextY, firstCPara)
        n.children.map( (c) => {
            c.posY = nextY + c.maxH / 2 - c.rectH / 2
            nextY = c.posY + c.rectH / 2 + c.maxH / 2 + outside.vSpace
            this.initPosY(c)
        } )
    }
    // 备份修改
    //initPosY(n, offsetY) {
    //    const { outside } = this.option
    //    n.posY = n.posY || offsetY
    //    const firstC = n.children[0]
    //    const firstCPara = firstC ? firstC.maxH - firstC.rectH : 0
    //    let nextY = n.posY + n.rectH / 2 - n.childRectHSum / 2 - firstCPara / 2
    //    log(n.title, n.posY, nextY, firstCPara)
    //    n.children.map( (c) => {
    //        c.posY = nextY + c.maxH / 2 - c.rectH / 2
    //        nextY = c.posY + c.rectH / 2 + c.maxH / 2 + outside.vSpace
    //        this.initPosY(c)
    //    } )
    //}
    initEleArr(n) {
        const para = {
            x: n.posX,
            y: n.posY,
            w: n.rectW,
            h: n.rectH,
            t: n.title,
        }
        this._eleArr.push(para)
        n.children.map(c => this.initEleArr(c))
    }
    initData() {
        this.initWH(this._data)
        this.initPosX(this._data, 0)
        this.initMaxH(this._data)
        this.initPosY(this._data, 250)
        this.initEleArr(this._data)
    }
    update() {
        this.initData()
        this.render()
    }
    drawRect(n) {
        const { x, y, w, h } = n
        this.ctx.strokeStyle = 'hotpink'
        this.ctx.strokeRect(x, y, w, h)
    }
    drawText(n) {
        let { x, y } = n
        const { text, inside } = this.option
        const t = n.t || text.placeHolder
        this.ctx.font = text.size + 'px ' + text.font
        const paramText = [t, x + inside.hPadding, y + inside.vPadding + text.size * 8 / 10]
        this.ctx.fillText(...paramText)
    }
    drawNode(n) {
        this.drawRect(n)
        this.drawText(n)
    }
    render() {
        log('我竟然被渲染了!', this.data, this._eleArr)
        this._eleArr.map(n => this.drawNode(n))
    }
}