import TagManager from "react-gtm-module";
import { useEffect } from "react";

export function InitializeGTM(props) {
    useEffect(() => {
        if (!mx.ga4Connected) {
            // flag to prevent onNavigation from sending multiple page views after things like after widget load, after show page, etc.
            if (props.gtmId.status !== "available") {
                // if the data is not yet available then we dont do anything
                return;
            }

            for (const object of props.additionalProps) {
                if (object.propDataSource.status !== "available") {
                    // if the data is not yet available then we dont do anything
                    return;
                }
            }

            const origOnNavigation = mx.ui.getContentForm().onNavigation; // save what the original onNavigation function did
            mx.ui.getContentForm().onNavigation = () => {
                // Custom Actions
                if (props.sendCustomProps === false) {
                    const tagManagerArgsInitialize = {
                        gtmId: props.gtmId.value
                    };

                    TagManager.initialize(tagManagerArgsInitialize);
                } else {
                    const dataLayerStructure = () => {
                        var dataLayer = '{"event":"' + props.pageViewEventName + '",'; // initialize the dataLayer variable

                        if (props.sendPageTitle) {
                            // send page title
                            dataLayer += '"Page Name":"' + mx.ui.getContentForm().title + '",';
                        }

                        if (props.sendModuleLocation) {
                            // send module location
                            var modulePath = mx.ui.getContentForm().path;
                            // eslint-disable-next-line
                            var moduleLocation = function (modPath) {
                                var pageExtension = ".page.xml";
                                var path = modPath.substr(0, modPath.length - pageExtension.length);
                                return path;
                            };
                            dataLayer += '"Module Location":"' + moduleLocation(modulePath) + '",';
                        }

                        if (props.sendPageURL) {
                            // send page URL
                            var pageURL;
                            if (mx.ui.getContentForm().url !== null) {
                                pageURL = window.location.origin + mx.ui.getContentForm().url;
                            } else {
                                pageURL = window.location.origin;
                            }

                            // eslint-disable-next-line
                            var trimmedURL = function (fullURL) {
                                var lastCharIndex = fullURL.lastIndexOf("/");
                                var endString = fullURL.substring(lastCharIndex + 1, fullURL.length);
                                if (isNaN(endString)) {
                                    return fullURL; // the end of the string isn't a number, return the whole thing
                                } else {
                                    return fullURL.substr(0, lastCharIndex); // the end of the string is a number, trim it
                                }
                            };
                            dataLayer += '"Page URL":"' + trimmedURL(pageURL) + '",';
                        }

                        if (props.sendSessionID) {
                            // send session ID
                            dataLayer += '"Session ID":"' + mx.session.getSessionObjectId() + '",';
                        }

                        if (props.sendAdditionalProps) {
                            // send additional properties
                            let expressionResult = "";

                            for (const line of props.additionalProps) {
                                for (const object of line.propDataSource.items) {
                                    // object is an item in the list that is returned from the data source
                                    expressionResult += line.propValue.get(object).value + ", ";
                                }

                                expressionResult = expressionResult.replace(/,\s*$/, "");
                                dataLayer += '"' + line.propName + '":"' + expressionResult + '",';
                                expressionResult = "";
                            }
                        }

                        dataLayer = dataLayer.replace(/,\s*$/, ""); // remove the last comma from the dataLayer variable
                        dataLayer += "}";
                        return JSON.parse(dataLayer);
                    };

                    const dataLayer = dataLayerStructure(props);

                    const tagManagerArgs = {
                        gtmId: props.gtmId.value,
                        dataLayer
                    };

                    TagManager.initialize(tagManagerArgs);
                }

                mx.ga4Connected = true; // We have sent the page hit, now toggle the switch off to avoid sending duplicates

                // Original Actions
                origOnNavigation();

                return null;
            };
        }
    }); // no dependency array -> trigger on every load

    return null;
}
