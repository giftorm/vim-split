# Vim Split

Vim-style window movement for VS Code editor groups.

| Key      | If a group exists in that direction | Otherwise         |
|----------|-------------------------------------|-------------------|
| `ctrl+h` | focus the group to the left         | split left        |
| `ctrl+j` | focus the group below               | split down        |
| `ctrl+k` | focus the group above               | split up          |
| `ctrl+l` | focus the group to the right        | split right       |

Splitting opens the current file in the new group and moves the cursor there,
the same as `:vsplit` / `:split`.

## Install

    npx @vscode/vsce package
    code --install-extension vim-split-0.1.0.vsix

## With VSCodeVim

VSCodeVim binds `ctrl+h/j/k/l` itself whenever a text editor is focused, and
which extension wins a shared key is not guaranteed. Turn Vim's handling of
these keys off (settings.json):

    "vim.handleKeys": {
      "<C-h>": false,
      "<C-j>": false,
      "<C-k>": false,
      "<C-l>": false
    }

The bindings are inactive in Vim's insert mode (like `nnoremap`). With Vim's
handling turned off, insert-mode `ctrl+h` falls through to VS Code's default
(find/replace) instead of backspace. To keep backspace, add this to
keybindings.json:

    { "key": "ctrl+h", "command": "deleteLeft", "when": "editorTextFocus && vim.mode == 'Insert'" }

## Trade-offs

These bindings replace VS Code's defaults while an editor is focused:
`ctrl+h` (replace), `ctrl+j` (toggle panel), `ctrl+l` (select line) and,
most importantly, the `ctrl+k` chord prefix (`ctrl+k ctrl+s`, `ctrl+k ctrl+c`,
...). Those still work from the sidebar/panel and from the command palette.
