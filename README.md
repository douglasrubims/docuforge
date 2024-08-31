# Docuforge

Docuforge is a simple and efficient command-line tool (CLI) for automating documentation generation for any software project, regardless of the programming language or technology stack used.


## Project Origin

This project is a fork of [codocx](https://github.com/jefferson-calmon/codocx), an original documentation generation tool. Docuforge was developed based on this project, expanding its functionalities and adapting it to meet specific needs.

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

If you want to exclude certain files or directories from documentation generation, you can configure this by editing the `src/constants/index.ts` file.

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
