/** @module typed-wamp */ /** */

/**
 * Which features the client supports in its publisher role.
 */
import {WampAuthMethod} from "./basic-types";

/**
 * Part of HELLO. Which features the client supports in its publisher role.
 */
export interface PublisherFeatures {
    subscriber_blackwhite_listing: boolean;
    publisher_exclusion: boolean;
    publisher_identification: boolean;
    shareded_subscriptions: boolean;
}

/**
 * Part of HELLO. Which features the client supports in its subscriber role.
 */
export interface SubscriberFeatures {
    pattern_based_subscription: boolean;
    shareded_subscriptions: boolean;
    event_history: boolean;
    publisher_identification: boolean;
    publication_trustlevels: boolean;
}

/**
 * Part of HELLO. Which features the client supports in its caller role.
 */
export interface CallerFeatures {
    progressive_call_results: boolean;
    call_timeout: boolean;
    call_canceling: boolean;
    caller_identification: boolean;
    sharded_registration: boolean;
}

/**
 * Part of HELLO. Which features the client supports in its callee role.
 */
export interface CalleeFeatures {
    progressive_call_results: boolean;
    call_trustlevels: boolean;
    pattern_based_registration: boolean;
    shared_registration: boolean;
    call_timeout: boolean;
    call_canceling: boolean;
    caller_identification: boolean;
    sharded_registration: boolean;
}

/**
 * The Details portion of the client's HELLO message.
 */
export interface HelloDetails {
    agent?: string;
    transport?: {
        auth?: any;
    };
    authmethods?: WampAuthMethod[];
    authid?: string;
    authrole?: string;
    authextra?: object;
    roles: {
        publisher?: {
            features?: Partial<PublisherFeatures>
        };
        subscriber?: {
            features?: Partial<SubscriberFeatures>
        };
        caller?: {
            features?: Partial<CallerFeatures>
        };
        callee?: {
            features?: Partial<CalleeFeatures>;
        };
    };
}

/**
 * The Details portion of the router's WELCOME message.
 */
export interface WelcomeDetails {
    agent?: string;
    authid?: string;
    authrole?: string;
    authmethod?: string;
    authprovider?: string;
    roles: {
        broker?: {
            features?: Partial<BrokerFeatures>;
        };
        dealer?: {
            features?: Partial<DealerFeatures>;
        }
    };
}

/**
 * Part of the router's WELCOME message. Specifies which features the router supports as a dealer.
 */
export interface DealerFeatures {
    registration_meta_api: boolean;
    shared_registration: boolean;
    session_meta_api: boolean;
    progressive_call_results: boolean;
    call_timeout: boolean;
    call_canceling: boolean;
    caller_identification: boolean;
    call_trustlevels: boolean;
    pattern_based_registration: boolean;
    sharded_registration: boolean;

}

/**
 * Part of the router's WELCOME message. Specifies which features the router supports as a broker.
 */
export interface BrokerFeatures {
    shareded_subscriptions: boolean;
    event_history: boolean;
    session_meta_api: boolean;
    subscriber_blackwhite_listing: boolean;
    publisher_exclusion: boolean;
    publisher_identification: boolean;
    publication_trustlevels: boolean;
    pattern_based_subscription: boolean;
    sharded_subscription: boolean;
    subscription_meta_api: boolean;
}

/**
 * Recognized invocation policies for multiple registration.
 */
export type InvocationPolicy =
    "single"
    | "roundrobin"
    | "random"
    | "first"
    | "last";

/**
 * Recognized matching policies for wildcard registration and subscription.
 */
export type MatchingPolicy = "prefix" | "wildcard";

/**
 * Protocol options for the PUBLISH message.
 */
export interface WampPublishOptions {
    /**
     * Whether the router should reply to the PUBLISH message.
     */
    acknowledge?: boolean;

    /**
     * Publication blacklisting. A list of session IDs to exclude from receiving the message.
     */
    exclude?: number[];

    /**
     * Publication blacklisting. A list of authids to exclude from receiving the event.
     * @see [Authentication]{@link https://wamp-proto.org/_static/gen/wamp_latest.html#authentication}
     */
    exclude_authid?: string[];
    /**
     * Publication blacklisting. A list of authroles to exclude from receiving the event.
     * @see [Authentication]{@link https://wamp-proto.org/_static/gen/wamp_latest.html#authentication}
     */
    exclude_authrole?: string[];

    /**
     * Publication whitelisting. A list of session IDs to receive the event.
     */
    eligible?: number[];

    /**
     * Publication whitelisting. A list of authids to receive the event.
     */
    eligible_authid?: number[];

    /**
     * Publication whitelisting. A list of authroles to receive the event.
     */
    eligible_authrole?: number[];

    /**
     * If this is exactly `false`, the publisher will not be excluded from receiving this event.
     * By default, a publisher will not receive the event it publishes.
     */
    exclude_me?: boolean;

    /**
     * Tells the router to disclose your session ID to the subscriber.
     */
    disclose_me?: boolean;
}

/**
 * Protocol options for the SUBSCRIBE message.
 */
export interface WampSubscribeOptions {
    /**
     * Enables pattern-based subscription and controls the matching type.
     */
    match?: MatchingPolicy;
}

/**
 * Protoocl options for the REGISTER message.
 */
export interface WampRegisterOptions {
    /**
     * Tells the router to disclose the session IDs of callers.
     */
    disclose_caller?: boolean;

    /**
     * Enables pattern-based registration and sets the matching type.
     * @see [Shared Registration]{@link https://wamp-proto.org/_static/gen/wamp_latest.html#shared-registration}
     */
    match?: MatchingPolicy;

    /**
     * Enables shared registration and sets the invocation policy.
     */
    invoke?: InvocationPolicy;
}

/**
 * WAMP protocol options for the YIELD message.
 */
export interface WampYieldOptions {
    /**
     * Whether or not this is a progress message.
     */
    progress?: boolean;
}

/**
 * Protocol options for the EVENT message.
 */
export interface WampEventDetails {
    /**
     * The session ID of the publisher, if known.
     */
    publisher?: number;

    /**
     * The trust level of the publisher.
     * @see [Publication Trust Levels]{@link https://wamp-proto.org/_static/gen/wamp_latest.html#call-trust-levels}
     */
    trustlevel?: number;

    /**
     * The topic. Sent when using pattern-based registration.
     */
    topic?: string;

}

/**
 * Tells the router how to cancel a call.
 * @see [WAMP Spec - Cancellation]{@link https://wamp-proto.org/_static/gen/wamp_latest.html#feature-definition-2}
 */
export type CancelMode =
    "skip"
    | "kill"
    | "killnowait";

/**
 * Protocol options for the CANCEL message.
 */
export interface WampCancelOptions {
    /**
     * A setting that controls how the call will be cancelled and whether to wait for confirmation.
     */
    mode?: CancelMode;
}

/**
 * Protocol options for the CALL message.
 */
export interface WampCallOptions {
    /**
     * Whether the caller expects to receive progress with this call.
     */
    receive_progress?: boolean;
    /**
     * Whether the caller wants to disclose its identity to the callee.
     */
    disclose_me?: boolean;

    /**
     * The timeout after which the call should be cancelled.
     */
    timeout?: number;
}

/**
 * Protocol options for the RESULT message.
 */
export interface WampResultDetails {
    /**
     * Whether this RESULT message is a progress message.
     */
    progress?: boolean;
}

/**
 * Protocol options for the INVOCATION message.
 */
export interface WampInvocationDetails {
    /**
     * Whether the caller accepts progress updates.
     */
    receive_progress?: boolean;

    /**
     * The caller's session ID, if it chose to expose it.
     */
    caller?: number;

    /**
     * The caller's trust level.
     * @see [Call Trust Levels]{@link https://wamp-proto.org/_static/gen/wamp_latest.html#call-trust-levels}
     */
    trustlevel?: number;

    /**
     * The procedure being invoked. Sent when using pattern-based registration.
     */
    procedure?: string;

    /**
     * The timeout period requested by the caller.
     */
    timeout?: number;
}
