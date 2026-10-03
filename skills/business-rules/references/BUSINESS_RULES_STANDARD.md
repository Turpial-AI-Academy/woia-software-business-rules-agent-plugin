# Business Rules Standard

## Goal

Produce the minimum sufficient set of explicit business policy needed to constrain a delivery.

~~~text
EVIDENCE
  -> CANDIDATE POLICY
  -> CANONICAL RULES
  -> EXCEPTIONS / DECISION LOGIC
  -> TRACEABILITY
  -> VALIDATION
~~~

Business-rules work is not a license to expand project scope or invent product policy.

## What counts as a business rule

A business rule is a business-relevant statement that governs valid behavior, decisions, values, states, or transitions.

Useful categories:

- **rule** — determines what is required, allowed, prohibited, selected, or produced;
- **constraint** — limits valid choices, quantities, timing, access, values, or sequence;
- **invariant** — must remain true across every valid state or transition.

These categories are descriptive. Preserve a project's own established taxonomy when it is already healthy.

## What is not a business rule

### Requirement or user story

A requirement describes capability or behavior the product must provide. A business rule governs the policy that constrains that behavior.

Example distinction:

~~~text
Requirement: The user can request a refund.
Rule: A refund is allowed only while the order is inside the approved refund window.
~~~

Do not duplicate the requirement as a rule unless it contains independent governing logic.

### Technical design

Implementation details such as database tables, framework choices, queues, retries, or class names are not business rules unless an approved business policy specifically mandates an observable mechanism.

### Test case

A test may prove a rule, but the rule is the policy itself. Keep acceptance/validation conditions concise and leave detailed test design downstream.

## Source discipline

For every confirmed rule, preserve enough traceability to answer:

- Where did this policy come from?
- Is it approved/observed, inferred, or unresolved?
- What delivery behavior does it constrain?

Preferred evidence can include:

- approved discovery/product/domain documents;
- explicit stakeholder decisions;
- existing accepted business-policy artifacts;
- current observable product behavior when it is intentionally authoritative;
- contracts, regulatory/policy material, or external standards when the project explicitly relies on them.

Repository code can prove current behavior. It does not automatically prove intended business policy.

## Minimum-sufficient scope

Default to the rules that materially affect the next delivery.

Include broader policy only when one of these is true:

- it is required to understand a scoped rule;
- it establishes precedence or an invariant the delivery could violate;
- it is explicitly requested;
- downstream work would otherwise make a materially wrong decision.

Avoid building an encyclopedic enterprise-rule catalog when the delivery needs a focused policy boundary.

## Rule quality

A material rule is strong when a reader can determine:

- applicability;
- governing decision;
- outcome or restriction;
- relevant exception/override;
- source;
- how to observe whether the policy was respected.

Use precise domain language. Define a term once rather than rewording it inconsistently.

## Duplication policy

A policy should have one canonical statement.

Common duplication smells:

- the same limit repeated under several actors;
- the same eligibility condition copied into multiple workflows;
- an exception restated as a second contradictory rule;
- a decision table duplicated as prose row-by-row;
- requirements copied into a rule catalog without additional policy.

Keep one rule and reference it from dependent rules, flows, or traceability tables.

## Conflicts

When evidence conflicts:

1. preserve both sources;
2. identify the exact conflicting policy;
3. check whether scope, date, owner, status, or precedence resolves it;
4. if not, record an open decision;
5. do not silently choose a winner.

## Change discipline

When updating an existing business-rules document:

- preserve healthy IDs so downstream traceability remains stable;
- deprecate or supersede rather than silently repurpose a rule with different semantics;
- document materially changed policy;
- update dependent traceability and decision tables;
- avoid renumbering solely for cosmetic ordering.

## Evidence lifecycle for amendments

Record the rule/source locator and revision or approval record, the policy and delivery scope it supports, the actual check/observation and result, and material freshness conditions. Reuse the project's evidence convention rather than introducing a second store.

- **Reusable:** authority, rule semantics, sources, scope, and conditions remain unchanged and inspectable.
- **Invalidated:** changed policy/source/applicability/outcome can alter a rule, exception, precedence, table row, or downstream link. Retain prior evidence as history; an old approval cannot establish approval of different policy.
- **Fresh:** verify the changed record and affected linked decisions, including source authority and exceptions, before restoring current gate evidence. Missing, contradictory, or stale evidence requires new inspection.
- **Assumed/inferred:** retain explicit uncertainty; neither inference nor recollection establishes confirmed policy or executed validation.

Preserve unrelated valid rules and evidence. A new session alone does not require rebuilding the catalog. Notify the owning downstream capability of invalidated scope without claiming its independent gate is satisfied.
