/** @module typed-wamp */ /** */


/**
 * Set of URIs with special meanings mentioned in the WAMP specification.
 */
export namespace WampUri {
    /**
     * Different error URIs.
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
     * @see [Session closing]{@link https://wamp-proto.org/_static/gen/wamp_latest.html#x7-2-session-closing}
     */
    export enum Close {
        GoodbyeAndOut = "wamp.close.goodbye_and_out",
        CloseRealm = "wamp.close.close_realm"
    }


    /**
     * Names for meta-events and meta-procedures for working with registrations.
     * @see [Registration meta-API]{@link https://wamp-proto.org/_static/gen/wamp_latest.html#registration-meta-api}
     */
    export enum Registration {
        /**Meta-event fired when a procedure is registered.*/
        OnRegister = "wamp.registration.on_register",
        /** Meta-event fired when a procedure is unregistered.*/
        OnUnregister = "wamp.registration.on_unregister",
        /** Meta-event fired when after all callees have been removed from the registration. */
        OnRegistrationDelete = "wamp.registration.on_delete",
        /** Lists registration IDs according to matching policies. */
        List = "wamp.registration.list",
        /** Obtains the registration (if any) for a procedure. */
        Lookup = "wamp.registration.lookup",
        /** Obtains the registrations best matching a procedure URI. */
        Match = "wamp.registration.match",
        /** Retrieves information about a registration. */
        Get = "wamp.registration.get",
        /** Lists the sessions attached to a registration. */
        ListCallees = "wamp.registration.list_callees",
        /** Obtains the number of sessions attached to a registration. */
        CountCallees = "wamp.registration.count_callees",
    }

    /**
     * Names for meta-events and meta-procedures for working with subscriptions.
     * @see [Subscription meta API]{@link https://wamp-proto.org/_static/gen/wamp_latest.html#subscription-meta-api}
     */
    export enum Subscription {
        /** Retrieves subscription IDs listed according to match policies. */
        List = "wamp.subscription.list",
        /** Obtains the subscription (if any) managing a topic, according to some match policy. */
        Lookup = "wamp.subscription.lookup",
        /** Retrieves a list of IDs of subscriptions matching a topic URI, irrespective of match policy. */
        Match = "wamp.subscription.match",
        /** Retrieves information on a particular subscription. */
        Get = "wamp.subscription.get",
        /** Retrieves a list of session IDs for sessions currently attached to the subscription. */
        ListSubscribers = "wamp.subscription.list_subscribers",
        /** Obtains the number of sessions currently attached to the subscription. */
        CountSubscribers = "wamp.subscription.count_subscribers",
        /** Fired when a session is added to a subscription. */
        OnSubscribe = "wamp.subscription.on_subscribe",
        /** Fired when a session is removed from a subscription. */
        OnUnsubscribe = "wamp.subscription.on_unsubscribe",
        /** Fired when a subscription is deleted after the last session attached to it has been removed. */
        OnSubscriptionDelete = "wamp.subscription.on_delete",
    }

    /**
     * Names for event history topics.
     * @see [Event History]{@link https://wamp-proto.org/_static/gen/wamp_latest.html#x14-4-8-event-history}
     * */
    export enum History {
        /** Procedure that retrieves the last N events. */
        Last = "wamp.topic.history.last",
        /** Procedure that retrieves events since a timestamp. */
        Since = "wamp.topic.history.since",
        /** Procedure that retrieves events after a timestamp */
        After = "wamp.topic.history.after"
    }

    /**
     * Names for session meta-procedures and meta-events.
     * @see [Session meta-API]{@link https://wamp-proto.org/_static/gen/wamp_latest.html#x14-5-1-session-meta-api}
     */
    export enum Session {
        /** Fired when a session joins a realm on the router. */
        OnJoin = "wamp.session.on_join",
        /** Fired when a session leaves a realm on the router or is disconnected. */
        OnLeave = "wamp.session.on_leave",
        /** Obtains the number of sessions currently attached to the realm. */
        Count = "wamp.session.count",
        /** Retrieves a list of the session IDs for all sessions currently attached to the realm.*/
        List = "wamp.session.list",
        /** Retrieves information on a specific session. */
        Get = "wamp.session.get",
        /** Kill a single session identified by session ID. */
        Kill = "wamp.session.kill",
        /**  Kill all currently connected sessions that have the specified authid. */
        KillByAuthId = "wamp.session.kill_by_authid",
        /** Kill all currently connected sessions that have the specified authrole. */
        KillByAuthRole = "wamp.session.kill_by_authrole",
        /** Kill all currently connected sessions in the caller's realm. */
        KillAll = "wamp.session.kill_all"
    }

    /**
     * Neta-procedures and events for the testament API.
     * @see [Testament meta-API]{@link https://wamp-proto.org/_static/gen/wamp_latest.html#testament-meta-procedures}
     * */
    export enum Testament {
        /** Add a Testament which will be published on a particular topic when the Session is detached or destroyed */
        AddTestament = "wamp.session.add_testament",
        /** Remove the Testaments for that Session, either for when it is detached or destroyed. */
        FlustTestaments = "wamp.session.flush_testaments",
    }
}