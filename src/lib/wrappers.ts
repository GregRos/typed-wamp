import {WampType} from "./message-type";
import {
    HelloDetails,
    WampCallOptions,
    WampCancelOptions,
    WampEventDetails,
    WampInvocationDetails,
    WampPublishOptions,
    WampRegisterOptions,
    WampResultDetails,
    WampSubscribeOptions,
    WampYieldOptions,
    WelcomeDetails
} from "./options";
import {WampArray, WampAuthMethod, WampId, WampObject, WampUriString} from "./basic-types";
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
 * Namespace for all WAMP protocol message objects and parsing methods.
 */
export namespace Wamp {
    /**
     * A class representing the CALL message.
     */
    export class Call implements WampMessage {
        type = WampType.CALL;

        constructor(public reqId: WampId, public options: WampCallOptions, public procedure: WampUriString, public args ?: WampArray, public kwargs ?: WampObject) {
            this.args = this.args || [];
            this.kwargs = this.kwargs || {};
        }

        toRaw(): WampRaw.Any {
            let {args, kwargs} = this;
            return [this.type, this.reqId, this.options, this.procedure, ...argsKwargsArray(args, kwargs)] as WampRaw.Call;
        }
    }

    /**
     * A class representing the ERROR message.
     */
    export class Error implements WampMessage {
        type = WampType.ERROR;

        constructor(public errSourceType: WampType, public errSourceId: WampId, public details: WampObject, public error: WampUriString, public args ?: WampArray, public kwargs ?: WampObject) {
            this.args = this.args || [];
            this.kwargs = this.kwargs || {};
        }

        toRaw(): WampRaw.Any {
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

        toRaw(): WampRaw.Any {
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

        toRaw(): WampRaw.Any {
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

        toRaw(): WampRaw.Any {
            return [this.type, this.details, this.reason] as WampRaw.Goodbye;
        }
    }

    /**
     * A class representing the PUBLISH message.
     */
    export class Publish implements WampMessage {
        type = WampType.PUBLISH;

        constructor(public reqId: WampId, public options: WampPublishOptions, public topic: WampUriString, public args ?: WampArray, public kwargs ?: WampObject) {
            this.args = this.args || [];
            this.kwargs = this.kwargs || {};
        }

        toRaw(): WampRaw.Any {
            return [this.type, this.reqId, this.options, this.topic, ...argsKwargsArray(this.args, this.kwargs)] as WampRaw.Publish;
        }
    }

    /**
     * A class representing the SUBSCRIBE message.
     */
    export class Subscribe implements WampMessage {
        type = WampType.SUBSCRIBE;

        constructor(public reqId: WampId, public options: WampSubscribeOptions, public topic: WampUriString) {

        }

        toRaw(): WampRaw.Any {
            return [this.type, this.reqId, this.options, this.topic] as WampRaw.Subscribe;
        }
    }

    /**
     * A class representing the UNSUBSCRIBE message.
     */
    export class Unsubscribe implements WampMessage {
        type = WampType.UNSUBSCRIBE;

        constructor(public reqId: WampId, public subscriptionId: WampId) {

        }

        toRaw(): WampRaw.Any {
            return [this.type, this.reqId, this.subscriptionId] as WampRaw.Unsubscribe;
        }
    }

    /**
     * A class representing the REGISTER message.
     */
    export class Register implements WampMessage {
        type = WampType.REGISTER;

        constructor(public reqId: WampId, public options: WampRegisterOptions, public procedure: WampUriString) {

        }

        toRaw(): WampRaw.Any {
            return [this.type, this.reqId, this.options, this.procedure] as WampRaw.Register;
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
    export class Unregister implements WampMessage {
        type = WampType.UNREGISTER;

        constructor(public reqId: WampId, public registrationId: WampId) {

        }

        toRaw(): WampRaw.Any {
            return [this.type, this.reqId, this.registrationId] as WampRaw.Unregister;
        }
    }

    /**
     * A class representing the YIELD message.
     */
    export class Yield implements WampMessage {
        type = WampType.YIELD;

        constructor(public invocationReqId: WampId, public options: WampYieldOptions, public args ?: WampArray, public kwargs ?: WampObject) {
            this.args = this.args || [];
            this.kwargs = this.kwargs || {};
        }

        toRaw(): WampRaw.Any {
            return [this.type, this.invocationReqId, this.options, ...argsKwargsArray(this.args, this.kwargs)] as WampRaw.Yield;
        }
    }

    /**
     * A class representing the WELCOME message.
     */
    export class Welcome implements WampMessage {
        type = WampType.WELCOME;

        constructor(public sessionId: WampId, public details: WelcomeDetails) {

        }

        toRaw(): WampRaw.Any {
            return [WampType.WELCOME, this.sessionId, this.details] as WampRaw.Welcome;
        }
    }

    /**
     * A class representing the PUBLISHED message.
     */
    export class Published implements WampMessage {
        type = WampType.PUBLISHED;

        constructor(public reqId: WampId, public publicationId: WampId) {

        }

        toRaw(): WampRaw.Any {
            return [WampType.PUBLISHED, this.reqId, this.publicationId] as WampRaw.Published;
        }
    }

    /**
     * A class representing the SUBSCRIBED message.
     */
    export class Subscribed implements WampMessage {
        type = WampType.SUBSCRIBED;

        constructor(public subscribeReqId: WampId, public subscriptionId: WampId) {

        }

        toRaw(): WampRaw.Any {
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

        toRaw(): WampRaw.Any {
            return [WampType.UNSUBSCRIBED, this.unsubscribeReqId] as WampRaw.Unsubscribed;
        }
    }

    /**
     * A class representing the EVENT message.
     */
    export class Event implements WampMessage {
        type = WampType.EVENT;

        constructor(public subscriptionId: WampId, public publicationId: WampId, public details: WampEventDetails, public args ?: WampArray, public kwargs ?: WampObject) {
            this.args = this.args || [];
            this.kwargs = this.kwargs || {};
        }

        toRaw(): WampRaw.Any {
            return [WampType.EVENT, this.subscriptionId, this.publicationId, this.details, ...argsKwargsArray(this.args, this.kwargs)] as WampRaw.Event;
        }
    }

    /**
     * A class representing the RESULT message.
     */
    export class Result implements WampMessage {
        type = WampType.RESULT;

        constructor(public reqId: WampId, public details: WampResultDetails, public args ?: WampArray, public kwargs ?: WampObject) {
            this.args = this.args || [];
            this.kwargs = this.kwargs || {};
        }

        toRaw(): WampRaw.Any {
            return [WampType.RESULT, this.reqId, this.details, ...argsKwargsArray(this.args, this.kwargs)] as WampRaw.Result;
        }
    }

    /**
     * A class representing the REGISTERED message.
     */
    export class Registered implements WampMessage {
        type = WampType.REGISTERED;

        constructor(public registerReqId: WampId, public registrationId: WampId) {

        }

        toRaw(): WampRaw.Any {
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

        toRaw(): WampRaw.Any {
            return [WampType.UNREGISTERED, this.unregisterReqId] as WampRaw.Unregistered;
        }
    }

    /**
     * A class representing the INVOCATION message.
     */
    export class Invocation implements WampMessage {
        type = WampType.INVOCATION;

        constructor(public reqId: WampId, public registrationId: WampId, public details: WampInvocationDetails, public args ?: WampArray, public kwargs ?: WampObject) {
            this.args = this.args || [];
            this.kwargs = this.kwargs || {};
        }

        toRaw(): WampRaw.Any {
            return [WampType.INVOCATION, this.reqId, this.registrationId, this.details, ...argsKwargsArray(this.args, this.kwargs)] as WampRaw.Invocation;
        }
    }

    /**
     * A class representing the CHALLENGE message.
     */
    export class Challenge implements WampMessage {
        type = WampType.CHALLENGE;

        constructor(public authMethod: WampAuthMethod, public extra: WampObject) {

        }

        toRaw(): WampRaw.Any {
            return [WampType.CHALLENGE, this.authMethod, this.extra] as WampRaw.Challenge;
        }
    }

    /**
     * A class representing the CANCEL message.
     */
    export class Cancel implements WampMessage {
        type = WampType.CANCEL;

        constructor(public reqId: WampId, public options: WampCancelOptions) {

        }

        toRaw(): WampRaw.Any {
            return [this.type, this.reqId, this.options] as WampRaw.Cancel;
        }
    }

    /**
     * A class representing the INTERRUPT message.
     */
    export class Interrupt implements WampMessage {
        type = WampType.INTERRUPT;

        constructor(public invocationReqId: WampId, public options: WampObject) {

        }

        toRaw(): WampRaw.Any {
            return [WampType.INTERRUPT, this.invocationReqId, this.options] as WampRaw.Interrupt;
        }
    }

    /**
     * A class representing the AUTHENTICATE message.
     */
    export class Authenticate implements WampMessage {
        type = WampType.AUTHENTICATE;

        constructor(public signature: string, public extra: WampObject) {

        }

        toRaw(): WampRaw.Any {
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

    /**
     * Parses a raw WAMP message in the form of an array into a message object.
     * @param raw The raw message.
     * @see [WAMP Basic Profile]{@link https://wamp-proto.org/_static/gen/wamp_latest.html#message-definitions}
     * @see [WAMP Advanced Profile]{@link https://wamp-proto.org/_static/gen/wamp_latest.html#message-definitions-0}
     */
    export function parse(raw: WampRaw.Any | WampRaw.Unknown): Wamp.Any {
        switch (raw[0]) {
            case WampType.WELCOME:
                return new Wamp.Welcome(raw[1], raw[2]);
            case WampType.ABORT:
                return new Wamp.Abort(raw[1] || {}, raw[2]);
            case WampType.GOODBYE:
                return new Wamp.Goodbye(raw[1], raw[2]);
            case WampType.ERROR:
                return new Wamp.Error(raw[1], raw[2], raw[3] || {}, raw[4], raw[5] || [], raw[6] || {});
            case WampType.PUBLISHED:
                return new Wamp.Published(raw[1], raw[2]);
            case WampType.SUBSCRIBED:
                return new Wamp.Subscribed(raw[1], raw[2]);
            case WampType.UNSUBSCRIBED:
                return new Wamp.Unsubscribed(raw[1]);
            case WampType.EVENT:
                return new Wamp.Event(raw[1], raw[2], raw[3] || {}, raw[4] || [], raw[5] || {});
            case WampType.RESULT:
                return new Wamp.Result(raw[1], raw[2] || {}, raw[3] || [], raw[4] || {});
            case WampType.REGISTERED:
                return new Wamp.Registered(raw[1], raw[2]);
            case WampType.UNREGISTERED:
                return new Wamp.Unregistered(raw[1]);
            case WampType.INVOCATION:
                return new Wamp.Invocation(raw[1], raw[2], raw[3] || {}, raw[4] || [], raw[5] || {});
            case WampType.CHALLENGE:
                return new Wamp.Challenge(raw[1], raw[2] || {});
            case WampType.INTERRUPT:
                return new Wamp.Interrupt(raw[1], raw[2] || {});
            case WampType.SUBSCRIBE:
                return new Wamp.Subscribe(raw[1], raw[2] || {}, raw[3]);
            case WampType.UNSUBSCRIBE:
                return new Wamp.Unsubscribe(raw[1], raw[2]);
            case WampType.UNREGISTER:
                return new Wamp.Unregister(raw[1], raw[2]);
            case WampType.PUBLISH:
                return new Wamp.Publish(raw[1], raw[2] || {}, raw[3], raw[4] || [], raw[5] || {});
            case WampType.CALL:
                return new Wamp.Call(raw[1], raw[2] || {}, raw[3], raw[4] || [], raw[5] || {});
            case WampType.REGISTER:
                return new Wamp.Register(raw[1], raw[2] || {}, raw[3]);
            case WampType.HELLO:
                return new Wamp.Hello(raw[1], raw[2]);
            case WampType.YIELD:
                return new Wamp.Yield(raw[1], raw[2] || {}, raw[3] || [], raw[4] || {});
            case WampType.AUTHENTICATE:
                return new Wamp.Authenticate(raw[1], raw[2] || {});
            case WampType.CANCEL:
                return new Wamp.Cancel(raw[1], raw[2] || {});
            default:
                return new Wamp.Unknown(raw);
        }
    }
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
