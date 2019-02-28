

> *This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).*

## Stack used
- React.
- react-scripts to bootstrap the project.
- Axios for API requests.
- lodash for performant utilities functions.
- SASS.
- flat (used for locale given to react-intl, to flatten json data), react-intl for internationalization.
- Jest (mocking with ease!), Enzyme (for traversing the dom) for unit testing.

## Concepts
- React hooks (recently released) for functional components.
- Debouncing search bar in order not to stress the server needlessly.
- Single **SCSS** entry point **index.scss** to centralize stylesheets, it contains components, common elements, shared variables, etc.
- Responsive design, the unit **rem** was mostly used to size elements, the root font-size is set to 12px. The reason behind this choice is that is it extremely easy to scale on lower screen resolutions by just changing the root font-size in order to enlarge almost all elements that use the **rem** unit.

## Issues
- [RESTful Github API  v3](https://developer.github.com/v3/) makes it extremely hard to extract data such as total number of followers, repositories and stars. See improvements in the next section.

## To improve
- Calls to the Github API could be more easy to make if [GraphQL API v4](https://developer.github.com/v4/) is used. The current issue we are having is that we need to make many subsequent requests just to have data that are not present first-hand.

## Environment variables
- You will need to specify a token in order to increase the rate limit set by github api from 10 to 30 for the search api. Check the details at https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line
- Once the token generated, run `REACT_APP_GITHUB_TOKEN=token yarn start` for the developement environment or for the production environment, run `REACT_APP_GITHUB_TOKEN=token yarn build` and serve it like so `yarn global add` `serve serve -s build`
- If you do not want to deal with injection of environment variable directly from the script, create an `.env` directly at the root and specify you token there.


## How to test
- Due to the issues related to how the REST API works, you need give an input that is not likely to generate a lot of users such as "Destinyyyy".

- If the input gives too many results, it will most likely make Github throw an error and stop any requests for a few minutes.

## Scripts available
> *Check the section Environment variables above to specify the token within the npm scripts*
- `yarn test` in order to run all the unit tests.
- `yarn build` for creating the production bundle.
- `yarn start` to boot up the development environment 
