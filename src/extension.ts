// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { AngularIcon } from './icons/angular';
import { ReactIcon } from './icons/react';
import { VueIcon } from './icons/vue';
import { NextIcon } from './icons/next';
import { AstroIcon } from './icons/astro';
import { RemixIcon } from './icons/remix';
import { LaravelIcon } from './icons/laravel';
import { NuxtIcon } from './icons/nuxt';
import { ProjectCard } from './components/project-card';
import { style } from './style';
import { otherMethods } from './components/other-methods';

const techs = [
		{
			name:'Angular',
			icon:AngularIcon
		},
		{
			name:'React',
			icon:ReactIcon
		},
		{
			name:'Vue',
			icon:VueIcon
		},
		{
			name:'Nextjs',
			icon:NextIcon
		},
		{
			name:'Astro',
			icon:AstroIcon
		},
		{
			name:'Remix',
			icon:RemixIcon
		},
		{
			name:'Laravel',
			icon:LaravelIcon
		},
		{
			name:'Nuxt',
			icon:NuxtIcon
		}
];

function renderCards() {
	let template = ``;
	for(let tech of techs) {
		 template+=ProjectCard(tech.name, tech.icon);;
	}
	return template;
}


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	let config = vscode.workspace.getConfiguration('projectInitCommands');


	async function askForProjectName() {
		const projectName = await vscode.window.showInputBox({
			prompt: "Introduce project name",
			placeHolder: "Type here...",
			validateInput: text => {
				// You can return a validation message if the input is not valid
				return text.trim().length === 0 ? "Input cannot be empty" : null;
			}
		});
		return projectName;
	}

	async function initProject(command:string) {
		const terminal = vscode.window.createTerminal();
		const projectName = await askForProjectName();
		terminal.show();
		terminal.sendText(`${command} ${projectName}`);
	}

	function cloneRepository() {
		vscode.commands.executeCommand('git.clone');
	}

	function openRecent() {
		vscode.commands.executeCommand('workbench.action.openRecent');
	}

	function openFolder() {
		vscode.commands.executeCommand('workbench.action.files.openFolder');
	}




	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('idx-project-generator.start', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		const panel = vscode.window.createWebviewPanel(
			'idxProjectGenerator',
			'IDX Project Generator',
			vscode.ViewColumn.One,
			{
				enableScripts:true,
			}
		);

		
		
		let html = getWebviewContent();
		panel.webview.html = html;
	
		
		// Handle messages from the webview


		panel.webview.onDidReceiveMessage(
			 message => {
				switch (message.command) {
					case 'createNextjsApp':
						initProject(config.get('nextjs')!);
						break;
					case 'createAngularApp':
						initProject(config.get('angular')!);
						break;
					case 'createVueApp':
						initProject(config.get('vuejs')!);
						break;
					case 'createReactApp':
						initProject(config.get('react')!);
						break;
					case 'createAstroApp':
						initProject(config.get('astro')!);
						break;
					case 'createRemixApp':
						initProject(config.get('remix')!);
						break;
					case 'createLaravelApp':
						initProject(config.get('laravel')!);
						break;
					case 'createNuxtApp':
						initProject(config.get('nuxt')!);
						break;
					case 'cloneRepo':
						cloneRepository();
						break;
					case 'openRecent':
						openRecent();
						break;
					case 'openFolder':
						openFolder();
						break;						
				}
			},
			undefined,
			context.subscriptions
		);

	});



	context.subscriptions.push(disposable);

	function getWebviewContent() {
		return `<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>IDX Project Generator</title>
		</head>
		<body>
		<div class="w-full max-w-xl mx-auto mt-5">
    <div class="flex justify-between">
      <p class="text-zinc-300">New workspace</p>
      <p class="text-purple-400">See all templates</p>
    </div>
	<div class="mt-6 grid w-full grid-cols-4 gap-4">
			${renderCards()}
  	</div>
		${otherMethods()}
  </div>
  <script>
  const vscode = acquireVsCodeApi(); // Acquire the VS Code API

  // Select all elements with the name attribute "project-card"
  const projectCards = document.querySelectorAll('[name="project-card"]');
  // Iterate over the NodeList and add an event listener to each element
  projectCards.forEach(function(card) {
	  card.addEventListener('click', function(event) {
		  // Your event handling logic here
		  vscode.postMessage({
			  command: event.target.id
			});
	  });
  });

  document.getElementById('from-repo').addEventListener('click', () => {
	vscode.postMessage({
		command:'cloneRepo'
	});
  })

  document.getElementById('from-recent').addEventListener('click', () => {
	vscode.postMessage({
		command:'openRecent'
	});
  })

  document.getElementById('from-folder').addEventListener('click', () => {
	vscode.postMessage({
		command:'openFolder'
	});
  })

</script>
		
<style>
${style()}
</style>
</body>
  		
		
		
		
		</html>`;
	}
}

// This method is called when your extension is deactivated
export function deactivate() { }
