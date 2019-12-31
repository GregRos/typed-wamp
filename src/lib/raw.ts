import {WampType} from "./message.type";
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
    export type Call = [WampType.CALL, WampId, WampCallOptions, WampUriString, WampArray, WampObject];
    export type Error = [WampType.ERROR, WampType, WampId, WampObject, WampUriString, WampArray, WampObject];
    export type Hello = [WampType.HELLO, string, HelloDetails];
    export type Abort = [WampType.ABORT, WampObject, WampUriString];
    export type Goodbye = [WampType.GOODBYE, WampObject, WampUriString];
    export type Publish = [WampType.PUBLISH, WampId, WampPublishOptions, WampUriString, WampArray?, WampObject?];
    export type Subscribe = [WampType.SUBSCRIBE, WampId, WampObject, WampUriString];
    export type Unsubscribe = [WampType.UNSUBSCRIBE, WampId, WampId]
    export type Register = [WampType.REGISTER, WampId, WampRegisterOptions, WampUriString];
    export type Unregister = [WampType.UNREGISTER, WampId, WampId]
    export type Yield = [WampType.YIELD, WampId, WampYieldOptions, WampArray, WampObject];
    export type Welcome = [WampType.WELCOME, WampId, WelcomeDetails];
    export type Published = [WampType.PUBLISHED, WampId, WampId];
    export type Subscribed = [WampType.SUBSCRIBED, WampId, WampId];
    export type Unsubscribed = [WampType.UNSUBSCRIBED, WampId];
    export type Event = [WampType.EVENT, WampId, WampId, WampEventDetails, WampArray, WampObject];
    export type Result = [WampType.RESULT, WampId, WampResultDetails, WampArray, WampObject];
    export type Registered = [WampType.REGISTERED, WampId, WampId];
    export type Unregistered = [WampType.UNREGISTERED, WampId];
    export type Invocation = [WampType.INVOCATION, WampId, WampId, WampInvocationDetails, WampArray, WampObject];
    export type Challenge = [WampType.CHALLENGE, WampAuthMethod, WampObject]
    export type Cancel = [WampType.CANCEL, WampId, WampCancelOptions];
    export type Interrupt = [WampType.INTERRUPT, WampId, WampObject];
    export type Authenticate = [WampType.AUTHENTICATE, string, WampObject];
    export type Unknown = any[];
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
        | Authenticate
}