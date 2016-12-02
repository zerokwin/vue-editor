<template>
    <div class="v-editor" :style="{width: width, height: height}">
        <div class="v-editor-toolbar">
            <ul class="v-editor-btn-group">
                <li class="v-editor-btn" @click="bold">
                    <a class="v-editor-icon" href="javascript:void(0)" title="加粗">B</a>
                </li>
            </ul>
        </div>
        <div class="v-editor-field" contenteditable="true" ref="editor"
            :class="{'v-editor-empty': !!placeholder}"
            :placeholder="placeholder"
            :value="text"
            @input="updateValue($event.target.innerHTML)">
        </div>
    </div>
</template>

<script>
import util from './utils/util'

export default {
    props: ['width', 'height', 'placeholder'],
    data() {
        return {
            text: ''
        }
    },
    methods: {
        bold() {
            const selection = window.getSelection()
            
            this.text = this.$refs.editor.innerHTML = util.wrap(this.$refs.editor.innerHTML, selection, ['<b>', '</b>'])
        },
        updateValue(value) {
            if (value.length === 0) {
                this.$refs.editor.classList.add('v-editor-empty')
            } else {
                this.$refs.editor.classList.remove('v-editor-empty')
            }
            this.text = value
        }
    },
    watch: {
        text() {
            this.$emit('input', this.text)
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
            float: left;
            height: 100%;
            border-right: 1px solid $toolbar-border-color;
        }

        .v-editor-btn {
            width: 30px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            cursor: pointer;
        }

        .v-editor-icon {
            text-decoration: none;
            color: inherit;
        }
    }

    .v-editor-field {
        height: 100%;
        padding: 10px;
        outline: none;
    }
}

.v-editor-empty {
    &:after {
        content: attr(placeholder);
        color: #999;
    }
}
</style>
