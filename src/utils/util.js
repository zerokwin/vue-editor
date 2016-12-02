export default {
    wrap(srcStr, selection, wrapArr) {
        const start = Math.min(selection.anchorOffset, selection.focusOffset),
            end = Math.max(selection.anchorOffset, selection.focusOffset),
            textTmp1 = srcStr.substring(0, start),
            textTmp2 = srcStr.substring(end)

        return textTmp1 + wrapArr[0] + selection + wrapArr[1] + textTmp2
    }
}
