const vscode = require('vscode');

const DIRECTIONS = {
  left: { focus: 'workbench.action.focusLeftGroup', split: 'workbench.action.splitEditorLeft' },
  down: { focus: 'workbench.action.focusBelowGroup', split: 'workbench.action.splitEditorDown' },
  up: { focus: 'workbench.action.focusAboveGroup', split: 'workbench.action.splitEditorUp' },
  right: { focus: 'workbench.action.focusRightGroup', split: 'workbench.action.splitEditorRight' },
};

// The extension host learns about group changes asynchronously, so give a
// focus change a short moment to arrive before concluding nothing moved.
function waitForGroupChange(ms) {
  return new Promise((resolve) => {
    const sub = vscode.window.tabGroups.onDidChangeTabGroups(() => {
      clearTimeout(timer);
      sub.dispose();
      resolve();
    });
    const timer = setTimeout(() => {
      sub.dispose();
      resolve();
    }, ms);
  });
}

// Like vim's classic WinMove(): move to the neighbouring window, or split
// towards that direction when there is no neighbour.
async function focusOrSplit(direction) {
  const { focus, split } = DIRECTIONS[direction];
  const before = vscode.window.tabGroups.activeTabGroup;

  await vscode.commands.executeCommand(focus);
  if (vscode.window.tabGroups.activeTabGroup !== before) return;

  await waitForGroupChange(50);
  if (vscode.window.tabGroups.activeTabGroup !== before) return;

  await vscode.commands.executeCommand(split);
}

function activate(context) {
  for (const direction of Object.keys(DIRECTIONS)) {
    context.subscriptions.push(
      vscode.commands.registerCommand(`vimSplit.${direction}`, () => focusOrSplit(direction))
    );
  }
}

function deactivate() {}

module.exports = { activate, deactivate };
