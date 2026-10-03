# Decision Logic, Exceptions, and Precedence

## When to use a decision table

Use a decision table when:

- two or more independent conditions combine;
- combinations produce materially different outcomes;
- prose would make overlap, omissions, or precedence hard to see.

Do not create a table for a single simple condition merely for ceremony.

## Table shape

A compact default:

| Rule / row | Condition A | Condition B | Condition C | Outcome | Exception / note |
|---|---|---|---|---|---|

Use domain-specific column names when clearer.

## Validation of a decision table

Check:

1. each condition has a clear domain/value set;
2. rows that can overlap either have the same outcome or explicit precedence;
3. materially possible combinations are covered or explicitly unresolved;
4. impossible combinations are identified when useful;
5. the table does not contradict its canonical parent rules;
6. the table is not duplicated again as row-by-row prose.

## Exceptions

For each material rule ask:

- Is there an override?
- Who can invoke it?
- Under what condition?
- Is approval required?
- What outcome changes?
- Does the exception expire or have scope?
- Is the exception itself constrained by another rule?

Only document exceptions supported by evidence or explicitly requested analysis.

## Edge conditions

Pay special attention to boundaries already implied by evidence:

- exactly at a minimum/maximum threshold;
- empty/unknown value;
- expired time window;
- simultaneous eligibility;
- repeated action;
- previously completed/terminal state;
- manual override;
- unavailable prerequisite.

Do not fabricate policy for an edge condition whose correct outcome is unknown. Record the unresolved decision.

## Precedence

Use explicit precedence only when overlapping rules legitimately coexist.

Example form:

~~~text
BR-SPECIAL-002 overrides BR-BASE-001 only for <scope/condition>.
~~~

Precedence should specify scope. Avoid global precedence unless that is actually the policy.

## Conflict handling

A conflict exists when two applicable confirmed policies require incompatible outcomes.

Resolve from evidence such as:

- explicit override language;
- narrower scope;
- newer approved policy that explicitly supersedes the old one;
- authoritative owner/governance source.

If evidence does not establish precedence, report a blocker/open decision rather than selecting a rule based on intuition.
