import { InitializeGTM } from "./components/InitializeGTM";
import { createElement } from "react";

export function GoogleTagManager({
    measurementID,
    sendCustomProps,
    pageViewEventName,
    sendPageTitle,
    sendModuleLocation,
    sendPageURL,
    sendSessionID,
    sendAdditionalProps,
    additionalProps
}) {
    return (
        <InitializeGTM
            measurementID={measurementID}
            sendCustomProps={sendCustomProps}
            pageViewEventName={pageViewEventName}
            sendPageTitle={sendPageTitle}
            sendModuleLocation={sendModuleLocation}
            sendPageURL={sendPageURL}
            sendSessionID={sendSessionID}
            sendAdditionalProps={sendAdditionalProps}
            additionalProps={additionalProps}
        />
    );
}
