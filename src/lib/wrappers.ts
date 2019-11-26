import {WampType} from "./message.type";
import {
    HelloDetails,
    WampCallOptions,
    WampCancelOptions,
    WampEventOptions,
    WampInvocationOptions,
    WampPublishOptions,
    WampRegisterOptions,
    WampResultOptions,
    WampSubscribeOptions,
    WampYieldOptions,
    WelcomeDetails
} from "./options";
import {WampArray, WampAuthMethod, WampId, WampObject, WampUriString} from "./wamp-types";
import {WampRaw} from "./raw";

/**
 * An abstract interface for WAMP message classes to implement.
 */
export interface WampMessage {
    /**
     * The type of the WAMP message.
     */
    type: WampType;

    /**
     * Transforms the WAMP message object to raw array format.
     */
    toRaw(): WampRaw.Any;
}

/**
 * Namespace for all WAMP protocol message objects.
 */
export namespace Wamp {
    /**
     * A class representing the CALL message.
     */
    export class Call implements WampMessage {
        type = WampType.CALL;

        constructor(public requestId: WampId, public options: WampCallOptions, public procedure: WampUriString, public args ?: WampArray, public kwargs ?: WampObject) {
        }

        toRaw() {
            let {args, kwargs} = this;
            return [this.type, this.requestId, this.options || {}, this.procedure, ...argsKwargsArray(args, kwargs)] as WampRaw.Call;
        }
    }

    /**
     * A class representing the ERROR message.
     */
    export class Error implements WampMessage {
        type = WampType.ERROR;

        constructor(public errSourceType: WampType, public errSourceId: WampId, public details: WampObject, public error: WampUriString, public args ?: WampArray, public kwargs ?: WampObject) {

        }

        toRaw() {
            return [this.type, this.errSourceType, this.errSourceId, this.details, this.error, this.args, this.kwargs] as WampRaw.Error;
        }
    }

    /**
     * A class representing the HELLO message.
     */
    export class Hello implements WampMessage {
        type = WampType.HELLO;

        constructor(public realm: string, public details: HelloDetails) {

        }

        toRaw() {
            return [this.type, this.realm, this.details] as WampRaw.Hello;
        }
    }

    /**
     * A class representing the ABORT message.
     */
    export class Abort implements WampMessage {
        type = WampType.ABORT;

        constructor(public details: WampObject, public reason: WampUriString) {

        }

        toRaw() {
            return [this.type, this.details, this.reason] as WampRaw.Abort;
        }
    }

    /**
     * A class representing the GOODBYE message.
     */
    export class Goodbye implements WampMessage {
        type = WampType.GOODBYE;

        constructor(public details: WampObject, public reason: WampUriString) {

        }

        toRaw() {
            return [this.type, this.details, this.reason] as WampRaw.Goodbye;
        }
    }

    /**
     * A class representing the PUBLISH message.
     */
    export class Publish implements WampMessage {
        type = WampType.PUBLISH;

        constructor(public requestId: WampId, public options: WampPublishOptions, public topic: WampUriString, public args ?: WampArray, public kwargs ?: WampObject) {

        }

        toRaw() {
            return [this.type, this.requestId, this.options, this.topic, ...argsKwargsArray(this.args, this.kwargs)] as WampRaw.Publish;
        }
    }

    /**
     * A class representing the SUBSCRIBE message.
     */
    export class Subscribe implements WampMessage {
        type = WampType.SUBSCRIBE;

        constructor(public requestId: WampId, public options: WampSubscribeOptions, public topic: WampUriString) {

        }

        toRaw() {
            return [this.type, this.requestId, this.options, this.topic] as WampRaw.Subscribe;
        }
    }

    /**
     * A class representing the UNSUBSCRIBE message.
     */
    export class Unsubscribe implements WampMessage {
        type = WampType.UNSUBSCRIBE;

        constructor(public requestId: WampId, public subscription: WampId) {

        }

        toRaw() {
            return [this.type, this.requestId, this.subscription] as WampRaw.Unsubscribe;
        }
    }

    /**
     * A class representing the REGISTER message.
     */
    export class Register implements WampMessage {
        type = WampType.REGISTER;

        constructor(public requestId: WampId, public options: WampRegisterOptions, public procedure: WampUriString) {

        }

        toRaw() {
            return [this.type, this.requestId, this.options, this.procedure] as WampRaw.Register;
        }
    }

    /**
     * A class representing an unknown message.
     */
    export class Unknown {
        type = WampType._Unknown;

        constructor(public raw: WampRaw.Unknown) {

        }

        toRaw() {
            return this.raw;
        }
    }

    /**
     * A class representing the UNREGISTER message.
     */
    export class Unregister implements WampMessage{
        type = WampType.UNREGISTER;

        constructor(public requestId: WampId, public registration: WampId) {

        }

        toRaw() {
            return [this.type, this.requestId, this.registration] as WampRaw.Unregister;
        }
    }

    /**
     * A class representing the YIELD message.
     */
    export class Yield implements WampMessage {
        type = WampType.YIELD;

        constructor(public invocationId: WampId, public options: WampYieldOptions, public args ?: WampArray, public kwargs ?: WampObject) {

        }

        toRaw() {
            return [this.type, this.invocationId, this.options, ...argsKwargsArray(this.args, this.kwargs)] as WampRaw.Yield;
        }
    }

    /**
     * A class representing the WELCOME message.
     */
    export class Welcome implements WampMessage {
        type = WampType.WELCOME;

        constructor(public sessionId: WampId, public details: WelcomeDetails) {

        }

        toRaw() {
            return [WampType.WELCOME, this.sessionId, this.details] as WampRaw.Welcome;
        }
    }

    /**
     * A class representing the PUBLISHED message.
     */
    export class Published implements WampMessage {
        type = WampType.PUBLISHED;

        constructor(public publishReqId: WampId, public publicationId: WampId) {

        }

        toRaw() {
            return [WampType.PUBLISHED, this.publishReqId, this.publicationId] as WampRaw.Published;
        }
    }

    /**
     * A class representing the SUBSCRIBED message.
     */
    export class Subscribed implements WampMessage {
        type = WampType.SUBSCRIBED;

        constructor(public subscribeReqId: WampId, public subscriptionId: WampId) {

        }

        toRaw() {
            return [WampType.SUBSCRIBED, this.subscribeReqId, this.subscriptionId] as WampRaw.Subscribed;
        }
    }

    /**
     * A class representing the UNSUBSCRIBED message.
     */
    export class Unsubscribed implements WampMessage {
        type = WampType.UNSUBSCRIBED;

        constructor(public unsubscribeReqId: WampId) {

        }

        toRaw() {
            return [WampType.UNSUBSCRIBED, this.unsubscribeReqId] as WampRaw.Unsubscribed;
        }
    }

    /**
     * A class representing the EVENT message.
     */
    export class Event implements WampMessage {
        type = WampType.EVENT;

        constructor(public subscriptionId: WampId, public publicationId: WampId, public details: WampEventOptions, public args ?: WampArray, public kwargs ?: WampObject) {
            this.args = this.args || [];
            this.kwargs = this.kwargs || {};
        }

        toRaw() {
            return [WampType.EVENT, this.subscriptionId, this.publicationId, this.details, ...argsKwargsArray(this.args, this.kwargs)] as WampRaw.Event;
        }
    }

    /**
     * A class representing the RESULT message.
     */
    export class Result implements WampMessage {
        type = WampType.RESULT;

        constructor(public callReqId: WampId, public details: WampResultOptions, public args ?: WampArray, public kwargs ?: WampObject) {

        }

        toRaw() {
            return [WampType.RESULT, this.callReqId, this.details, ...argsKwargsArray(this.args, this.kwargs)] as WampRaw.Result;
        }
    }

    /**
     * A class representing the REGISTERED message.
     */
    export class Registered implements WampMessage {
        type = WampType.REGISTERED;

        constructor(public registerReqId: WampId, public registrationId: WampId) {

        }

        toRaw() {
            return [WampType.REGISTERED, this.registerReqId, this.registrationId] as WampRaw.Registered;
        }
    }

    /**
     * A class representing the UNREGISTERED message.
     */
    export class Unregistered implements WampMessage {
        type = WampType.UNREGISTERED;

        constructor(public unregisterReqId: WampId) {

        }

        toRaw() {
            return [WampType.UNREGISTERED, this.unregisterReqId] as WampRaw.Unregistered;
        }
    }

    /**
     * A class representing the INVOCATION message.
     */
    export class Invocation implements WampMessage {
        type = WampType.INVOCATION;

        constructor(public requestId: WampId, public registrationId: WampId, public options: WampInvocationOptions, public args ?: WampArray, public kwargs ?: WampObject) {

        }

        toRaw() {
            return [WampType.INVOCATION, this.requestId, this.registrationId, this.options, ...argsKwargsArray(this.args, this.kwargs)] as WampRaw.Invocation;
        }
    }

    /**
     * A class representing the CHALLENGE message.
     */
    export class Challenge implements WampMessage {
        type = WampType.CHALLENGE;

        constructor(public authMethod: WampAuthMethod, public extra: WampObject) {

        }

        toRaw() {
            return [WampType.CHALLENGE, this.authMethod, this.extra] as WampRaw.Challenge;
        }
    }

    /**
     * A class representing the CANCEL message.
     */
    export class Cancel implements WampMessage {
        type = WampType.CANCEL;

        constructor(public callRequestId: WampId, public options: WampCancelOptions) {

        }

        toRaw() {
            return [this.type, this.callRequestId, this.options] as WampRaw.Cancel;
        }
    }

    /**
     * A class representing the INTERRUPT message.
     */
    export class Interrupt implements WampMessage {
        type = WampType.INTERRUPT;

        constructor(public callRequestId: WampId, public options: WampObject) {

        }

        toRaw() {
            return [WampType.INTERRUPT, this.callRequestId, this.options] as WampRaw.Interrupt;
        }
    }

    /**
     * A class representing the AUTHENTICATE message.
     */
    export class Authenticate implements WampMessage {
        type = WampType.AUTHENTICATE;

        constructor(public signature: string, public extra: WampObject) {

        }

        toRaw() {
            return [this.type, this.signature, this.extra] as WampRaw.Authenticate;
        }
    }

    /**
     * A union representing any specific WAMP protocol message.
     */
    export type Any =
        Cancel
        | Unknown
        | Interrupt
        | Authenticate
        | Challenge
        | Hello
        | Welcome
        | Abort
        | Goodbye
        | Error
        | Publish
        | Published
        | Subscribe
        | Subscribed
        | Unsubscribe
        | Unsubscribed
        | Event
        | Call
        | Result
        | Register
        | Registered
        | Unregister
        | Unregistered
        | Invocation
        | Yield;
}



function argsKwargsArray(args: any[], kwargs: any) {
    let hasKwargs = kwargs && Object.keys(kwargs).length > 0;
    let hasArgs = args && args.length > 0;
    if (!hasArgs && !hasKwargs) {
        return [];
    } else if (!hasArgs && hasKwargs) {
        return [[], kwargs];
    } else if (hasArgs && !hasKwargs) {
        return [args];
    } else {
        return [args, kwargs];
    }
}
