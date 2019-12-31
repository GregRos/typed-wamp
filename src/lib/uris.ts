/**
 * Set of URIs mentioned by the WAMP protocol.
 */
export namespace WampUri {
    /**
     * Standard error URIs.
     */
    export enum Error {
        Prefix = "wamp.error",
        NotAuthorized = "wamp.error.not_authorized",
        ProcAlreadyExists = "wamp.error.procedure_already_exists",
        ProtoViolation = "wamp.error.protocol_violation",
        NoSuchRealm = "wamp.error.no_such_realm",
        NoSuchSubscription = "wamp.error.no_such_subscription",
        NoSuchRegistration = "wamp.error.no_such_registration",
        NoSuchProcedure = "wamp.error.no_such_procedure",
        InvalidUri = "wamp.error.invalid_uri",
        InvalidArgument = "wamp.error.invalid_argument",
        AuthFailed = "wamp.error.authorization_failed",
        NoSuchRole = "wamp.error.no_such_role",
        NoSuchSession = "wamp.error.no_such_session",
        // Advanced Profile
        Canceled = "wamp.error.canceled",
        OptionNotAllowed = "wamp.error.option_not_allowed",
        NoEligibleCallee = "wamp.error.no_eligible_callee",
        DisallowedDiscloseMe = "wamp.error.option_disallowed.disclose_me",
        NetworkFailure = "wamp.error.network_failure",
        RuntimeError = "wamp.error.runtime_error"
    }

    /**
     * Standard reasons for closing a session.
     */
    export enum Close {
        GoodbyeAndOut = "wamp.close.goodbye_and_out",
        CloseRealm = "wamp.close.close_realm"
    }

    export enum Registration {
        OnRegister = "wamp.registration.on_register",
        OnUnregister = "wamp.registration.on_unregister",
        OnRegistrationDelete = "wamp.registration.on_delete",
        List = "wamp.registration.list",
        Lookup = "wamp.registration.lookup",
        Match = "wamp.registration.match",
        Get = "wamp.registration.get",
        ListCallees = "wamp.registration.list_callees",
        CountCallees = "wamp.registration.count_callees",
    }

    export enum Subscription {
        List = "wamp.subscription.list",
        Lookup = "wamp.subscription.lookup",
        Match = "wamp.subscription.match",
        Get = "wamp.subscription.get",
        ListSubscribers = "wamp.subscription.list_subscribers",
        CountSubscribers = "wamp.subscription.count_subscribers",
        OnSubscribe = "wamp.subscription.on_subscribe",
        OnUnsubscribe = "wamp.subscription.on_unsubscribe",
        OnSubscriptionDelete = "wamp.subscription.on_delete",
    }

    export enum History {
        Last = "wamp.topic.history.last",
        Since = "wamp.topic.history.since",
        After = "wamp.topic.history.after"
    }

    export enum Session {
        OnJoin = "wamp.session.on_join",
        OnLeave = "wamp.session.on_leave",
        Count = "wamp.session.count",
        List = "wamp.session.list",
        Get = "wamp.session.get",
        FlushTestaments = "wamp.session.flush_testaments",
    }
}