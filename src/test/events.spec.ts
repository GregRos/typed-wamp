import test from "ava";
import {Wamp, WampType, WampRaw, WampEventDetails, WampPublishOptions, WampSubscribeOptions} from "../lib";
import {detailsObj} from "./common";

const subscribeOptions: WampSubscribeOptions = {
    match: "prefix"
};

const pubOptions: WampPublishOptions = {
    exclude_me: true
};

const eventDetails: WampEventDetails = {
    publisher: 1,
    topic: "test",
    trustlevel: 4
};


test("SUBSCRIBED", t => {
    let subscribed = new Wamp.Subscribed(123, 456);
    t.is(subscribed.type, WampType.SUBSCRIBED);
    t.is(subscribed.subscriptionId, 456);
    t.is(subscribed.subscribeReqId, 123);
    let raw: WampRaw.Subscribed = [WampType.SUBSCRIBED, 123, 456];
    t.deepEqual(subscribed.toRaw(), raw);
    t.deepEqual(Wamp.parse(raw), subscribed);
});


test("UNSUBSCRIBED", t => {
    let unsubscribed = new Wamp.Unsubscribed(123);
    t.is(unsubscribed.type, WampType.UNSUBSCRIBED);
    t.is(unsubscribed.unsubscribeReqId, 123);
    let raw: WampRaw.Unsubscribed = [WampType.UNSUBSCRIBED, 123];
    t.deepEqual(unsubscribed.toRaw(), raw);
    t.deepEqual(Wamp.parse(raw), unsubscribed);
});


test("UNSUBSCRIBE", t => {
    let unsubscribe = new Wamp.Unsubscribe(123, 456);
    t.is(unsubscribe.type, WampType.UNSUBSCRIBE);
    t.is(unsubscribe.reqId, 123);
    t.is(unsubscribe.subscriptionId, 456);
    let raw: WampRaw.Unsubscribe = [WampType.UNSUBSCRIBE, 123, 456];
    t.deepEqual(unsubscribe.toRaw(), raw);
    t.deepEqual(Wamp.parse(raw), unsubscribe);
});

test("PUBLISHED", t => {
    let published = new Wamp.Published(123, 456);
    t.is(published.type, WampType.PUBLISHED);
    t.is(published.reqId, 123);
    t.is(published.publicationId, 456);
    let raw: WampRaw.Published = [WampType.PUBLISHED, 123, 456];
    t.deepEqual(published.toRaw(), raw);
    t.deepEqual(Wamp.parse(raw), published);
});

test("PUBLISH", t => {
    let publish = new Wamp.Publish(123, pubOptions, "test", [123], detailsObj);
    t.is(publish.type, WampType.PUBLISH);
    t.is(publish.reqId, 123);
    t.is(publish.topic, "test");
    t.deepEqual(publish.args, [123]);
    t.deepEqual(publish.kwargs, detailsObj);
    t.deepEqual(publish.options, pubOptions);
    let raw: WampRaw.Publish = [WampType.PUBLISH, 123, pubOptions, "test", [123], detailsObj];
    t.deepEqual(publish.toRaw(), raw);
    t.deepEqual(Wamp.parse(raw), publish);
});

test("PUBLISH - falsy args/kwargs", t => {
    let publish = new Wamp.Publish(123, pubOptions, "test", null, null);
    t.deepEqual(publish.args, []);
    t.deepEqual(publish.kwargs, {});
});

test("SUBSCRIBE", t => {
    let subscribe = new Wamp.Subscribe(123, subscribeOptions, "test");
    t.is(subscribe.type, WampType.SUBSCRIBE);
    t.is(subscribe.reqId, 123);
    t.is(subscribe.topic, "test");
    t.deepEqual(subscribe.options, subscribeOptions);
    let raw: WampRaw.Subscribe = [WampType.SUBSCRIBE, 123, subscribeOptions, "test"];
    t.deepEqual(subscribe.toRaw(), raw);
    t.deepEqual(Wamp.parse(raw), subscribe);
});

test("EVENT", t => {
    let event = new Wamp.Event(123, 456, eventDetails, [123], detailsObj);
    t.is(event.type, 36);
    t.is(event.subscriptionId, 123);
    t.is(event.publicationId, 456);
    t.deepEqual(event.details, eventDetails);
    t.deepEqual(event.args, [123]);
    t.deepEqual(event.kwargs, detailsObj);
    let raw: WampRaw.Event = [WampType.EVENT, 123, 456, eventDetails, [123], detailsObj];
    t.deepEqual(event.toRaw(), raw);
    t.deepEqual(Wamp.parse(raw), event);
});

test("EVENT - falsy args/kwargs", t => {
    let publish = new Wamp.Event(123, 456, eventDetails);
    t.deepEqual(publish.args, []);
    t.deepEqual(publish.kwargs, {});
});