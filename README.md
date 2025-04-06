# EzCommerce

## Overview
ezCommerce is a modern e-commerce web application built with Angular, providing a robust and scalable solution for online retail experiences.

## Prerequisites
- Node.js (version 16.x or later)
- Angular CLI (version 16.1.0)
- npm (version 8.x or later)

## Project Setup

### Installation
1. Clone the repository
git clone https://github.com/gauravraj9211/ezcommerce.git
cd ezcommerce

2. Install dependencies
npm install

## Development Server

### Running the Application
To start the development server:
ng serve
Navigate to http://localhost:3000/. The application will automatically reload if you change any source files.

## Backend Setup

### Purpose
The backend is a mock API powered by `json-server`, used for development and testing purposes.

### Prerequisites
Ensure you have `json-server` installed globally or use `npx` to run it without installation.

### Running the Backend
To start the backend server:
```
npx json-server db.json
```
The backend server will run at [http://localhost:3000/](http://localhost:3000/) by default.  
To customize the port, use the `--port` flag:
```
npx json-server db.json --port 3000
```

### Customizing the Backend
To modify the mock data, edit the `db.json` file located in the project root.  
For advanced configurations, refer to the [json-server documentation](https://github.com/typicode/json-server).

### Notes
- The backend is intended for development and testing purposes only.
- Ensure the backend is running alongside the frontend for the application to function correctly.

## Project Structure
- src/: Source code directory
  - app/: Core application components
  - assets/: Static assets
  - environments/: Environment configuration files

## Generating Components
Use Angular CLI to generate new components:
ng generate component component-name
Supported generators:
- Component: ng generate component
- Directive: ng generate directive
- Pipe: ng generate pipe
- Service: ng generate service
- Class: ng generate class
- Guard: ng generate guard
- Interface: ng generate interface
- Enum: ng generate enum
- Module: ng generate module

## Building the Project
To build the application:
ng build
Build artifacts will be stored in the dist/ directory.

## Testing

### Unit Tests
Run unit tests using Karma:
ng test

### End-to-End Tests
To run end-to-end tests:
ng e2e
*Note: You'll need to add an end-to-end testing package first.*

## Deployment
1. Build the project for production:
ng build --configuration=production
2. Deploy the contents of the dist/ directory to your preferred hosting platform.

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Technologies
- Angular 16.1.0
- TypeScript
- RxJS
- Angular CLI

## License
Distributed under the [MIT License](./LICENSE). See the LICENSE file for more information.

## Contact
- **Email**: gauravupadhayay9801@gmail.com  
- **GitHub**: [grajrb](https://github.com/grajrb)  
- **LinkedIn**: [Gaurav Raj](https://www.linkedin.com/in/gaurav-raj-095a8a129/)  

Project Link: [https://github.com/grajrb/ezcommerce](https://github.com/grajrb/ezcommerce)

## Acknowledgements
- Angular
- Angular CLI
- TypeScript Team
