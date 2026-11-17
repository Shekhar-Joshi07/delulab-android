# Delulab

An Expo + React Native app for a creative community and local talent discovery platform.

## Current build scope

The active app entry is a login screen in JSX based on the supplied layout. Its colored circles float independently and the star rotates using Expo Go compatible Reanimated worklets. The form has a short entrance sequence and button press feedback.

"Join the lab", "Continue with email", and "Continue with Google" open the new role-first onboarding preview. Creator and business paths ask one question at a time, including an optional Instagram username. Each answer is kept locally while the current question blurs and fades away, the screen briefly turns blank white, and the next question appears. The role illustration uses the PNGs in `assets/onboarding` over the original colored circles. Android system Back returns to the previous question; Escape does the same in the browser. Google uses a clearly labeled sample identity; no Google account is accessed. The final preview is not a saved account. Authentication and account creation will be connected when the API contract is available.

The three onboarding PNGs mount invisibly while the login screen is open. Navigation into onboarding waits for their image-load events if someone enters before warm-up finishes, so page one does not reveal the illustrations late.

Earlier app screens remain in `src/screens.js` as the starting point for the broader product build, but they are not linked from the login screen yet.

## Run on Android with Expo Go

1. Install dependencies: `npm install`
2. Start the Expo server: `npm start`
3. Scan the QR code with Expo Go on Android, or press `a` to open an Android emulator.

Use a current Expo Go release compatible with Expo SDK 58.

## View in a browser

Run `npm run web`, then open the local URL printed by Expo (usually `http://localhost:8081`). The app is displayed in a centered phone-width frame on desktop. Use your browser's responsive device view to compare it at a particular phone size.
