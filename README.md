# SeedSafer - A Mobile App for Secure Seed Storage

SEEDSAFER IS A REACT NATIVE AND TYPESCRIPT MOBILE APP DESIGNED TO SECURELY STORE A USER'S TWELVE-WORD RECOVERY SEED, DERIVE THEIR PRIVATE KEY, AND DISPLAY THEIR ETH BALANCE AND ADDRESS. THIS README WILL PROVIDE INSTRUCTIONS FOR RUNNING AND DEVELOPING SEEDSAFER.

## Getting Started

1. Clone the repository to your local machine
2. Install dependencies by running npm install in the project directory
3. Create an .env file in the project root and add your INFURA_API_KEY in the following format: INFURA_API_KEY=<your_api_key_here>
4. Start the app by running npm start
5. For iOS, run **npm run expo:ios**; for Android, run **npm run expo:android**

## Scripts

- start - starts the React Native bundler
- ios - runs the app on an iOS simulator/device
- android - runs the app on an Android emulator/device
- test:detox - runs Detox end-to-end tests on an iOS simulator
- build:detox - builds the Detox test environment for iOS
- ci:test:detox - runs Detox end-to-end tests on an iOS simulator in release mode
- ci:build:detox - builds the Detox test environment for iOS in release mode
- compile - checks the TypeScript code for errors without emitting any output
- format - formats the code using Prettier
- lint - lints the code using ESLint with automatic fixes and formats the code using Prettier
- patch - patches installed packages to fix bugs or apply updates
- test - runs unit tests with Jest
- test:watch - runs Jest in watch mode
- adb - sets up port forwarding for Android debugging
- postinstall - runs a script to install additional dependencies and set up the Detox test environment
- bundle:ios - generates a production bundle for iOS
- bundle:android - generates a production bundle for Android
- release:ios - placeholder command for releasing the app to the App Store using Xcode
- release:android - builds a signed APK for release on Android
- release:android-win - builds a signed APK for release on Android (Windows command prompt version)
- clean - cleans the build directories for Android and iOS
- clean-all - cleans the build directories for Android, iOS, and Node.js

## Dependencies

- React Native - core framework for building mobile apps using JavaScript and React
- TypeScript - type-checking and static analysis for JavaScript
- React Navigation - routing and navigation library for React Native apps
- AsyncStorage - key-value storage system for React Native apps
- Web3.js - JavaScript library for interacting with the Ethereum blockchain
- ethers.js - JavaScript library for interacting with the Ethereum blockchain (alternative to Web3.js)
- Detox - end-to-end testing framework for mobile apps
- Jest - JavaScript testing framework for unit tests
- ESLint - JavaScript linter with customizable rules and automatic fixes
- Prettier - code formatter with customizable rules
