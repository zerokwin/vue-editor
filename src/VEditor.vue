<template>
    <div class="v-editor" :style="{width: width, height: height}">
        <div class="v-editor-toolbar">
            <ul class="v-editor-btn-group v-editor-tool">
                <li class="v-editor-btn" @click="bold">
                    <a class="v-editor-icon" href="javascript:void(0)" title="加粗">B</a>
                </li>
                <li class="v-editor-btn" @click="italic">
                    <a class="v-editor-icon" href="javascript:void(0)" title="斜体">I</a>
                </li>
            </ul>
            <ul class="v-editor-btn-group v-editor-mode">
                <li class="v-editor-btn" @click="preview">
                    <a class="v-editor-icon" href="javascript:void(0)" title="预览">O</a>
                </li>
            </ul>
        </div>
        <div class="v-editor-field" contenteditable="true" ref="editor"
            :class="{'v-editor-empty': !!placeholder}"
            :placeholder="placeholder"
            v-show="!codeMode"
            @input="updateValue($event.target.innerHTML)">
            <!-- <p>dgfdfd<b>aaaaaaaaaaaaaadffffffff</b></p> -->
        </div>
        <textarea class="v-editor-code-field"
            :value="code"
            v-show="codeMode"
            @input="codeToText($event.target.value)">
        </textarea>
    </div>
</template>

<script>
import util from './utils/util'
import Range from './utils/range'
import command from './utils/command'

export default {
    props: ['width', 'height', 'placeholder', 'toolsbar'],
    data() {
        console.log(this.toolsbar);

        return {
            code: '',
            codeMode: false,
            selection: window.getSelection(),
            menu: []
        }
    },
    methods: {
        bold() {
            if (this.selection.rangeCount) {
                const range = new Range(this.selection)

                if (!util.hasParents(range.getRangeHtml(), this.$refs.editor)) return

                // util.wrap(this.selection, 'b')

                command.exec('bold')

                this.code = this.$refs.editor.innerHTML
            }
        },
        italic() {
            if (this.selection.rangeCount) {
                const range = new Range(this.selection)

                if (!util.hasParents(range.getRangeHtml(), this.$refs.editor)) return

                // util.wrap(this.selection, 'b')

                command.exec('italic')

                this.code = this.$refs.editor.innerHTML
            }
        },
        preview() {
            this.codeMode = !this.codeMode
        },
        updateValue(value) {
            if (value.length === 0) {
                this.$refs.editor.classList.add('v-editor-empty')
            } else {
                this.$refs.editor.classList.remove('v-editor-empty')
            }

            this.code = value
        },
        codeToText(value) {
            this.$refs.editor.innerHTML = this.code = value
        }
    },
    watch: {
        text() {
            this.$emit('input', this.code)
        }
    }
}
</script>

<style lang="scss">
$editor-border-color: #ddd;
$toolbar-border-color: #f2f2f2;

%clearfix {
    &:before {
        display: table;
        content: '';
    }

    &:after {
        display: table;
        content: '';
        clear: both;
        overflow: hidden;
    }
}

.v-editor {
    position: relative;
    width: 600px;
    height: 400px;
    padding-top: 30px;
    border: 1px solid $editor-border-color;
    outline: none;
    box-sizing: border-box;

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    ul {
        list-style: none;
    }

    .v-editor-toolbar {
        position: absolute;
        z-index: 1;
        top: 0;
        width: 100%;
        border-bottom: 1px solid $toolbar-border-color;

        @extend %clearfix;

        .v-editor-btn-group {
            height: 100%;
            border-right: 1px solid $toolbar-border-color;

            @extend %clearfix;
        }

        .v-editor-tool {
            float: left;
        }

        .v-editor-mode {
            float: right;
        }

        .v-editor-btn {
            float: left;
            width: 30px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            cursor: pointer;
        }

        .v-editor-icon {
            display: block;
            text-decoration: none;
            color: inherit;
            user-select: none;
        }
    }

    .v-editor-field {
        height: 100%;
        padding: 10px;
        outline: none;
    }

    .v-editor-code-field {
        width: 100%;
        height: 100%;
        padding: 10px;
        border: 0;
        outline: none;
        resize: none;
    }
}

.v-editor-empty {
    &:after {
        content: attr(placeholder);
        color: #999;
    }
}
</style>
