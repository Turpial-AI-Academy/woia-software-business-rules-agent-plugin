import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const ROOT = path.resolve(import.meta.dirname, "..");

const skillRoot = path.join(ROOT, "skills", "business-rules");

function preservesUnrelatedRuleEvidence(text) {
  return text.split(/[.!?\n]+/).some((statement) => (
    /\b(?:preserve|keep|retain)\b/i.test(statement) &&
    /\b(?:unrelated|unaffected)\b/i.test(statement) &&
    /\brules\b/i.test(statement) &&
    /\bevidence\b/i.test(statement) &&
    /\bvalid\b/i.test(statement) &&
    !/\b(?:not|never|discard|remove)\b/i.test(statement)
  ));
}

test("skill preserves discover-before-decide operating order", async () => {
  const skill = await readFile(path.join(skillRoot, "SKILL.md"), "utf8");
  const discover = skill.indexOf("## Discover");
  const decide = skill.indexOf("## Decide");
  const implement = skill.indexOf("## Implement");
  const validate = skill.indexOf("## Validate");
  const report = skill.indexOf("## Report");
  assert.ok(discover >= 0 && decide > discover && implement > decide && validate > implement && report > validate);
  assert.match(skill, /Discover before defining policy/i);
});

test("standard separates business policy from requirements and technical design", async () => {
  const standard = await readFile(path.join(skillRoot, "references", "BUSINESS_RULES_STANDARD.md"), "utf8");
  assert.match(standard, /A requirement describes capability or behavior.*business rule governs the policy/s);
  assert.match(standard, /Implementation details.*are not business rules/is);
  assert.match(standard, /minimum sufficient set of explicit business policy/i);
});

test("discovery model refuses to invent missing policy", async () => {
  const discovery = await readFile(path.join(skillRoot, "references", "DISCOVERY_INPUT_MODEL.md"), "utf8");
  assert.match(discovery, /Fact, inference, question/i);
  assert.match(discovery, /MISSING POLICY != DEFAULT POLICY/);
  assert.match(discovery, /Do not assign a final rule ID until the candidate is sufficiently understood/i);
});

test("rule model requires canonical semantics and deduplication", async () => {
  const model = await readFile(path.join(skillRoot, "references", "RULE_MODEL.md"), "utf8");
  for (const phrase of ["Source", "Statement", "Applicability", "Decision / effect", "Exceptions", "Dependencies", "Precedence", "Validation", "Traceability"]) {
    assert.match(model, new RegExp(phrase.replace("/", "\\/"), "i"));
  }
  assert.match(model, /governed subject\s*\+\s*applicability\/condition\s*\+\s*decision\/effect\s*\+\s*scope/is);
  assert.match(model, /keep one canonical rule and merge evidence\/traceability/i);
});

test("decision guidance covers tables, exceptions and unresolved conflicts", async () => {
  const logic = await readFile(path.join(skillRoot, "references", "DECISION_LOGIC.md"), "utf8");
  assert.match(logic, /two or more independent conditions combine/i);
  assert.match(logic, /overlap.*explicit precedence/is);
  assert.match(logic, /Do not fabricate policy for an edge condition/i);
  assert.match(logic, /report a blocker\/open decision rather than selecting a rule/i);
});

test("document template preserves explicit rules, traceability, exceptions and open questions", async () => {
  const template = await readFile(path.join(skillRoot, "assets", "business-rules-document.template.md"), "utf8");
  for (const heading of ["## 3. Rule catalog", "## 4. Detailed rules", "## 5. Decision tables", "## 7. Exceptions and edge conditions", "## 8. Traceability", "## 9. Open questions", "## 10. Validation summary"]) {
    assert.ok(template.includes(heading), "missing template heading: " + heading);
  }
  assert.match(template, /Applicability \/ preconditions/);
  assert.match(template, /Exceptions \/ overrides/);
  assert.match(template, /Validation condition/);
});

test("validation checklist freezes the business-rules gate", async () => {
  const checklist = await readFile(path.join(skillRoot, "references", "VALIDATION_CHECKLIST.md"), "utf8");
  assert.match(checklist, /rules affecting the next delivery are explicit/i);
  assert.match(checklist, /relevant exceptions are represented/i);
  assert.match(checklist, /unnecessary duplication is removed/i);
  assert.match(checklist, /unsupported policy remains visibly unresolved/i);
});

test("skill reports evidence, duplicates, conflicts, exceptions and open questions separately", async () => {
  const skill = await readFile(path.join(skillRoot, "SKILL.md"), "utf8");
  for (const phrase of ["evidence inspected", "duplicates consolidated", "conflicts or precedence decisions", "relevant exceptions", "open questions / unsupported policy", "traceability coverage"]) {
    assert.match(skill, new RegExp(phrase, "i"));
  }
  assert.match(skill, /Keep verified facts, inferences, and open questions separate/i);
});

test("bounded rule amendments preserve identifiers and reconcile affected decision links", async () => {
  const skill = await readFile(path.join(skillRoot, "SKILL.md"), "utf8");
  const policy = skill.split("## Execution depth")[1]?.split("## Discover")[0] ?? "";
  for (const obligation of [
    /bounded amendment[\s\S]*healthy[\s\S]*canonical/i,
    /affected rule ID[\s\S]*applicability[\s\S]*outcome/i,
    /dependent exceptions[\s\S]*precedence[\s\S]*table rows[\s\S]*traceability/i,
    /smallest[\s\S]*rule record[\s\S]*preserv[\s\S]*unrelated[\s\S]*IDs/i,
    /mandatory[\s\S]*source authority[\s\S]*exceptions[\s\S]*deduplication/i,
  ]) assert.match(policy, obligation);
});

test("deep rule analysis retains uncertainty and cross-cutting safety triggers", async () => {
  const skill = await readFile(path.join(skillRoot, "SKILL.md"), "utf8");
  const policy = skill.split("## Execution depth")[1]?.split("## Discover")[0] ?? "";
  for (const trigger of [
    /deep path[\s\S]*new catalog/i,
    /unclear[\s\S]*policy[\s\S]*contradictory sources/i,
    /missing durable evidence[\s\S]*failed invariant/i,
    /API[\s\S]*schema[\s\S]*persisted[\s\S]*migration/i,
    /auth[\s\S]*approval[\s\S]*trust/i,
    /deployment[\s\S]*rollback[\s\S]*availability/i,
    /cross-provider dependencies[\s\S]*precedence/i,
    /\b(?:complete|full)\b[^.!?\n]*\bbusiness-rules\b[^.!?\n]*\bgate\b/i,
  ]) assert.match(policy, trigger);
});

test("rule evidence reuse preserves policy authority and invalidates obsolete approvals", async () => {
  const standard = await readFile(path.join(skillRoot, "references", "BUSINESS_RULES_STANDARD.md"), "utf8");
  const lifecycle = standard.split("## Evidence lifecycle for amendments")[1] ?? "";
  for (const obligation of [
    /locator[\s\S]*revision[\s\S]*scope[\s\S]*result/i,
    /Reusable[\s\S]*authority[\s\S]*unchanged[\s\S]*inspectable/i,
    /Invalidated[\s\S]*history[\s\S]*old approval[\s\S]*different policy/i,
    /Fresh[\s\S]*source authority[\s\S]*exceptions/i,
    /Assumed\/inferred[\s\S]*\b(?:neither|not|never|cannot)\b[\s\S]*\binference\b[\s\S]*\brecollection\b/i,
    /owning downstream capability[\s\S]*independent gate/i,
  ]) assert.match(lifecycle, obligation);
  assert.ok(preservesUnrelatedRuleEvidence(lifecycle), "unaffected valid rules and evidence must be preserved");
});

test("rule preservation checks accept paraphrases and reject missing or negated obligations", () => {
  assert.ok(preservesUnrelatedRuleEvidence("Keep unaffected rules and their evidence while they remain valid."));
  assert.ok(preservesUnrelatedRuleEvidence("Retain valid evidence together with unrelated rules."));
  for (const invalid of [
    "Keep valid rules and their evidence.",
    "Keep unaffected valid rules.",
    "Do not retain unaffected valid rules and evidence.",
    "Discard unrelated rules and valid evidence.",
  ]) assert.equal(preservesUnrelatedRuleEvidence(invalid), false);
});

test("rule references load by decision need and amendment evidence remains explicit", async () => {
  const skill = await readFile(path.join(skillRoot, "SKILL.md"), "utf8");
  assert.match(skill, /new catalog or uncertain policy scope[\s\S]*BUSINESS_RULES_STANDARD/i);
  assert.match(skill, /RULE_MODEL[\s\S]*when record semantics/i);
  assert.match(skill, /DECISION_LOGIC[\s\S]*when combinations/i);
  const implement = skill.split("## Implement")[1]?.split("## Validate")[0] ?? "";
  assert.match(implement, /\bhealthy\b[\s\S]*\bartifact\b/i);
  assert.match(implement, /\b(?:do not|avoid|without)\b[^.!?\n]*\breplay\b[^.!?\n]*\btemplate\b/i);
  const template = await readFile(path.join(skillRoot, "assets", "business-rules-document.template.md"), "utf8");
  for (const obligation of [/Affected rule IDs/i, /Reused[\s\S]*approval evidence/i, /Invalidated evidence/i, /Fresh policy checks[\s\S]*results/i]) {
    assert.match(template, obligation);
  }
});

test("business-rules requires explicit local-write authority before persistence", async () => {
  const skill = await readFile(path.join(skillRoot, "SKILL.md"), "utf8");
  assert.match(skill, /local-write/i);
  assert.match(skill, /without[^\n.]*grant[\s\S]*do not mutate|without[^\n.]*authorization[\s\S]*do not mutate/i);
  assert.match(skill, /authorized[\s\S]*persist|grant[\s\S]*write/i);
});
