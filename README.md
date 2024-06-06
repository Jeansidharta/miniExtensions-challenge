## miniExtensions Challenge

This is my implementation of the [challenge](https://loom.com/share/49785756b54749cba550a9791707237a) provided by the miniExtensions team. The challenge is the following:

Given an initial code base that allows users to login/signup with an Email and with Google oauth2, implement the hability for the users to login/signup with their phone numbers, and always make sure the application has the user's email and phone number. This means:
- If the user creates an account with an email or google oauth2, immediatly ask the user to provide a phone number
- If the user creates an account with a phone number, immediatly ask the user to provide an email

Since the challenge provides an initial codebase, I wrote my sollution to try to fit with the style that was previously there. However, since this is an interview challenge, I rewrote and re-architectured things that I thought would embelish the project in general. This means I tried to ballance rewriting everything to my style, and tring to keep my changes to a minimal.

## Dependencies

- [Firebase CLI](https://firebase.google.com/docs/cli)
- [Node and NPM](https://nodejs.org/en/download/package-manager)

## How to run

- Create a firebase project
  - Under "Authentication" > "Sign-in Methods" make sure you have:
    - Email/Password with passwordless sign-in turned on
    - Phone
    - Google
- Clone this repository
- Install the dependencies with `npm install`
- Copy the file `.env.template` and rename it to `.env`
  - Replace all "FILL_ME_IN" with an actual value
  - You can find these values for your firebase project under "Project Settings" > "General" > "Your apps"
- Update the "FILL_ME_IN" value in the file `scripts/dev.sh` line 20 with the proper value
  - The proper value is the project name you gave your project in firebase
- Update the "FILL_ME_IN" value in the file `.firebaserc` line 3 with the proper value
  - This value must be the same as the "default bucket" value you put in the .env file
- Login to firebase using the cli by running `firebase login`
- Run the development instance with `npm run dev`
- Access the website at http://localhost:3000

## Some notes

Here are some things I'd change if I had more time or a larger scope of the challenge

- Email validation is required if the user initially creates an account with a phone number, but validation is not required if the account was created with an email. Email validation should be added to the latter case, to maintain consistency. I didn't add this to keep my changes within the scope of the challenge
- Some of the authentication paths require a hard-reload of the page (using `router.reload()`). This is not ideal. I'd like to restructure the login/signup path to not need these costly reloads.
- The project has some accessibility issues, especially regarding the error message. Errors are currently being displayed in Toast components. This is bad for screen readers. I'd like to change these error messages so they appear as text components in the form element.
- There is a lot of mixing of style components with data-manipulating components. I'd like to restructure the `components` folder to better separate the components that contain logic from the ones that don't.
- The Some of the "FILL_ME_IN" values were used outside the `.env` file. I'd like to restructure these pieces of the software so we could centralise these secret variables
