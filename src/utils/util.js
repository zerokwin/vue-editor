export default {
    wrap(selection, tagName) {
        const range = selection.getRangeAt(0),
            tag = document.createElement(tagName)

        tag.appendChild(range.extractContents())

        range.insertNode(tag)

        range.setStartBefore(tag)

        range.setEndAfter(tag)

        selection.removeAllRanges()

        selection.addRange(range)
    },

    unwrap(selection, tagName) {
        const range = selection.getRangeAt(0),
            tag = document.createElement(tagName)

        tag.appendChild(range.extractContents())

        range.insertNode(tag)

        range.setStartBefore(tag)

        range.setEndAfter(tag)

        selection.removeAllRanges()

        selection.addRange(range)
    },

    hasParents(node, targetNode) {
        if (node.isEqualNode(targetNode)) {
            return true
        }

        while (node = node.parentNode) {
            if (node.isEqualNode(targetNode)) {
                return true
            }
        }

        return false
    },

    matches: Element.prototype.matchesSelector || 
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector ||
            Element.prototype.oMatchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            function(s) {
                let matches = (this.document || this.ownerDocument).querySelectorAll(s),
                    i = matches.length
                while (--i >= 0 && matches.item(i) !== this) {}
                return i > -1
            }
}
