# Sandpack Playground

This playground uses [Sandpack](https://sandpack.codesandbox.io/) - a powerful, browser-based code editor and runtime environment for React applications.

## Features

- **Live Code Editor**: Monaco editor with syntax highlighting and IntelliSense
- **Real-time Preview**: See your React components render instantly
- **Multiple Files**: Organize your code across multiple files and folders
- **Console Integration**: Built-in console for debugging and logging
- **Theme Support**: Automatic dark/light theme switching
- **Resizable Panels**: Adjust editor and preview panel sizes
- **Hot Reload**: Automatic refresh when code changes
- **Dependencies**: Pre-configured with common React libraries

## Included Dependencies

- `react` ^18.2.0
- `react-dom` ^18.2.0
- `lucide-react` ^0.263.1 (for icons)
- `date-fns` ^2.30.0 (for date utilities)
- `lodash` ^4.17.21 (for utility functions)
- `uuid` ^9.0.0 (for unique IDs)

## File Structure

The playground includes several example files:

- `/App.js` - Main application component
- `/components/UserCard.js` - Reusable user card component
- `/hooks/useUsers.js` - Custom hook for user management
- `/index.js` - Application entry point (hidden)
- `/public/index.html` - HTML template (hidden)

## Usage

The playground is automatically available at `/playground` route. Users can:

1. Edit code in the Monaco editor
2. See live preview in the right panel
3. Use the console for debugging
4. Switch between files using tabs
5. Resize panels by dragging the divider
6. Use all included dependencies without imports

## Benefits over Custom Implementation

- **Reliability**: Battle-tested by CodeSandbox team
- **Security**: Built-in sandboxing and security measures
- **Performance**: Optimized bundling and hot reloading
- **Features**: Rich editor features, error handling, and debugging tools
- **Maintenance**: No need to maintain custom bundling logic
- **Updates**: Automatic updates and bug fixes from the Sandpack team
