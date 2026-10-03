# Discovery Input Model

## Purpose

Convert discovery evidence into candidate business policy without turning unknowns into invented rules.

## Evidence layers

| Layer | Examples | Use |
|---|---|---|
| Discovery | project overview, problem framing, actors, workflows, constraints, decisions | primary input for delivery scope |
| Product/domain | approved PRD, policy docs, domain glossary, stakeholder decisions | clarify intended policy |
| Current behavior | UI behavior, code paths, APIs, schemas, persisted states | prove what the system currently does |
| Governance | approvals, compliance obligations, contracts, external policy | establish required restrictions/precedence |
| Historical | changelog, prior rules, deprecations, decision records | preserve continuity and avoid resurrecting removed policy |

Current behavior and historical artifacts require interpretation: they may represent intended policy, accidental behavior, or debt.

## Extraction lenses

Scan evidence for language or behavior that implies:

### Actor / permission

- who may act;
- who must approve;
- who is excluded;
- delegated authority and overrides.

### Eligibility / decision

- when something is allowed;
- when it must be rejected;
- criteria that select one outcome over another.

### Limits / values

- minimum/maximum;
- quota;
- threshold;
- precision/rounding;
- allowed value sets.

### Lifecycle / state

- valid states;
- entry/exit conditions;
- permitted transitions;
- terminal or irreversible states.

### Timing / sequence

- windows, deadlines, expiry;
- ordering dependencies;
- cooldown or waiting periods.

### Calculation / derivation

- formula inputs;
- precedence;
- rounding and boundary behavior;
- fallback decision.

### Failure / exception

- override;
- escalation;
- manual review;
- exceptional eligibility;
- unavailable dependency;
- ambiguous or conflicting case.

### Invariant

- conditions that must always remain true;
- identity/ownership isolation;
- balance/conservation constraints;
- cross-record consistency.

## Candidate worksheet

Before drafting canonical rules, capture candidates in a compact form:

| Candidate | Evidence | Fact / inference / question | Delivery relevance | Potential duplicate |
|---|---|---|---|---|

Do not assign a final rule ID until the candidate is sufficiently understood.

## Fact, inference, question

### Fact

Directly supported by approved evidence or intentional current behavior.

### Inference

Reasonable interpretation needed to connect evidence. It must be labeled and should not become binding policy without confirmation when the distinction matters.

### Open question

Policy is absent, contradictory, or too ambiguous to constrain implementation safely.

~~~text
MISSING POLICY != DEFAULT POLICY
~~~

## Delivery filter

A candidate is normally in scope if changing or ignoring it could alter:

- user eligibility or permissions;
- accepted/rejected inputs;
- externally meaningful state transitions;
- business outcomes/calculations;
- approval or escalation;
- compliance/governance behavior;
- acceptance of the next delivery.

Record deferred candidates separately instead of mixing them into the active rule set.
