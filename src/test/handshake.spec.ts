import test from "ava";
import {WampType, HelloDetails, WelcomeDetails, WampRaw, Wamp} from "../lib";
import {detailsObj, detailsObj2} from "./common";

const helloDetails: HelloDetails = {
    roles: {
        callee: {
            features: {
                call_canceling: true
            }
        }
    }
} as HelloDetails;

const welcomeDetails: WelcomeDetails = {
    roles: {
        broker: {
            features: {
                event_history: true
            }
        }
    }
};


test("HELLO", t => {
    let hello = new Wamp.Hello("a", helloDetails);
    t.is(hello.realm, "a");
    t.is(hello.type, WampType.HELLO);
    t.deepEqual(hello.details, helloDetails);
    let raw: WampRaw.Hello = [WampType.HELLO, "a", helloDetails];
    t.deepEqual(hello.toRaw(), raw);
    t.deepEqual(Wamp.parse(raw), hello);
});

test("WELCOME", t => {
    let welcome = new Wamp.Welcome(123, welcomeDetails);
    t.is(welcome.type, WampType.WELCOME);
    t.is(welcome.sessionId, 123);
    t.deepEqual(welcome.details, welcomeDetails);
    let raw: WampRaw.Welcome = [WampType.WELCOME, 123, welcomeDetails];
    t.deepEqual(welcome.toRaw(), raw);
    t.deepEqual(Wamp.parse(raw), welcome);
});

test("ABORT", t => {
    let abort = new Wamp.Abort(detailsObj, "test");
    t.is(abort.type, WampType.ABORT);
    t.is(abort.reason, "test");
    t.deepEqual(abort.details, detailsObj);
    let raw: WampRaw.Abort = [WampType.ABORT, detailsObj, abort.reason];
    t.deepEqual(abort.toRaw(), raw);
    t.deepEqual(Wamp.parse(raw), abort);
});

test("GOODBYE", t => {
    let goodbye = new Wamp.Goodbye(detailsObj, "test");
    t.is(goodbye.type, WampType.GOODBYE);
    t.is(goodbye.reason, "test");
    t.deepEqual(goodbye.details, detailsObj);
    let raw: WampRaw.Goodbye = [WampType.GOODBYE, detailsObj, goodbye.reason];
    t.deepEqual(goodbye.toRaw(), raw);
    t.deepEqual(Wamp.parse(raw), goodbye);
});

test("AUTHENTICATE", t => {
    let authenticate = new Wamp.Authenticate("auth", detailsObj);
    t.is(authenticate.type, WampType.AUTHENTICATE);
    t.is(authenticate.signature, "auth");
    t.deepEqual(authenticate.extra, detailsObj);
    let raw: WampRaw.Authenticate = [WampType.AUTHENTICATE, "auth", detailsObj];
    t.deepEqual(authenticate.toRaw(), raw);
    t.deepEqual(Wamp.parse(raw), authenticate);
});

test("CHALLENGE", t => {
    let challenge = new Wamp.Challenge("auth", detailsObj);
    t.is(challenge.type, WampType.CHALLENGE);
    t.is(challenge.authMethod, "auth");
    t.is(challenge.extra, detailsObj);
    let raw: WampRaw.Challenge = [WampType.CHALLENGE, "auth", detailsObj];
    t.deepEqual(challenge.toRaw(), raw);
    t.deepEqual(Wamp.parse(raw), challenge);
});

test("ERROR", t => {
    let err = new Wamp.Error(WampType.SUBSCRIBE, 123, detailsObj, "test", [123], detailsObj2);
    t.is(err.type, WampType.ERROR);
    t.is(err.errSourceType, WampType.SUBSCRIBE);
    t.is(err.errSourceId, 123);
    t.is(err.error, "test");
    t.deepEqual(err.details, detailsObj);
    t.deepEqual(err.args, [123]);
    t.deepEqual(err.kwargs, detailsObj2);
    let raw: WampRaw.Error = [
        WampType.ERROR, WampType.SUBSCRIBE, 123, detailsObj, "test", [123], detailsObj2
    ];
    t.deepEqual(err.toRaw(), raw);
    t.deepEqual(Wamp.parse(raw), err);
});

test("ERROR - normalize empty", t => {
    let err = new Wamp.Error(WampType.SUBSCRIBE, 123, detailsObj, "test");
    t.deepEqual(err.args, []);
    t.deepEqual(err.kwargs, {});
    t.deepEqual(err.toRaw(), [WampType.ERROR, WampType.SUBSCRIBE, 123, detailsObj, "test"]);
});