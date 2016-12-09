export default {
    commandList: {},

    query(commandName) {
        return document.queryCommandSupported(commandName)
    },

    exec(commandName, commandValue, cb) {
        if (this.query(commandName)) {
            document.execCommand(commandName, false, commandValue)
        } else {
            commandList[commandName] && commandList[commandName]()
        }

        cb && cb()
    }
}
