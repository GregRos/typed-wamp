import test from "ava";
import {Wamp} from "../lib/wrappers";
import {WampRaw} from "../lib/raw";
import {WampType} from "../lib/message.type";

test("unknown", t => {
    let raw: WampRaw.Unknown = [1999, 51, "test"];
    let unknown = new Wamp.Unknown(raw);
    t.deepEqual(unknown.type, WampType._Unknown);
    t.deepEqual(unknown.raw, raw);
    t.deepEqual(unknown.toRaw(), raw);
    t.deepEqual(unknown, Wamp.parse(raw));
});