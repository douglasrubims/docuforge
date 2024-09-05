# Docuforge

Docuforge is a simple and efficient command-line tool (CLI) for automating documentation generation for any software project, regardless of the programming language or technology stack used.

## Features

- **Automatic Documentation Generation**: Docuforge allows developers to generate up-to-date and accessible documentation directly from the project's code structure.
- **Language Agnostic**: The tool is compatible with any programming language, ensuring flexibility and efficiency in any development environment.
- **File/Directory Exclusion**: Ability to configure the exclusion of certain files or directories from documentation generation.
- **CLI Execution**: Easy-to-use command-line interface for generating documentation with just a few commands.
- **OpenAI Integration**: Utilizes the OpenAI API to generate detailed and accurate descriptions of the project's files and directories.
- **Intelligent Regeneration**: Docuforge only regenerates documentation when changes are detected in the code, and it specifically targets only the modified files, saving time and resources.

## Project Origin

This project is a fork of [codocx](https://github.com/jefferson-calmon/codocx), an original documentation generation tool. Docuforge was developed based on this project, expanding its functionalities and adapting it to meet specific needs.

## Setting Up Husky (Optional)

To automatically update documentation with each commit, you can set up Husky by following these steps:

1. Install Husky as a development dependency:

    ```bash
    yarn add -D husky
    ```

    Or using npm:

    ```bash
    npm install --save-dev husky
    ```

2. Initialize Husky:

    ```bash
    npx husky-init
    ```

3. Create a script in your `package.json` called `gen-docs`:

    ```json
    {
      "scripts": {
        "gen-docs": "docuforge"
      }
    }
    ```

4. Edit the `.husky/pre-commit` file to include the following:

    ```sh
    #!/usr/bin/env sh
    . "$(dirname -- "$0")/_/husky.sh"

    yarn gen-docs

    if [ -n "$(git status docs --porcelain)" ]; then
      git add docs
    fi
    ```

This setup will ensure that documentation is generated and updated automatically every time you make a commit.

## Overview

Documentation is essential, but often neglected. Docuforge solves this problem by allowing developers to generate up-to-date and accessible documentation with just a few commands. The tool is compatible with any programming language, ensuring flexibility and efficiency in any development environment.

## Running via CLI

The Docuforge CLI is designed to be extremely easy to use, allowing documentation generation directly from your project's code structure.

### How to Use the CLI

1. **Install the CLI globally:**

    ```bash
    npm install -g docuforge
    ```
    or
    ```bash
    yarn global add docuforge
    ```

2. **Generate the documentation:**

    Navigate to your project directory and run:

    ```bash
    docuforge -p <DIR_PROJECT>
    ```

    You can replace `<DIR_PROJECT>` with the path to your project directory. If you don't provide a path, the CLI will use the current directory.

### Ignoring Files

To exclude certain files or directories from documentation generation, simply create a `.dcfignore` file and list the files and folders you want to ignore inside it. The tool will automatically ignore them. Additionally, there is a default list of ignored paths located in the `src/constants/index.ts` file.

## Requirements

Before you begin, make sure your machine meets the following requirements:

-   Node.js (version 14 or higher)
-   npm (Node.js package manager)

## How to Run the Project Manually

If you prefer to run Docuforge locally, follow these steps:

1. **Clone the repository:**

    ```bash
    git clone <REPOSITORY_URL>
    cd docuforge
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Start the project:**

    ```bash
    npm start
    ```

## Contributing

Contributions are welcome! If you wish to contribute to Docuforge, follow these steps:

1. **Fork the repository.**
2. **Create a branch for your feature or bug fix:**

    ```bash
    git checkout -b my-new-feature
    ```

3. **Make your changes and commit:**

    ```bash
    git commit -m "Add new feature"
    ```

4. **Push to the remote repository:**

    ```bash
    git push origin my-new-feature
    ```

5. **Open a Pull Request.**

Please ensure that your contributions comply with the project's code of conduct.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more information.
