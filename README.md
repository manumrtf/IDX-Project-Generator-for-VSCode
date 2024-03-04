# idx-project-generator README

A interface to create a project with your favourite frameworks without the need of remembering all the CLI commands
it's based on the new Google IDX editor

## Features

Remember the CLI command to create a project for all the frameworks can be hard, I often find myself goint to Google to search it.
Save yourself that time and run it with only one click

## Customize commands
You can customize the CLI command that get runs when clicking on a framework, this is useful if you want to set a default flag for every new project.
Let's put a example that we want to use always the typescript template for react, we could modify the following settings
```
{
    "projectInitCommands.react": "npm -y create vite@latest -- --template react-ts",
}
```

