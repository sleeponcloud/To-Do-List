# To Do List

## [Live Demo](https://sleeponcloud.github.io/to-do-list/)
### Installation

Install the required packages.

```
$ npm install
```

### Start

Build executable file from source code.
```
$ npm run start
```

### Architecture
- Component-Based Structure: The application follows a component-based architecture, where different components are responsible for specific functionalities and user interface elements.
    - App Component: Serves as the entry point for the application.
    - TodoItem Component: Represents a single to-do item in the list. It displays the item's details and handles actions such as marking an item as completed or deleting it.
    - AddTodo Component: Provides a input field for users to add new to-do items to the list.

-  State Management: Managing the state of the to-do list using a state management solution.
   - React Hooks: Utilizing React hooks like useState and useEffect to manage the state of the to-do list and handle updates.

-  Build Tools: Utilizing build tools to optimize and bundle the application for production.
   - Webpack: Bundling the application's JavaScript, styles, and assets into optimized bundles using Webpack.
   - Babel: Transpiling modern JavaScript syntax into a compatible version for older browsers using Babel.


