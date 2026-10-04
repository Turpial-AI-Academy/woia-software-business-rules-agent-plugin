---
name: business-rules
description: Use when a software project needs explicit business rules, constraints, invariants, exceptions, decision logic, and traceability derived from discovery evidence for an upcoming delivery.
license: MIT
metadata:
  author: Turpial AI Academy
  version: "0.5.0"
---

# business-rules

## Operating flow

~~~text
DISCOVER -> DECIDE -> IMPLEMENT -> VALIDATE -> REPORT
~~~

## Purpose

Turn discovery evidence into the minimum explicit, traceable, non-duplicative set of business rules and relevant exceptions needed to constrain the next delivery.

This capability is standalone. When used as the ASPS provider for business-rules/v1, its input boundary is discovery evidence and its canonical output is docs/project/02-BUSINESS-RULES.md. A standalone caller may choose another destination without changing the method.

## Non-negotiable rules

- Discover before defining policy.
- Treat approved discovery/product/domain evidence and observed system behavior as evidence; distinguish them from inference.
- Do not invent missing business policy. Record unresolved or conflicting policy as an open question.
- Keep business rules distinct from requirements, user stories, implementation design, test cases, and architecture choices.
- Scope the catalog to rules that constrain the upcoming delivery unless broader scope is explicitly requested.
- Make each material rule explicit enough to determine when it applies, what it requires or forbids, and what happens when it applies.
- Capture relevant exceptions and edge conditions; do not manufacture exhaustive edge cases unsupported by evidence.
- Keep one canonical statement per rule. Cross-reference it instead of duplicating the same policy in multiple sections.
- Preserve existing healthy identifiers, terminology, ownership, precedence, and governance conventions when they exist.
- Use decision tables only when combinations of conditions materially change outcomes.
- Do not report a rule, exception, traceability link, or validation as confirmed without supporting evidence.
- Persist or modify the business-rules artifact only when the caller/runtime explicitly authorizes local writes to the target path. In WOIA this requires an active `local-write` authority grant. Without that grant, do not mutate files; return or propose the content and report the authority blocker.

## Execution depth

Use a bounded amendment when a healthy canonical rule catalog exists, the requested change and its policy authority are understood, and supporting evidence is durable and inspectable. A new turn alone does not invalidate that evidence.

For a bounded amendment:

1. locate the authoritative catalog and the source for the affected rule ID, applicability, or outcome;
2. identify the changed rule plus dependent exceptions, precedence, decision-table rows, glossary terms, and traceability links;
3. inspect only the sources needed to establish those policy consequences;
4. amend the smallest coherent rule record and its affected links, preserving unrelated rules, healthy IDs, and valid evidence;
5. verify the affected policy plus the mandatory source authority, explicit applicability/outcome, relevant exceptions, conflict visibility, and semantic-deduplication invariants;
6. report changed rules, reused or invalidated evidence, fresh checks and results, preserved policy, and unresolved decisions.

Take the deep path for a new catalog, unclear scope or policy, contradictory sources, unhealthy conventions, missing durable evidence for the gate, or a failed invariant. Also deepen analysis when the change materially affects public API/event/schema contracts, persisted states or migrations, auth/authorization/approval/secrets/trust boundaries, deployment/rollback/availability risk, cross-provider dependencies, or unresolved exception/precedence interactions. Route detailed requirements, design, testing, and security decisions to their owning capability.

Reuse evidence only when its source/revision or approval record, policy semantics, delivery scope, and relevant conditions still apply. Retain an inspectable locator, the check or observation, and its result. A changed policy or source invalidates dependent evidence and any approval that no longer covers that policy; freshly verify the affected rule and its linked decisions before restoring gate status. Inference, undocumented approval, and recollection are not execution or authority evidence. Preserve unrelated valid evidence and do not repeat expensive observations unless a relevant mutation, drift, or freshness condition invalidates them.

Load references progressively: the standard for new or uncertain policy scope, the input model for evidence extraction, the rule model for record/identity issues, decision logic for combinations/exceptions/precedence, and the checklist for relevant gate obligations. Load the template only when creating a catalog or repairing an insufficient structure. The deep path retains the complete business-rules gate.

## Discover

For a new catalog or uncertain policy scope, read [BUSINESS_RULES_STANDARD.md](references/BUSINESS_RULES_STANDARD.md). Load [DISCOVERY_INPUT_MODEL.md](references/DISCOVERY_INPUT_MODEL.md) when extracting or reconciling policy evidence. For a healthy bounded amendment, start with the affected rule and sources.

Inspect the available discovery artifact and the underlying sources it cites or exposes. As applicable, identify:

- actors, roles, permissions, approvals, and ownership;
- business objects and lifecycle/state transitions;
- eligibility, limits, quotas, thresholds, calculations, timing windows, and sequencing;
- required, prohibited, conditional, and always-true behavior;
- dependencies between decisions or rules;
- failure handling, escalation, overrides, exceptions, and human decision points;
- existing rule IDs, glossary terms, governance conventions, and traceability;
- contradictions, ambiguities, and missing decisions that would affect the next delivery.

Build a source-backed candidate list before writing the final catalog. Separate:

~~~text
OBSERVED / APPROVED FACT
INFERENCE
OPEN QUESTION
~~~

Do not silently promote an inference into policy.

## Decide

Load [RULE_MODEL.md](references/RULE_MODEL.md) when record semantics or identifiers need clarification and [DECISION_LOGIC.md](references/DECISION_LOGIC.md) when combinations, exceptions, conflicts, or precedence require analysis.

Classify each candidate by the behavior it governs:

- **rule**: a conditional or unconditional business decision that determines allowed, required, or prohibited behavior;
- **constraint**: a business limit or restriction that narrows valid behavior or values;
- **invariant**: a condition that must remain true across valid states or transitions.

Then:

1. keep only material rules for the requested delivery scope;
2. merge semantic duplicates into one canonical rule;
3. attach exceptions to the rule they modify unless the exception is independently reusable policy;
4. preserve explicit precedence when rules can conflict;
5. use a decision table when multiple conditions produce materially different outcomes;
6. leave unsupported policy as an open question instead of guessing.

If a project has no rule-ID convention, a document-local scheme such as BR-<DOMAIN>-### is acceptable, but do not rename healthy existing IDs merely for uniformity.

## Implement

Use [business-rules-document.template.md](assets/business-rules-document.template.md) when creating a catalog or repairing its structure. Preserve a healthy existing artifact for bounded amendments; do not replay its template.

A material rule should normally make these semantics recoverable:

- stable ID or project-native identifier;
- title;
- type;
- status and owner when the project uses them;
- source evidence / traceability;
- policy statement;
- trigger or applicability conditions;
- required/prohibited decision or outcome;
- relevant exceptions or overrides;
- dependencies or precedence when applicable;
- observable validation condition.

Prefer concise rule records. Put shared definitions in a glossary or shared section once rather than repeating them in every rule.

Technical mechanisms belong in the rule only when the business policy specifically requires that observable mechanism. Otherwise leave implementation to downstream requirements/design.

## Validate

Use the relevant obligations in [VALIDATION_CHECKLIST.md](references/VALIDATION_CHECKLIST.md) when validation scope or gate readiness needs clarification. A bounded amendment still verifies the mandatory invariants above.

For the next delivery, verify at minimum:

- material rules are explicit;
- applicability and outcome are unambiguous enough for downstream requirements/design;
- relevant exceptions are present or explicitly recorded as unresolved;
- semantic duplicates have one canonical owner/statement;
- each confirmed rule is traceable to evidence;
- conflicts and precedence are surfaced rather than silently reconciled;
- requirements and implementation details have not replaced the business policy;
- unresolved decisions are clearly separated from confirmed rules.

The ASPS gate is satisfied only when rules affecting the next delivery are explicit, relevant exceptions are covered, and unnecessary duplication has been removed.

## Report

Report:

1. evidence inspected;
2. delivery scope used;
3. confirmed rules, constraints, and invariants;
4. decision tables created, if any;
5. duplicates consolidated;
6. conflicts or precedence decisions;
7. relevant exceptions;
8. open questions / unsupported policy;
9. traceability coverage;
10. validation actually performed and remaining risks.

Keep verified facts, inferences, and open questions separate.

## Detailed references

- [Business Rules Standard](references/BUSINESS_RULES_STANDARD.md)
- [Discovery Input Model](references/DISCOVERY_INPUT_MODEL.md)
- [Rule Model](references/RULE_MODEL.md)
- [Decision Logic](references/DECISION_LOGIC.md)
- [Validation Checklist](references/VALIDATION_CHECKLIST.md)
- [Business Rules Document Template](assets/business-rules-document.template.md)
