# Build react component - v.1

Interactive menu for building ReactJS components.

### Requirements

- Node.js (v20.1.0)

### Ussage

1. Install dependences and build dist.

   ```javascript
   npm install
   npm run build
   ```

2. Copy the "dist/build-component.min.js" file to the root directory of your project.
3. In your project folder, execute the following code passing as parameter the path to the source code, e.g.:

   ```javascript
   node build-component.min.js ./src
   ```

4. To be able to test the code while developing new features run:

   ```javascript
   node ./src/index.js ./src
   ```

### Screenshots

![App screenshot](/screenshots/01.jpg "Screenshot 1")

![App screenshot](/screenshots/02.jpg "Screenshot 1")

### TODO

1. Review the code
2. Add tests
