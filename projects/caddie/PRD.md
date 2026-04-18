# Caddie Agent PRD

## 1) Product Definition

**Caddie** is an open-source **Codex agent** for golf analysis.

It is **not** a standalone app, marketplace listing, or real-time mobile caddie product in V1.

The agent takes golfer inputs (interview required, optional data ingestion when MCP connectors exist), analyzes tendencies, and returns a single strategy report in Markdown (`.md`) for immediate round use.

---

## 2) Objective

Turn golfer profile + shot data into one practical output:
- clear strategy windows
- clear avoid zones
- clear tee/approach/wedge rules
- clear reset cue under pressure

Primary outcome: better on-course decisions from repeatable patterns, not technical swing overload.

---

## 3) Scope (V1)

### In Scope
1. Interview-driven intake (required baseline)
2. Optional MCP data pull when available (Trackman, GHIN, 18Birdies, etc.)
3. Lightweight analytics on distances, dispersion, and miss tendencies
4. Deterministic markdown report generation
5. Confidence + assumptions section in output

### Out of Scope
- Building a web/mobile app shell
- Marketplace packaging requirements
- Live shot-by-shot GPS guidance
- Video-based swing reconstruction

---

## 4) User Types

1. **Player** (primary): wants a clear plan for next round
2. **Coach** (secondary): wants a fast strategy artifact for students
3. **Analyst power user** (secondary): wants reproducible markdown outputs from structured data

---

## 5) Core User Story

> As a golfer, I want Caddie to ask me the right questions, optionally use my data if available, and produce a concise strategy sheet I can follow during my round.

---

## 6) Required Inputs

Interview is mandatory unless full profile is already provided in machine-readable form.

### 6.1 Interview Intake (minimum)

1. **Player context**
   - Name
   - Handicap/index (or self-estimated level)
   - Dominant hand
2. **Shot identity**
   - Stock shape
   - Typical miss
   - Pressure miss
3. **Scoring windows**
   - Favorite approach/wedge distances
   - Distances/clubs that feel uncomfortable
4. **Tee strategy**
   - Driver confidence
   - Fairway-finder club
5. **Mental profile**
   - Tempo/rhythm breakdown trigger
   - Best single swing cue
6. **Round context** (optional but recommended)
   - Course style
   - Wind tendencies
   - Typical miss penalty (OB/water/trouble)

### 6.2 Optional MCP Inputs

If MCP connectors are present, agent may ingest:
- Trackman session data
- GHIN scoring/handicap history
- 18Birdies rounds/club trends
- Other MCP-compatible golf sources

If MCP is unavailable or fails, continue with interview-only flow.

---

## 7) Data Contract (Canonical Schema)

The agent normalizes all data to a compact canonical structure.

```yaml
player:
  name: string
  handicap_index: number|null
  handedness: left|right|unknown

shot_profile:
  stock_shape: string
  common_miss: string
  pressure_miss: string

club_data: # optional array
  - club: string
    carry_avg: number|null
    total_avg: number|null
    lateral_dispersion: number|null
    launch_dir: number|null
    club_speed: number|null
    ball_speed: number|null
    smash: number|null
    attack_angle: number|null
    face_to_path: number|null
    club_path: number|null
    launch_angle: number|null
    spin_rate: number|null

preferences:
  preferred_windows: [string]
  avoid_windows: [string]
  tee_priority: string
  reset_cue: string

metadata:
  source: interview|trackman|ghin|18birdies|mixed
  sample_size: number|null
  confidence: low|medium|high
```

---

## 8) Analysis Logic (V1)

Caddie should produce tactical recommendations using these rules:

1. **Window-first scoring logic**
   - Prioritize distances with best confidence and player comfort
2. **Avoid-zone suppression**
   - Flag forced/in-between yardages for conservative planning
3. **Miss-aware targeting**
   - Recommend target bias based on stock + pressure miss
4. **Tempo-safe fallback**
   - Include one universal cue + one backup cue
5. **Confidence labeling**
   - Low confidence when sample size is small or conflicting

---

## 9) Output Contract (`.md`)

Exactly one report per run.

### Required Sections
1. `# 🏌️ Round Strategy — {Name}`
2. `## 🧠 Core Identity`
3. `# 🎯 Primary Objective`
4. `# 📏 Yardage System`
5. `# 🪵 Tee Shot Strategy`
6. `# 🧠 Swing System`
7. `# 🔧 Wedge System`
8. `# 🧠 In-Round Reset (30 seconds)`
9. `# 🧩 Mental Model`
10. `# 🏁 Execution Mindset`
11. `# 💥 Success Looks Like`
12. `# 📉 Data Confidence & Assumptions`

### Output Style Rules
- Tactical, plain language
- Short bullet blocks
- No deep mechanics lecture
- “Do / Avoid / If-Then” phrasing preferred

---

## 10) Reworked Reference Output (Agent Target Shape)

```md
# 🏌️ Round Strategy — {Player} ({Index}, {Handedness})

## 🧠 Core Identity
- Stock shot: **{shape}**
- Miss: **{miss}**
- Key constraint: **{constraint}**
- Strength: **{strength}**

# 🎯 Primary Objective
> **Play to your preferred yardage windows for repeatable scoring positions.**

# 📏 Yardage System ({range})
## Preferred Windows
- **{window 1} → {club/feel}**
- **{window 2} → {club/feel}**
- **{window 3} → {club/feel}**

## 🚫 Avoid
- {awkward number 1}
- {awkward number 2}
- {forced pattern}

## 🧠 Strategic Rule
> {trusted-number-over-forced-swing rule}

# 🪵 Tee Shot Strategy
## Priority
> **Create the next preferred scoring number.**

### If-Then
- If {driver creates preferred number} → **Hit driver**
- If {driver creates awkward number} → **Use {position club}**

# 🧠 Swing System (Simple)
## Universal Cue
> **{primary cue}**

## Backup Cue
> **{fallback cue}**

# 🔧 Wedge System
- Setup: {2 short bullets}
- Feel: **{one cue}**
- Goal: {strike + distance control statement}

# 🧠 In-Round Reset (30 seconds)
- Trigger: {miss types}
- Action: **{tempo + cue}**
- Rule: Do not do technical rebuild mid-round.

# 🧩 Mental Model
> {identity line}

# 🏁 Execution Mindset
- {commitment 1}
- {commitment 2}
- {commitment 3}

# 💥 Success Looks Like
- {result 1}
- {result 2}
- {result 3}

# 📉 Data Confidence & Assumptions
- Confidence: **{low|medium|high}**
- Sample note: {line}
- Assumptions: {line}
```

---

## 11) Prompt/Workflow Requirements

### 11.1 Agent Run Sequence
1. Collect interview answers
2. Pull MCP data only if connector exists
3. Normalize to canonical schema
4. Compute windows/risk/miss tendencies
5. Generate markdown via fixed section order
6. Add confidence + assumptions

### 11.2 Guardrails
- Never block output because one datasource failed
- Never fabricate unavailable MCP data
- Clearly state when recommendations are interview-derived vs metric-derived
- Keep strategy recommendations specific and actionable

---

## 12) Acceptance Criteria (V1)

1. Agent can run with interview-only inputs and still produce full report.
2. Agent can include external metrics when MCP data is available.
3. Output always contains all required sections in correct order.
4. Output clearly marks confidence and assumptions.
5. Output language remains tactical and round-usable.

---

## 13) Success Metrics

- Report completion rate
- Median generation time
- % interview-only completions
- % runs with confidence marked correctly
- User rating: “This gave me a clear plan” (1–5)

---

## 14) Open Source Delivery

Recommended repository layout:

```text
projects/caddie/
  PRD.md
  examples/
    sample-input-interview.yaml
    sample-output-round-strategy.md
  schema/
    canonical-schema.yaml
  prompts/
    system-prompt.md
    report-template.md
```

Contributor expectations:
- Add new MCP adapters behind canonical schema mapping
- Keep markdown section order stable for compatibility
- Include sample input/output in PRs that modify report logic

---

## 15) Definition of Done

V1 is complete when:
1. A user can run Caddie with no external connectors.
2. Caddie returns a complete markdown round strategy from interview data.
3. Caddie can optionally enrich output with MCP data when available.
4. Confidence/assumptions are always present.
5. Repo includes sample inputs/outputs and schema docs.
