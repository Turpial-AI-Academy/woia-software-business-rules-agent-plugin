# Business Rules Validation Checklist

## Scope

- [ ] The delivery or analysis scope is explicit.
- [ ] Rules outside that scope are omitted or clearly deferred.
- [ ] Relevant discovery/product/domain evidence was inspected.

## Evidence

- [ ] Every confirmed material rule has supporting evidence.
- [ ] Fact, inference, and open question are not conflated.
- [ ] Contradictory sources are surfaced.
- [ ] Missing policy is not silently replaced with an assumed default.

## Explicitness

For each material rule:

- [ ] applicability/trigger is recoverable;
- [ ] decision, prohibition, requirement, or invariant is clear;
- [ ] business outcome/effect is clear;
- [ ] relevant exception/override is present or explicitly unresolved;
- [ ] dependencies/precedence are stated when needed;
- [ ] validation condition is observable enough for downstream work.

## Separation of concerns

- [ ] Requirements/user stories are not merely copied and renamed as rules.
- [ ] Technical design is absent unless mandated as observable business policy.
- [ ] Detailed test procedure is left to testing/specification capabilities.
- [ ] Architecture/toolchain/CI policy is not introduced accidentally.

## Deduplication

- [ ] One canonical statement exists per semantic rule.
- [ ] Shared definitions are written once.
- [ ] Dependencies use references instead of copied policy.
- [ ] Decision-table rows are not duplicated as separate prose rules without a reason.

## Decision logic

When decision tables exist:

- [ ] overlapping rows have compatible outcomes or explicit precedence;
- [ ] material combinations are covered or flagged;
- [ ] table outcomes agree with canonical rules.

## Traceability

- [ ] Stable/project-native IDs are preserved where possible.
- [ ] Sources are traceable.
- [ ] Related downstream requirements/workflows can reference canonical rule IDs.
- [ ] Deprecated/superseded rules are not presented as current policy.

## Gate result

A delivery-facing artifact can pass only when:

~~~text
rules affecting the next delivery are explicit
+ relevant exceptions are represented
+ unnecessary duplication is removed
+ unsupported policy remains visibly unresolved
~~~

Report blocked or skipped checks explicitly; never convert them to PASS.
