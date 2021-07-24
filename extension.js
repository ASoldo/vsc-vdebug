// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vsc-vdebug" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('vsc-vdebug.vsc-vdebug:clean', function () {
		const {document} = vscode.window.activeTextEditor;
		// const firstLine = document.lineAt(0);

		const edit = new vscode.WorkspaceEdit();

		let re = new RegExp(` v-debug:wire| (v-debug:bgcolor="'[a-z0-9 ]*'")| (v-debug:[a-z]*="'[a-z0-9 ]*'")`, 'g');

		if(vscode.window.activeTextEditor.document.getText().match(` v-debug:wire| (v-debug:bgcolor="'[a-z0-9 ]*'")| (v-debug:[a-z]*="'[a-z0-9 ]*'")`))
		{			
			edit.replace(
				document.uri, 
				new vscode.Range( document.lineAt(0).range.start, document.lineAt(document.lineCount-1).range.end), 
				vscode.window.activeTextEditor.document.getText().replace(re, '')
			);
			
			// Display a message box to the user
			vscode.window.showInformationMessage('vsc-vdebug:clean Successful!');
			return vscode.workspace.applyEdit(edit);
		}
		vscode.window.showInformationMessage('vsc-vdebug:clean Nothing to clean up, all tidy!');
		return;
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {
	vscode.window.showInformationMessage('Thank you for using vsc-vdebug utils!');
}

module.exports = {
	activate,
	deactivate
}
