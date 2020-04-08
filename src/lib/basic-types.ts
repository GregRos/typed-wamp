/** @module typed-wamp */ /** */

/**
 * String describing the WAMP authentication method.
 */
export type WampAuthMethod = string;
/**
 * An integer matching the WAMP ID specification.
 */
export type WampId = number;
/**
 * A string matching the WAMP URI specification.
 */
export type WampUriString = string;
/**
 * A basic primitive value that can appear in WAMP messages: a string, a number, an ID, or a URI.
 */
export type WampPrimitive = string | number | WampId | WampUriString;
/**
 * A dictionary that can appear in WAMP messages.
 */
export type WampObject = Record<string, any>;
/**
 * An array that can appear in WAMP messages.
 */
export type WampArray = any[];
