# Archive No.2 (Admin)

Archive No.2 Admin is a content management system designed with React and Javascript, allowing for the management of blog posts and comments efficiently via a user-friendly interface.

## Live
https://archive-no2.netlify.app/

## Features 
- Text search
- Creating, editing and deleting posts
- Adding and managing tags
- WYSIWYG editor for creating and editing posts
- Commenting on posts
- Moderating blog comments
- Light and dark mode toggle
- Previous / next navigation buttons 

## Pages
| Page | Description |
| --- | --- |
| / | Homepage displaying all blog posts |
| /about | Display profile of user |
| /tags | Display tags for navigation |
| /newsletter | Display option for newsletter subscription |
| /posts/:post_id | Display specific posts along with the comments |
| /posts/unpublished | Display unpublished (drafted) posts |
| /new-post | Create a new blog post |
| /posts/:post_id/edit-post | Edit a specific post and its tags |
| /login | Login/Sign Up Page |
| /search | Display blog posts as search results based on input |
| /tag/tag_id | Display posts under specific tags |
| /* | Not Found Page |

## API
The API is responsible for the operation of the entire system, as well as the storage, retrieval, and management of data. The source code can be found at https://github.com/baoqii/archive-no2-api

## Client
The codebase for the frontend of the blog client is accessible on https://github.com/baoqii/archive-no2-client 

## Installation 
1. Clone the repository to your local machine
2. Install the required dependencies: `npm install`
3. Start the development server: `npm run dev`

## Dependencies
- [@tinymce/tinymce-react](https://github.com/tinymce/tinymce-react) - A React wrapper for the TinyMCE editor.
- [Autoprefixer](https://github.com/postcss/autoprefixer) - PostCSS plugin that automatically adds vendor prefixes to CSS rules
- [ESLint](https://eslint.org) - A tool to identify and report on patterns found in ECMAScript/JavaScript code
- [Framer-motion](https://www.framer.com/motion/) - An open source motion library for React. 
- [Html-entities](https://github.com/mdevils/html-entities) - A library for encoding and decoding HTML entities.
- [Html-react-parser](https://github.com/remarkablemark/html-react-parser#readme) - A library for transforming HTML strings into React components.
- [Postcss](https://postcss.org) - A tool for transforming styles with JavaScript plugins
- [Prettier](https://prettier.io) - An opinionated code formatter that enforces consistent styling.
- [React](https://react.dev) - A JavaScript library for constructing user interfaces.
- [React-dom](https://react.dev) - Serves as the entry point to the DOM and server renderers for React 
- [React-loader-spinner](https://mhnpd.github.io/react-loader-spinner/) - Provides a straightforward React SVG spinner component that can be utilized for handling async await operations before data is loaded into the view
- [React-router-dom](https://reactrouter.com/en/main) - A library facilitating routing within React projects.
- [React-feather](https://feathericons.com) - A library that provides React components for popular Feather icons
- [React-toastify](https://fkhadra.github.io/react-toastify/introduction/) - A React library that simplifies the implementation of toast notifications
- [React-tooltip](https://react-tooltip.com) - A React library that facilitates the creation and management of tooltips
- [String-strip-html](https://www.npmjs.com/package/string-strip-html) - A library that enables the removal of HTML tags from strings.
- [Tailwind](https://tailwindcss.com) - A utility-first CSS framework that streamlines the process of building modern and responsive user interfaces
- [Vite](https://vitejs.dev) - A swift frontend build tool tailored for JavaScript and TypeScript projects.
