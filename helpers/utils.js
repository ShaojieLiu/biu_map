const e = sel => document.querySelector(sel)
const es = sel => Array.from(document.querySelectorAll(sel))
const log = console.log.bind(console)

const map = (obj, func) => {
    const result = []
    for(let k in obj) {
        result.push(func(obj[k], k))
    }
    return result
}

// log(map({q: 1, w: 2}, (v, k) => k + v))