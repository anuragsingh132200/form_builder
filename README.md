# TechoForm - Custom Form Builder

TechoForm is a versatile and user-friendly custom form builder designed to simplify the process of creating various types of questions for your forms. With TechoForm, you can effortlessly craft dynamic forms tailored to your specific needs, incorporating three distinct question types: Category, Cloze, and Paragraph. This README provides an overview of the TechoForm project, its features, and how to get started.

## Table of Contents

- [Introduction](#introduction)
- [Description Video](#description-video)
- [Screenshots](#screenshots)
- [Features](#features)
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Creating a Form](#creating-a-form)
- [Homepage](#homepage)
- [Form Response](#form-response)
- [Contributing](#contributing)
- [License](#license)

## Description Video

https://github.com/TusharTechs/TechoForm/assets/56952465/6e01e47b-c91f-4177-b3b1-77296cad1032

## ScreenShots

1. Form Creation Page

![Screenshot_22](https://github.com/TusharTechs/TechoForm/assets/56952465/972a2ba3-6a15-4b43-84b0-e79e51670e05)

![Screenshot_23](https://github.com/TusharTechs/TechoForm/assets/56952465/3764a66e-3431-4ec7-bc43-db6f67437598)

2. Form Listing Page

![Screenshot_24](https://github.com/TusharTechs/TechoForm/assets/56952465/3e270de9-80cf-4574-a908-442697d4ded7)

3. Form Response Page

![Screenshot_25](https://github.com/TusharTechs/TechoForm/assets/56952465/d8e5871b-162d-4860-964e-8fef3035512a)

![Screenshot_26](https://github.com/TusharTechs/TechoForm/assets/56952465/920c3c33-55af-4a76-907f-8bcd3fd1b798)

## Introduction

TechoForm empowers users to design and deploy custom forms with ease. It supports three types of questions: Category, Cloze, and Paragraph. The Category question allows users to organize items into different categories. The Cloze question enables users to create fill-in-the-blank sentences by specifying options for selected words. The Paragraph question facilitates the creation of paragraph-based questions with multiple-choice options.

## Features

- **Category Question:** Organize items into customizable categories.
- **Cloze Question:** Create fill-in-the-blank sentences with customizable options.
- **Paragraph Question:** Generate paragraph-based questions with multiple-choice options.
- **Create Form Page:** Easily design and customize your form questions.
- **Homepage:** View a list of created forms, along with creation dates and response counts.
- **Form Response Page:** Answer form questions and save responses with unique IDs and URLs.

## Getting Started

Follow these steps to set up and use TechoForm on your system.

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the TechoForm repository:

git clone https://github.com/TusharTechs/techoform.git

2. Navigate to the project directory:

cd techoform

3. Install dependencies:

npm install

4. Configure your MongoDB connection by editing the .env file:

MONGO_URI=your-mongodb-connection-uri

5. Start the application:

npm start

6. Access TechoForm in your web browser at http://localhost:3000.

## Usage

1. Creating a Form

2. Navigate to the "Create Form" page.

3. Choose the desired question type (Category, Cloze, or Paragraph).

4. Follow the prompts to create and customize your question.

5. Save the form.

### Homepage

1. Access the homepage to view a list of created forms.

2. Each form entry displays the form's creation date and response count.

3. Click on a form to view its details.

### Form Response

1. Access the "Form Response" page.

2. Select a form to respond to.

3. Answer the questions based on the form's design.

4. Save your responses.

5. Each response is assigned a unique ID and URL for future access.

## Contributing
Contributions are welcome! To contribute to TechoForm, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your fork.
5. Create a pull request to the main repository.

## License
TechoForm is released under the [MIT License](LICENSE).
