## Google Tag Manager
This widget inserts the required google tag manager scripts into the head and body tags in order to send page view data to your container.

## Features
1. Initializes google tag manager on the page.
2. Sends either a custom or normal page view event.
3. Can customize what data you would like to send with the page view event, including dynamic data.

## Usage
1. Create a new snippet with the page view widget and configure the settings that you'd like to send with each event.
    - Be sure to add your [GTM ID](https://support.google.com/tagmanager/answer/6103696) to the widget.
2. Add the snippet to each page layout for which you'd like page data to be sent.
3. Configure your [GTM container](https://support.google.com/tagmanager/answer/9442095?hl=en) such that you are recording the appropriate information.
4. If using google analytics (GA), configure GTM to send the data to the appropriate property in your configuration tag.
    - For normal page views in GA:
        - Enhanced measurements in GA must be turned on to track page views.
        - The configuration tag in GTM must be set to send the page views.
    - For custom page views in GA:
        - Enhanced measurements in GA must be turned off.
        - The configuration tag in GTM should be set to not send page views.
        - The custom event tag/trigger in GTM must be configured.

## Issues, suggestions and feature requests
The connection to GTM was accomplished using this [npm module](https://www.npmjs.com/package/react-gtm-module). For any issues, please submit a change request in its corresponding github repository which is linked from the npm page. For any other requests, please add them to this [github repository](https://github.com/kendallchristy/mendix-GTM-PageView) under the appropriate section.

## Known limitations and design decisions
1. Pop-ups and modal pop-ups will not currently send a page view because they are considered minor page interactions.
2. Any expression with a datasource under the additional properties will be calculated upon each full page load (browser refresh, initial load, etc.).

## Development and contribution
1. Install NPM package dependencies by using: `npm install`. If you use NPM v7.x.x, which can be checked by executing `npm -v`, execute: `npm install --legacy-peer-deps`.
2. Run `npm start` to watch for code changes. On every change:
    - the widget will be bundled;
    - the bundle will be included in a `dist` folder in the root directory of the project;
    - the bundle will be included in the `deployment` and `widgets` folder of the Mendix test project.