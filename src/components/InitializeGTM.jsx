import TagManager from "react-gtm-module";
import { useEffect, useRef, useCallback } from "react";

export function InitializeGTM(props) {
    const initializedRef = useRef(false);

    const checkDataAvailability = useCallback(() => {
        if (props.gtmId.status !== "available") {
            return false;
        }

        for (const object of props.additionalProps) {
            if (object.propDataSource.status !== "available") {
                return false;
            }
        }

        return true;
    }, [props.gtmId.status, props.additionalProps]);

    useEffect(() => {
        const initializeGTM = () => {
            if (!checkDataAvailability()) {
                return;
            }

            // Initialize GTM script only once
            if (!initializedRef.current) {
                const tagManagerArgsInitialize = {
                    gtmId: props.gtmId.value
                };
                TagManager.initialize(tagManagerArgsInitialize);
                initializedRef.current = true;
            }

            const dataLayerStructure = () => {
                let dataLayer = '{"event":"' + props.pageViewEventName + '",';

                if (props.sendPageTitle) {
                    dataLayer += '"Page Name":"' + mx.ui.getContentForm().title + '",';
                }

                if (props.sendModuleLocation) {
                    const modulePath = mx.ui.getContentForm().path;
                    // eslint-disable-next-line
                    const moduleLocation = function (modPath) {
                        const pageExtension = ".page.xml";
                        const path = modPath.substr(0, modPath.length - pageExtension.length);
                        return path;
                    };
                    dataLayer += '"Module Location":"' + moduleLocation(modulePath) + '",';
                }

                if (props.sendPageURL) {
                    let pageURL;
                    if (mx.ui.getContentForm().url !== null) {
                        pageURL = window.location.origin + mx.ui.getContentForm().url;
                    } else {
                        pageURL = window.location.origin;
                    }

                    // eslint-disable-next-line
                    const trimmedURL = function (fullURL) {
                        const lastCharIndex = fullURL.lastIndexOf("/");
                        const endString = fullURL.substring(lastCharIndex + 1, fullURL.length);
                        if (isNaN(endString)) {
                            return fullURL; // the end of the string isn't a number, return the whole thing
                        } else {
                            return fullURL.substr(0, lastCharIndex); // the end of the string is a number, trim it
                        }
                    };
                    dataLayer += '"Page URL":"' + trimmedURL(pageURL) + '",';
                }

                if (props.sendSessionID) {
                    dataLayer += '"Session ID":"' + mx.session.getSessionObjectId() + '",';
                }

                if (props.sendAdditionalProps) {
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
            TagManager.dataLayer({ dataLayer });
        };

        mx.ui.getContentForm().onNavigation = () => {
            initializeGTM();
        };

        initializeGTM(); // Initialize once on load
    }, [
        props.gtmId,
        props.additionalProps,
        props.pageViewEventName,
        props.sendPageTitle,
        props.sendModuleLocation,
        props.sendPageURL,
        props.sendSessionID,
        props.sendAdditionalProps
    ]);

    return null;
}
