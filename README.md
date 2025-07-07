# Project Trees - VS Code Extension

[![Version](https://img.shields.io/badge/version-0.0.1-blue.svg)](https://github.com/Glowstudent777/VSCode-Folder-Tree)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

A Visual Studio Code extension that generates clean, visual representations of your project's folder structure. Perfect for documentation, code reviews, and understanding project organization at a glance.

## 🚀 Features

- **Visual Tree Generation**: Creates ASCII-style folder trees of your project structure
- **Smart Filtering**: Automatically ignores common build/dependency folders (node_modules, dist, .git, etc.)
- **Customizable Display**: Configure which folders to show, hide, or collapse
- **Debug Mode**: Detailed logging for troubleshooting and configuration verification
- **Export Options**: Save the generated tree to a file with a customizable name
- **Output Channel Integration**: Results displayed in VS Code's output panel for easy copying

## 📦 Installation

### From VS Code Marketplace (Recommended)

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X / Cmd+Shift+X)
3. Search for "Project Trees"
4. Click Install

### Manual Installation from VSIX

1. Download the latest `.vsix` file from the [releases page](https://github.com/Glowstudent777/VSCode-Folder-Tree/releases)
2. Open VS Code
3. Open Command Palette (Ctrl+Shift+P / Cmd+Shift+P)
4. Run `Extensions: Install from VSIX...`
5. Select the downloaded `.vsix` file

## 🛠️ Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/) package manager
- [VS Code](https://code.visualstudio.com/)

### Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/Glowstudent777/VSCode-Folder-Tree.git
   cd VSCode-Folder-Tree
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Compile the extension**

   ```bash
   pnpm run compile
   ```

4. **Run in development mode**
   - Press `F5` in VS Code to open a new Extension Development Host window
   - Or use the "Run Extension" configuration in the Debug panel

### Available Scripts

- `pnpm run compile` - Compile TypeScript to JavaScript
- `pnpm run watch` - Watch for changes and auto-compile
- `pnpm run lint` - Run ESLint on source files
- `pnpm run test` - Run the test suite
- `pnpm run vscode:package` - Create a .vsix package file

## 📋 Usage

1. Open any folder/workspace in VS Code
2. Open Command Palette (Ctrl+Shift+P / Cmd+Shift+P)
3. Run the command: `Project Trees: Generate Project Tree`
4. Select the output method:
   - **Output Channel**: The tree will be displayed in the "Project Tree" output channel
   - **File Export**: The tree will be saved to a file in the workspace root
   - **Clipboard**: The tree will be copied to your clipboard

### Example Output

```
my-project
├── src
│   ├── components
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── utils
│   │   └── helpers.ts
│   └── index.ts
├── package.json
└── README.md
```

## ⚙️ Configuration

This extension contributes the following settings that can be configured in your VS Code settings:

### `projectTree.rootFolderName`

- **Type**: `boolean`
- **Default**: `true`
- **Description**: Whether to show the root folder name in the project tree

### `projectTree.ignoreFolders`

- **Type**: `array`
- **Default**: `["node_modules", "dist", "out", ".git", ".vscode", ".vs", "build"]`
- **Description**: Folders to ignore when generating the project tree

### `projectTree.collapsedFolders`

- **Type**: `array`
- **Default**: `["external", "vendor", "libs"]`
- **Description**: Folders to collapse (show name only, not contents) in the project tree

### `projectTree.exportName`

- **Type**: `string`
- **Default**: `"${project}-tree"`
- **Description**: The name of the exported project tree file. Use `${project}` to include the workspace folder name. For example, `${project}-tree` will result in `MyProject-tree.txt` if the workspace folder is named `MyProject`.

### `projectTree.debug`

- **Type**: `boolean`
- **Default**: `false`
- **Description**: Enable debug mode to show configuration details in output

### Example Configuration

Add to your VS Code `settings.json`:

```json
{
  "projectTree.rootFolderName": true,
  "projectTree.ignoreFolders": [
    "node_modules",
    "dist",
    ".git",
    "coverage",
    "build"
  ],
  "projectTree.collapsedFolders": ["vendor", "external"],
  "projectTree.debug": false
}
```

## 🔧 Building Your Own Install File

### Creating a VSIX Package

1. **Ensure you have vsce installed globally**

   ```bash
   npm install -g @vscode/vsce
   ```

2. **Build the extension**

   ```bash
   pnpm run compile
   ```

3. **Create the VSIX package**

   ```bash
   pnpm run vscode:package
   ```

   This will create a `.vsix` file in the root directory (e.g., `project-trees-0.0.1.vsix`)

4. **Install your custom build**
   ```bash
   code --install-extension project-trees-0.0.1.vsix
   ```

### Publishing to Marketplace (Maintainers Only)

1. **Get a Personal Access Token** from [Azure DevOps](https://dev.azure.com/)
2. **Login to vsce**
   ```bash
   vsce login Glowstudent
   ```
3. **Publish**
   ```bash
   vsce publish
   ```

## 🧪 Testing

Run the test suite:

```bash
pnpm run test
```

The extension includes:

- Unit tests for core functionality
- Integration tests with VS Code API
- Linting with ESLint and TypeScript compiler checks

## 📝 Release Notes

### 0.0.1 (Current)

- Initial release
- Basic folder tree generation
- Configurable ignore and collapse settings
- Debug mode support
- Output channel integration

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Run tests and linting**
   ```bash
   pnpm run lint
   pnpm run test
   ```
5. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
6. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style
- Add tests for new functionality
- Update documentation as needed
- Ensure all tests pass before submitting

## 🐛 Issues & Support

- **Bug Reports**: [GitHub Issues](https://github.com/Glowstudent777/VSCode-Folder-Tree/issues)
- **Feature Requests**: [GitHub Issues](https://github.com/Glowstudent777/VSCode-Folder-Tree/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Glowstudent777/VSCode-Folder-Tree/discussions)

Before creating an issue, please:

- Check if the issue already exists
- Include VS Code version and extension version
- Provide steps to reproduce the problem
- Include relevant configuration settings

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with the [VS Code Extension API](https://code.visualstudio.com/api)
- Inspired by command-line tree utilities
- Thanks to all contributors and users

---

**Enjoy generating beautiful project trees! 🌳**
