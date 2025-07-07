import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

function getConfiguration() {
  const config = vscode.workspace.getConfiguration("projectTree");
  const showRootFolderName = config.get<boolean>("rootFolderName", true);
  const ignoreFolders = config.get<string[]>("ignoreFolders", [
    "node_modules",
    "dist",
    "out",
    ".git",
    ".vscode",
    ".vs",
    "build",
  ]);
  const collapsedFolders = config.get<string[]>("collapsedFolders", [
    "external",
    "vendor",
    "libs",
  ]);
  const isDebug = config.get<boolean>("debug", false);

  const projectName = config.get<string>("exportName", "${project}-tree");

  return {
    showRootFolderName,
    ignoreFolders,
    collapsedFolders,
    isDebug,
    projectName,
  };
}

function getFolderTree(dirPath: string, prefix: string = ""): string {
  let entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const { ignoreFolders, collapsedFolders } = getConfiguration();

  const filteredEntries = entries.filter((entry) => {
    return !ignoreFolders.includes(entry.name);
  });

  const folderName = path.basename(dirPath);
  const isCollapsed = collapsedFolders.includes(folderName);

  let treeStr = "";

  const folders = filteredEntries.filter((e) => e.isDirectory());
  const files = filteredEntries.filter((e) => e.isFile());

  folders.forEach((folder, index) => {
    const isLast = index === folders.length - 1 && files.length === 0;
    const connector = isLast ? "└──" : "├──";
    treeStr += `${prefix}${connector} ${folder.name}\n`;

    if (isCollapsed) {
      return treeStr;
    }

    const newPrefix = prefix + (isLast ? "    " : "│   ");
    treeStr += getFolderTree(path.join(dirPath, folder.name), newPrefix);
  });

  files.forEach((file, index) => {
    const isLast = index === files.length - 1;
    const connector = isLast ? "└──" : "├──";
    treeStr += `${prefix}${connector} ${file.name}\n`;
  });

  return treeStr;
}

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "project-trees.showProjectTree",
    async () => {
      const workspaceFolders = vscode.workspace.workspaceFolders;
      if (!workspaceFolders || workspaceFolders.length === 0) {
        vscode.window.showErrorMessage("No workspace folder is open.");
        return;
      }

      const {
        showRootFolderName,
        ignoreFolders,
        collapsedFolders,
        projectName,
        isDebug,
      } = getConfiguration();

      const rootPath = workspaceFolders[0].uri.fsPath;
      const rootFolderName = path.basename(rootPath);

      let treeString = getFolderTree(rootPath);
      if (showRootFolderName) {
        treeString = `${rootFolderName}\n${treeString}`;
      }

      const action = await vscode.window.showQuickPick(
        [
          {
            label: "Copy to Clipboard",
            description: "Copy the project tree structure to the clipboard",
          },
          {
            label: "Save to File",
            description: "Save the project tree structure to a file",
          },
          {
            label: "Show in Output",
            description:
              "Show the project tree structure in the output channel",
          },
        ],
        {
          placeHolder: "Choose an action for the project tree",
        }
      );

      switch (action?.label) {
        case "Copy to Clipboard":
          vscode.env.clipboard.writeText(treeString);
          vscode.window.showInformationMessage(
            "Project Tree copied to clipboard."
          );
          break;
        case "Save to File":
          const fileUri = await vscode.window.showSaveDialog({
            defaultUri: vscode.Uri.file(
              path.join(rootPath, `${projectName ?? "ProjectTree"}.txt`)
            ),
            filters: {
              Text: ["txt"],
            },
          });
          if (fileUri) {
            fs.writeFileSync(fileUri.fsPath, treeString);
            vscode.window.showInformationMessage(
              `Project Tree saved to ${fileUri.fsPath}`
            );
          }
          break;
        case "Show in Output":
          const outputChannel =
            vscode.window.createOutputChannel("Project Tree");
          outputChannel.show();
          outputChannel.appendLine(treeString);

          if (isDebug) {
            outputChannel.appendLine("\n[DEBUG] Configuration:");
            outputChannel.appendLine(
              `Show Root Folder Name: ${showRootFolderName}`
            );
            outputChannel.appendLine(
              `Ignore Folders: ${JSON.stringify(ignoreFolders)}`
            );
            outputChannel.appendLine(
              `Collapsed Folders: ${JSON.stringify(collapsedFolders)}`
            );
            outputChannel.appendLine(
              `Root Path: ${rootPath} (${rootFolderName})`
            );
          }
          break;
        default:
          return;
      }

      vscode.window.showInformationMessage("Project Tree Generated.");
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
