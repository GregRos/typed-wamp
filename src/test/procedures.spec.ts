import test from "ava";
import {
    WampCallOptions,
    WampCancelOptions,
    WampInvocationDetails,
    WampRegisterOptions,
    WampResultDetails,
    WampYieldOptions,
    WampRaw,
    Wamp,
    WampType,
} from "../lib";
import {detailsObj} from "./common";

const callOptions: WampCallOptions = {
    disclose_me: true,
    receive_progress: true,
    timeout: -55
};

const resultOptions: WampResultDetails = {
    progress: true
};

const yieldOptions: WampYieldOptions = {
    progress: true
};

const regOptions: WampRegisterOptions = {
    disclose_caller: true,
    match: "prefix",
    invoke: "first"
};

const invocationOptions: WampInvocationDetails = {
    caller: 123,
    procedure: "test",
    receive_progress: true,
    trustlevel: 5
};

const cancelOptions: WampCancelOptions = {
    mode: "kill"
};

test("REGISTER", t => {
    let register = new Wamp.Register(123, regOptions, "test");
    t.is(register.type, WampType.REGISTER);
    t.is(register.procedure, "test");
    t.is(register.reqId, 123);
    t.deepEqual(register.options, regOptions);
    let raw: WampRaw.Register = [WampType.REGISTER, 123, regOptions, "test"]
    t.deepEqual(register.toRaw(), raw);
    t.deepEqual(Wamp.parse(raw), register);
});

test("REGISTERED", t => {
    let registered = new Wamp.Registered(123, 456);
    t.is(registered.type, WampType.REGISTERED);
    t.is(registered.registerReqId, 123);
    t.is(registered.registrationId, 456);
    let raw: WampRaw.Registered = [WampType.REGISTERED, 123, 456];
    t.deepEqual(registered.toRaw(), raw);
    t.deepEqual(Wamp.parse(raw), registered);

});

test("UNREGISTER", t => {
    let unregister = new Wamp.Unregister(123, 456);
    t.is(unregister.type, WampType.UNREGISTER);
    t.is(unregister.reqId, 123);
    t.is(unregister.registrationId, 456);
    let raw: WampRaw.Unregister = [WampType.UNREGISTER, 123, 456];
    t.deepEqual(unregister.toRaw(), raw);
    t.deepEqual(Wamp.parse(raw), unregister);
});

test("UNREGISTERED", t => {
    let unregistered = new Wamp.Unregistered(123);
    t.is(unregistered.type, WampType.UNREGISTERED);
    t.is(unregistered.unregisterReqId, 123);
    let raw: WampRaw.Unregistered = [WampType.UNREGISTERED, 123];
    t.deepEqual(unregistered.toRaw(), raw);
    t.deepEqual(Wamp.parse(raw), unregistered);
});

test("CALL", t => {
    let call = new Wamp.Call(123, callOptions, "test", [123], detailsObj);
    t.is(call.type, WampType.CALL);
    t.is(call.reqId, 123);
    t.is(call.procedure, "test");
    t.deepEqual(call.options, callOptions);
    t.deepEqual(call.args, [123]);
    t.deepEqual(call.kwargs, detailsObj);
    let raw: WampRaw.Call = [WampType.CALL, 123, callOptions, "test", [123], detailsObj]
    t.deepEqual(call.toRaw(), raw);
    t.deepEqual(Wamp.parse(raw), call);
});

test("INVOCATION", t => {
    let invocation = new Wamp.Invocation(123, 456, invocationOptions, [123], detailsObj);
    t.is(invocation.type, WampType.INVOCATION);
    t.is(invocation.reqId, 123);
    t.is(invocation.registrationId, 456);
    t.deepEqual(invocation.details, invocationOptions);
    t.deepEqual(invocation.args, [123]);
    t.deepEqual(invocation.kwargs, detailsObj);
    let raw: WampRaw.Invocation = [WampType.INVOCATION, 123, 456, invocationOptions, [123], detailsObj];
    t.deepEqual(invocation.toRaw(), raw);
    t.deepEqual(Wamp.parse(raw), invocation);

});

test("CANCEL", t => {
    let cancel = new Wamp.Cancel(123, cancelOptions);
    t.is(cancel.type, WampType.CANCEL);
    t.is(cancel.reqId, 123);
    t.deepEqual(cancel.options, {
        mode: "kill"
    });
    let raw: WampRaw.Cancel = [WampType.CANCEL, 123, cancelOptions];
    t.deepEqual(cancel.toRaw(), raw);
    t.deepEqual(Wamp.parse(raw), cancel);
});

test("INTERRUPT", t => {
    let interrupt = new Wamp.Interrupt(123, detailsObj);
    t.is(interrupt.type, WampType.INTERRUPT);
    t.is(interrupt.invocationReqId, 123);
    t.deepEqual(interrupt.options, detailsObj);
    let raw: WampRaw.Interrupt = [WampType.INTERRUPT, 123, detailsObj];
    t.deepEqual(interrupt.toRaw(), raw);
    t.deepEqual(Wamp.parse(raw), interrupt);
});

test("YIELD", t => {
    let yild = new Wamp.Yield(123, yieldOptions, [123], detailsObj);
    t.is(yild.type, WampType.YIELD);
    t.is(yild.invocationReqId, 123);
    t.deepEqual(yild.options, yieldOptions);
    t.deepEqual(yild.args, [123]);
    t.deepEqual(yild.kwargs, detailsObj);
    let raw: WampRaw.Yield = [WampType.YIELD, 123, yieldOptions, [123], detailsObj]
    t.deepEqual(yild.toRaw(), raw);
    t.deepEqual(Wamp.parse(raw), yild);
});

test("RESULT", t => {
    let result = new Wamp.Result(123, resultOptions, [123], detailsObj);
    t.is(result.type, WampType.RESULT);
    t.is(result.reqId, 123);
    t.deepEqual(result.details, resultOptions);
    t.deepEqual(result.args, [123]);
    t.deepEqual(result.kwargs, detailsObj);
    let raw: WampRaw.Result = [WampType.RESULT, 123, resultOptions, [123], detailsObj];
    t.deepEqual(result.toRaw(), raw);
    t.deepEqual(Wamp.parse(raw), result);
});

