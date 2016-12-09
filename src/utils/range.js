export default class {
    constructor(sel = window.getSelection()) {
        if (sel.rangeCount) {
            this.sel = sel
            this.range = sel.getRangeAt(0)
        }
    }

    getRange(range) {
        if (range) {
            this.range = range
        } else {
            return this.range
        }
    }

    getRangeText() {
        return this.range.toString()
    }

    getRangeHtml() {
        const dom = this.range.commonAncestorContainer

        if (dom.nodeType === 1) {
            return dom
        } else {
            return dom.parentNode
        }
    }

    updateRange() {
        this.sel.removeAllRanges()
        this.sel.addRange(this.range)
    }
}
