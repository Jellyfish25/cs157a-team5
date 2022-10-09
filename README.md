# CS157A_DB_Project

Project for the goat Dr. Wu's class.

### How to Run

Requires [git](https://git-scm.com/downloads) and [NodeJs](https://nodejs.org/en/) (Use the LTS version).

- Clone the project <code>git clone https://github.com/Jellyfish25/cs157a_db_project</code>
- Navigate to the project directory <code>cd cs157a_db_project</code>
- Install the required dependencies <code>npm install</code>
- Run the project<code>npm run dev</code>
- If it hasn't opened already, open up a web browser and navigate to localhost:3000.

### Basic Typescript vs Java Comparison

- Variables

  ```typescript
  // ts
  const message: String = 'Hello'; // <- optional semi
  ```

  ```java
  // java
  final String message = "Hello";
  ```

- Functions
  ```typescript
  export function myFunctionName(arg0: number, arg1: number): number {
    // <- return type
    return arg0 + arg1;
  } // Export makes it "public" without export, it would be private
  // Also number type covers both int and float and double
  ```
  ```java
  public int myFunctionName(int arg0, int arg1) {
    return arg0 + arg1;
  }
  ```
- Typescript supports higher order functions (functions can be passed as arguments. Google: callback function)
  ```typescript
  function doFunctionAndPrint(func: () => number) {
    func(); // Calling it
    console.log('Done!'); // printing
  }
  ```
- Anonymous functions (Google: Fat arrow function)
  ```typescript
  // With doFunctionAndPrint from above
  doFunctionAndPrint(() => console.log('A function')); // passing in a fat arrow function as an arg
  // Prints 'A function'
  // Then prints 'Done!'
  ```

### Basic NextJs Project Structure

- node_modules: where the dependencies are installed. You won't need to navigate in here ever.
- pages:
  - Every file besides \_app represents a route.
  - index.tsx is special as it maps to / (localhost:3000/)
  - As an example, home.tsx would map to (localhost:3000/home)
  - You can use folders to create nested routes
    - Imagine you have a media folder, with 3 files: index.tsx, videos.tsx, games.tsx
    - index -> localhost:3000/media/
    - videos -> localhost:3000/media/videos
    - games -> localhost:3000/media/games
- public: Static assets like custome fonts and images are stored here.
  - Example: imagine we have an image in public named image.png
  - `<img src=/image.png>` <- notice that we do not use relative file paths. We treat image like it is in the root dir.
- styles: gonna delete this
- .eslint, next.config.js, tsconfig <- ignore these. They define the structure of our code.
- package.json <- defines scripts and dependencies. Ignore for now
- package-lock.json <- defines exact version numbers of dependencies.

### yeet
