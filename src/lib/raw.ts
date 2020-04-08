/** @module typed-wamp */ /** */

import {WampType} from "./message-type";
import {
    HelloDetails,
    WampCallOptions, WampCancelOptions, WampEventDetails, WampInvocationDetails,
    WampPublishOptions,
    WampRegisterOptions, WampResultDetails,
    WampYieldOptions,
    WelcomeDetails
} from "./options";
import {WampArray, WampAuthMethod, WampId, WampObject, WampUriString} from "./basic-types";

/**
 * A set of abstract types describing the array structures of different WAMP messages.
 */
export namespace WampRaw {
    /** Structure for the CALL message. */
    export type Call = [WampType.CALL, WampId, WampCallOptions, WampUriString, WampArray?, WampObject?];
    /** Structure for the ERROR message. */
    export type Error = [WampType.ERROR, WampType, WampId, WampObject, WampUriString, WampArray?, WampObject?];
    /** Structure for the HELLO message. */
    export type Hello = [WampType.HELLO, string, HelloDetails];
    /** Structure for the ABORT message. */
    export type Abort = [WampType.ABORT, WampObject, WampUriString];
    /** Structure for the GOODBYE message. */
    export type Goodbye = [WampType.GOODBYE, WampObject, WampUriString];
    /** Structure for the CALL message. */
    export type Publish = [WampType.PUBLISH, WampId, WampPublishOptions, WampUriString, WampArray?, WampObject?];
    /** Structure for the SUBSCRIBE message. */
    export type Subscribe = [WampType.SUBSCRIBE, WampId, WampObject, WampUriString];
    /** Structure for the UNSUBSCRIBE message. */
    export type Unsubscribe = [WampType.UNSUBSCRIBE, WampId, WampId];
    /** Structure for the REGISTER message. */
    export type Register = [WampType.REGISTER, WampId, WampRegisterOptions, WampUriString];
    /** Structure for the UNREGISTER message. */
    export type Unregister = [WampType.UNREGISTER, WampId, WampId];
    /** Structure for the YIELD message. */
    export type Yield = [WampType.YIELD, WampId, WampYieldOptions, WampArray?, WampObject?];
    /** Structure for the WELCOME message. */
    export type Welcome = [WampType.WELCOME, WampId, WelcomeDetails];
    /** Structure for the PUBLISHED message. */
    export type Published = [WampType.PUBLISHED, WampId, WampId];
    /** Structure for the SUBSCRIBED message. */
    export type Subscribed = [WampType.SUBSCRIBED, WampId, WampId];
    /** Structure for the UNSUBSCRIBED message. */
    export type Unsubscribed = [WampType.UNSUBSCRIBED, WampId];
    /** Structure for the EVENT message. */
    export type Event = [WampType.EVENT, WampId, WampId, WampEventDetails, WampArray?, WampObject?];
    /** Structure for the RESULT message. */
    export type Result = [WampType.RESULT, WampId, WampResultDetails, WampArray?, WampObject?];
    /** Structure for the REGISTERED message. */
    export type Registered = [WampType.REGISTERED, WampId, WampId];
    /** Structure for the UNREGISTERED message. */
    export type Unregistered = [WampType.UNREGISTERED, WampId];
    /** Structure for the INVOCATION message. */
    export type Invocation = [WampType.INVOCATION, WampId, WampId, WampInvocationDetails, WampArray?, WampObject?];
    /** Structure for the CHALLENGE message. */
    export type Challenge = [WampType.CHALLENGE, WampAuthMethod, WampObject];
    /** Structure for the CANCEL message. */
    export type Cancel = [WampType.CANCEL, WampId, WampCancelOptions];
    /** Structure for the INTERRUPT message. */
    export type Interrupt = [WampType.INTERRUPT, WampId, WampObject];
    /** Structure for the AUTHENTICATE message. */
    export type Authenticate = [WampType.AUTHENTICATE, string, WampObject];
    /** Structure for an unknown WAMP message, which may or may not be valid. */
    export type Unknown = any[];
    /** Structure for any valid WAMP message. */
    export type Any = Call
        | Error
        | Hello
        | Abort
        | Goodbye
        | Publish
        | Subscribe
        | Unsubscribe
        | Register
        | Unregister
        | Yield
        | Welcome
        | Published
        | Subscribed
        | Unsubscribed
        | Event
        | Result
        | Registered
        | Unregistered
        | Invocation
        | Challenge
        | Cancel
        | Interrupt
        | Authenticate;
}
