# typed-wamp

[![Build Status](https://travis-ci.org/GregRos/typed-wamp.svg?branch=master)](https://travis-ci.org/GregRos/typed-wamp)[![codecov](https://codecov.io/gh/GregRos/typed-wamp/branch/master/graph/badge.svg)](https://codecov.io/gh/GregRos/typed-wamp)[![npm version](https://badge.fury.io/js/typed-wamp.svg)](https://badge.fury.io/js/typed-wamp)

This is a package that provides accurate TypeScript type definitions and basic message wrappers for the WAMP protocol.

This package doesn't do much by itself. It lets other code, like client and router implementations, use a uniform set of typed and wrappers for working with the WAMP protocol.

## Wrappers and Enums

These work in both JS and TS.

### Message Type Codes

Via the `WampType` enum:

```typescript
import { WampType } from "typed-wamp";

let x = WampType.HELLO;
let y = WampType.GOODBYE;
```

###  WAMP Message Wrapper Objects

These are object versions of WAMP messages, that support properties and methods. They are easier to work with than naked arrays.

Craft using a constructor:

```typescript
import { Wamp } from "typed-wamp";

let msgGoodbye = new Wamp.Goodbye({}, "goodbye reason");
let msgHello = new Wamp.Hello("realm", { /* ... */ });
```

Parse from an array object:

```typescript
let raw = [1, "realm", helloDetails];
let parsed = Wamp.parse(raw);
```

Turn back to raw form:

```typescript
let raw2 = parsed.toRaw();
console.log(raw2); // [1, "realm", helloDetails]
```

### Common URIs

URIs mentioned in the WAMP specification.

```typescript
import { WampUri } from "typed-wamp";

let reason = WampUri.Error.NotAuthorized; // wamp.error.not_authorized
let onRegisterTopicName = WampUri.Registration.OnRegister; // wamp.registration.on_register
```

## Type Definitions

These only make sense from TypeScript.

### WAMP Message Structure Definitions

These are in the namespace `WampRaw`. 

```typescript
import { WampRaw, WampType } from "typed-wamp";
import { WampType } from "typed-wamp";

let x: WampRaw.Hello = [WampType.HELLO, "realm", {...}];
```

### WAMP Options Type Definitions

Type definitions for things like the HELLO message `details` field.

```typescript
import {HelloDetails} from "typed-wamp";

let helloDetails: HelloDetails = {
    agent: "wampus",
    roles: {
        publisher: {
            features: {
                subscriber_blackwhite_listing: true
            }
        }
    },
    // ...
};
```