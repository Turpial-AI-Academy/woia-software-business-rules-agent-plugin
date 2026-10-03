# Rule Model

## Canonical record

Use the project's existing model when present. Otherwise this semantic model is a practical default.

| Field | Meaning |
|---|---|
| ID | Stable identifier |
| Title | Short domain-language name |
| Type | rule, constraint, or invariant |
| Status | project-native lifecycle such as draft/approved/deprecated |
| Owner | role/team accountable for policy when known |
| Source | evidence reference(s) |
| Statement | canonical policy |
| Applicability | trigger, preconditions, scope, or subject |
| Decision / effect | required, allowed, prohibited, selected, or resulting behavior |
| Exceptions | relevant override or exceptional path |
| Dependencies | other rules/decisions required first |
| Precedence | which policy wins when overlap is legitimate |
| Validation | observable condition that demonstrates compliance |
| Traceability | related requirement/workflow/domain decision when useful |

Do not force fields that have no evidence or value. Use unknown/open question rather than inventing owner, priority, or status.

## Identifiers

Preserve existing IDs.

When no project convention exists, a document-local format such as:

~~~text
BR-<DOMAIN>-###
~~~

is acceptable.

IDs should remain stable while semantics remain substantially the same.

## Statement form

Prefer direct policy language:

~~~text
When <applicability>, <actor/system> MUST / MAY / MUST NOT <decision or outcome>.
~~~

Natural language is fine when it is equally precise.

Avoid mixing several independent decisions into one giant rule. Split only when the resulting policies can vary independently.

## Status and ownership

Status indicates policy lifecycle, not runtime state.

Owner indicates who is accountable for deciding/changing the policy. It is not necessarily the component that implements it.

## Priority

Priority is delivery/business importance. It is not logical precedence.

If two rules overlap, record explicit precedence or an unresolved conflict rather than assuming the higher-priority rule wins.

## Semantic deduplication

Before creating a new rule, compare this semantic key:

~~~text
governed subject
+ applicability/condition
+ decision/effect
+ scope
~~~

If two candidates share the same semantics, keep one canonical rule and merge evidence/traceability.

Textual differences alone do not justify duplicate rules.

## Exceptions

An exception belongs under its parent rule when it only modifies that rule.

Create a separate rule when the exception:

- is reused by multiple rules;
- has its own owner/lifecycle;
- establishes independent policy;
- materially changes precedence across the domain.

## Dependencies

Use dependencies to avoid repeating prerequisite policy.

~~~text
BR-A depends on BR-B
~~~

means BR-A should reference BR-B, not restate BR-B's full policy.

## Supersession

When policy semantics materially change:

- preserve historical identity where the project supports versioned rules; or
- mark the old rule superseded/deprecated and create the new canonical policy.

Do not silently reuse an ID for contradictory semantics when downstream traceability would become misleading.
