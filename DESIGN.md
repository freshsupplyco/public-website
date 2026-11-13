---
name: FSCO Stack
description: A white studio where three kinds of business value settle into one shared chain.
colors:
  paper: "oklch(1 0 0)"
  mist: "oklch(0.968 0.003 268)"
  ink: "oklch(0.21 0.012 268)"
  ink-hover: "oklch(0.33 0.014 268)"
  graphite: "oklch(0.45 0.012 268)"
  line: "oklch(0.88 0.005 268)"
  night: "oklch(0.17 0.012 268)"
  night-raised: "oklch(0.215 0.014 268)"
  night-line: "oklch(0.33 0.014 268)"
  night-dim: "oklch(0.76 0.012 268)"
  money: "oklch(0.52 0.2 257)"
  invest: "oklch(0.48 0.13 157)"
  assets: "oklch(0.5 0.12 62)"
  money-lit: "oklch(0.76 0.13 250)"
  invest-lit: "oklch(0.81 0.15 157)"
  assets-lit: "oklch(0.84 0.14 78)"
  canvas-money: "oklch(0.62 0.19 257)"
  canvas-invest: "oklch(0.68 0.16 157)"
  canvas-assets: "oklch(0.77 0.15 72)"
  canvas-neutral-left: "oklch(0.95 0.004 268)"
  canvas-neutral-right: "oklch(0.905 0.006 268)"
  canvas-neutral-edge: "oklch(0.42 0.012 268)"
typography:
  display:
    fontFamily: "'Host Grotesk', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(2.75rem, 7.4vw, 6rem)"
    fontWeight: 650
    lineHeight: 0.96
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "'Host Grotesk', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(2rem, 5vw, 4.25rem)"
    fontWeight: 650
    lineHeight: 1
    letterSpacing: "-0.04em"
  headline-panel:
    fontFamily: "'Host Grotesk', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(2rem, 4.2vw, 3.5rem)"
    fontWeight: 650
    lineHeight: 1
    letterSpacing: "-0.03em"
  title:
    fontFamily: "'Host Grotesk', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(1.25rem, 2vw, 1.625rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.03em"
  lede:
    fontFamily: "'Host Grotesk', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(1.125rem, 1.55vw, 1.375rem)"
    fontWeight: 400
    lineHeight: 1.38
    letterSpacing: "-0.015em"
  body:
    fontFamily: "'Host Grotesk', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "-0.01em"
  label:
    fontFamily: "'Host Grotesk', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  fine:
    fontFamily: "'Host Grotesk', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "-0.01em"
  legal:
    fontFamily: "'Host Grotesk', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "-0.01em"
rounded:
  focus: "4px"
  tray-item: "0.95rem"
  tray: "1.25rem"
  panel: "clamp(1.5rem, 2.6vw, 2.25rem)"
  pill: "999px"
spacing:
  gutter: "clamp(1.25rem, 4.5vw, 3.5rem)"
  band: "clamp(5rem, 11vw, 9.5rem)"
  nav-h: "3.5rem"
  container: "76rem"
  panel-gap: "1.25rem"
  panel-pad: "clamp(1.75rem, 4.5vw, 4.5rem)"
  heading-gap: "clamp(2.5rem, 5vw, 4.5rem)"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "0.8rem 1.5rem"
  button-primary-hover:
    backgroundColor: "{colors.ink-hover}"
    textColor: "{colors.paper}"
  button-primary-small:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.5rem 1rem"
  button-primary-large:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "1.05rem 1.9rem"
  button-night-play:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 1rem"
    height: "2.5rem"
  button-night-icon:
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    size: "2.5rem"
  chip-topic:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.pill}"
    padding: "0.6rem 1.15rem"
  chip-topic-selected:
    backgroundColor: "{colors.mist}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
  segment-tray:
    backgroundColor: "{colors.night-raised}"
    rounded: "{rounded.tray}"
    padding: "0.375rem"
  segment:
    textColor: "{colors.night-dim}"
    rounded: "{rounded.tray-item}"
    padding: "0.9rem 1.25rem"
  segment-active:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.tray-item}"
  panel-mist:
    backgroundColor: "{colors.mist}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "{spacing.panel-pad}"
  panel-paper:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "clamp(1.75rem, 3.5vw, 3rem)"
  panel-night:
    backgroundColor: "{colors.night-raised}"
    textColor: "{colors.paper}"
    rounded: "{rounded.panel}"
  nav:
    backgroundColor: "oklch(1 0 0 / 0.82)"
    textColor: "{colors.graphite}"
    typography: "{typography.label}"
    height: "{spacing.nav-h}"
---

# Design System: FSCO Stack

## Overview

**Creative North Star: "The White Studio"**

The page is a product-render studio: a seamless white ground, near-black ink, and isometric cubes drawn with pale faces and hairline edges, as if photographed on a sweep. Into that quiet room come three hues, one per solution, and they are the only colour allowed in. Blue is money, green is investment, amber is assets. Each hue marks its solution's source tile, its moving packets, its cubelets, its claim line and its active state, and nothing else.

The system persuades by showing, not decorating. Value travels along rails and becomes blocks in front of the visitor; the type stays out of the way by being one grotesque, set tight and heavy at display size and plain at reading size. Density is low: wide bands, one idea per band, generous radii on a small number of large panels. A night band holds the interactive walkthrough and the footer closes in the same night, so the page goes white, night, white, mist, white, night.

The earlier forest, lime and cream identity with the skewed "F" mark is discarded and does not return in any form.

**Key Characteristics:**
- White ground, ink text, tonal greys with a faint cool cast (hue 268); no warm neutrals.
- Exactly three chromatic hues, each owned by one solution.
- Isometric canvas scenes as the only imagery; no photos, screenshots or logos.
- One variable grotesque (Host Grotesk) carrying every role by size and weight.
- Pill controls in ink; large soft-cornered panels; hairline dividers.
- Flat DOM surfaces: depth is tonal, never shadowed.
- Motion that travels at constant speed, eases out on arrival and never overshoots.

## Colors

A near-achromatic studio palette with a slight cool cast, interrupted by three solution hues that each exist in three tunings: text-safe on light, lit on night, and canvas face.

### Primary
- **Ink** (`ink`): All body and display text on light grounds, the primary pill button, the brand mark, canvas labels, seams and chain links. Its hover step is `ink-hover`.

### Secondary
The three solution hues. They are peers, never ranked, and always appear as a set of three or as the single hue of the solution in view.
- **Money Blue** (`money`): The claim line of Move money on mist, and the focus ring on light grounds.
- **Investment Green** (`invest`): The claim line of Digital investment.
- **Asset Amber** (`assets`): The claim line of Tokenized assets.

### Tertiary
- **Lit hues** (`money-lit`, `invest-lit`, `assets-lit`): The same three hues retuned for the night band. They mark the active step numeral, the step progress bar, the active node stroke, value paths and packets, the outcome line, and the focus ring on night.
- **Canvas hues** (`canvas-money`, `canvas-invest`, `canvas-assets`): The base (left-face) values of the isometric palette. Each cube derives its other faces from the base: top is lightness +0.10 at 72% chroma, right is lightness -0.09, edge is lightness -0.24 at 80% chroma. Packet trails use the base value at 45% alpha.

### Neutral
- **Paper** (`paper`): The page ground, text on night, the inverted pill on night, the top face of neutral cubes.
- **Mist** (`mist`): The solution panels on paper, the services band ground, the selected topic chip.
- **Graphite** (`graphite`): Secondary text on paper and mist: ledes, descriptions, nav links at rest, fine print.
- **Line** (`line`): Hairline dividers on light grounds and the resting chip border.
- **Night** (`night`): The walkthrough band, the footer, diagram node fill.
- **Night Raised** (`night-raised`): The walkthrough container and control trays sitting on night.
- **Night Line** (`night-line`): Hairlines, node strokes and control borders on night.
- **Night Dim** (`night-dim`): Secondary text on night; event paths and packets.
- **Canvas neutrals** (`canvas-neutral-left`, `canvas-neutral-right`, `canvas-neutral-edge`): Faces and hairline edge of sealed blocks, stack layers and the holder plate. Rails are ink at 24% alpha; ghost frames are dashed ink at 30%.

### Named Rules
**The Three Hues Rule.** Colour belongs to the solutions. A hue may mark a solution's source tile, packets, cubelets, claim line and active state. Buttons, links, headings, grounds and icons stay ink, paper or grey. The one exception the build carries is the focus ring, which borrows Money Blue.

**The Two Tables Rule.** Canvas hues and text hues are separate values on purpose. Canvas values are bright enough to read as lit cube faces and are never used for text; the CSS hues are dark enough to hold text contrast on mist and are never used to paint faces. Do not unify them.

**The Lit On Night Rule.** On night grounds use the `-lit` tuning of a hue; on paper and mist use the base tuning. Never cross them.

## Typography

**Display Font:** Host Grotesk variable, weights 300 to 800, self-hosted (with Helvetica Neue, Arial, sans-serif)
**Body Font:** Host Grotesk (same family)
**Label/Mono Font:** none distinct

**Character:** One grotesque doing everything. Tight and heavy at display size, where negative tracking closes the letters into a block; open and neutral at reading size. Hierarchy comes from size and weight alone.

### Hierarchy
- **Display** (650, clamp(2.75rem, 7.4vw, 6rem), 0.96, -0.04em): The hero headline and the closing headline. Centred, one per band.
- **Headline** (650, clamp(2rem, 5vw, 4.25rem), 1, -0.04em): Band headings, held to 16ch so they break into two deliberate lines.
- **Panel headline** (650, clamp(2rem, 4.2vw, 3.5rem), 1, -0.03em): The solution name inside each solution panel. The active walkthrough step uses a smaller cut of the same voice (clamp(1.5rem, 2.6vw, 2rem), 1.05, -0.035em).
- **Title** (600, clamp(1.25rem, 2vw, 1.625rem), 1.15, -0.03em): Service names, audience names, the flow label, and the solution claim line (set in the solution hue at 1.2 line-height).
- **Lede** (400, clamp(1.125rem, 1.55vw, 1.375rem), 1.38, -0.015em): One sentence under a heading, graphite on light and night-dim on night, capped at 38rem (41rem in the hero).
- **Body** (400, 1.0625rem, 1.5, -0.01em): Descriptions, capped between 24rem and 30rem in columns.
- **Label** (600, 0.9375rem): Nav links (400 at rest), step titles (500), control text, status text.
- **Fine** (400, 0.875rem, 1.45): Qualifications and scope notes in graphite.
- **Legal** (400, 0.8125rem, 1.5): Footer legal, walkthrough disclaimer, lane headings, legend.

### Named Rules
**The One Face Rule.** Host Grotesk is the only typeface, including inside canvas scenes, which read their font from the page. No second family, no monospace, no uppercase, no positive tracking. Tracking tightens as size grows: -0.01em at body, -0.03em at title, -0.04em at display.

**The Weight Ladder Rule.** 400 reads, 500 labels a state, 600 names a thing, 650 heads a band, 700 is the wordmark only. Headings balance their wraps and paragraphs wrap pretty.

## Layout

A single centred column: content is held to `container` (76rem) plus a fluid `gutter` on each side. The page is a stack of full-width bands, each padded top and bottom by `band`, and each band changes ground rather than drawing a border: paper, night, paper, mist, paper, night.

Inside a band the default arrangement is a left-aligned heading block (headline plus one lede, `heading-gap` below it) followed by the band's content. Only the hero and the close are centred. Two-column content uses a 5fr / 7fr split with the lighter side for words; solution panels alternate which side the scene sits on. The platform band pins its heading while the service list scrolls past. Three-up and two-up grids are used once each for audiences and engagement panels; panels in a stack are separated by `panel-gap`.

Canvas scenes scale to their box by aspect ratio (hero 20.8 / 12.4, solution 16.6 / 11, stack 1 / 1) and the hero scene is capped at 60svh so the first block is visible in the first viewport.

Responsive behaviour: at 900px and below, split layouts and multi-column grids collapse to one column and every solution scene moves above its copy. At 760px and below, the nav links fold behind a text "Menu" toggle that opens a full-width paper sheet, the segmented control stacks, topic chips become a two-column grid, and the hero scene gets a taller ratio (20.8 / 14). The walkthrough hides its diagram at 700px and below and replaces it with a from / to route of two stacked nodes.

## Elevation & Depth

DOM surfaces are flat. No element in the stylesheets carries a box-shadow. Depth on the page is tonal: mist panels on paper, paper panels on mist, night-raised containers on night. Separation inside a surface is a 1px hairline in `line` or `night-line`.

Real depth lives only inside the canvas scenes, where it is drawn: three-face isometric shading and one soft contact shadow beneath objects that rest on the ground (source tiles, sealed blocks, the bottom stack layer, the vault, the holder plate). Moving objects (packets, cubelets) cast none. The sticky nav is the one translucent surface: paper at 82% with an 18px saturated blur and an ink hairline at 8%.

### Shadow Vocabulary
- **Canvas contact shadow** (canvas `shadowColor: oklch(0.3 0.03 268 / 0.2)`, blur 0.7 unit, offset-y 0.28 unit, where a unit is one isometric grid step): Under grounded objects in isometric scenes only.

### Named Rules
**The Drawn Depth Rule.** If something needs to look raised, change its ground tone or draw it as a cube in a scene. Shadows are a canvas material; they are not applied to panels, buttons or the nav.

## Shapes

Two families of form, kept apart. The interface is soft: every control is a full pill (`pill`), every large container has a generous fluid radius (`panel`), and the segmented tray nests a slightly smaller radius inside its own (`tray-item` inside `tray`). The illustration is hard: cubes, tiles and plates with straight edges, 30 degree isometric projection, round line joins and a hairline edge stroke that scales with the scene (never below 1px).

Lines are hairlines throughout: 1px dividers in the DOM, a 1px step-numeral ring, 1.75 stroke icons with round caps drawn on a 24 grid. Dashes mean "not yet solid": the ghost frame of a forming block, a retired credit, a status-update path, a lane divider. Circles appear only as step numerals. The brand mark is three stacked isometric plates, the top one filled.

## Components

### Buttons
Calm and certain; one obvious action per view.
- **Shape:** Full pill (999px).
- **Primary:** Ink fill, paper text, weight 600 at 1rem, padding 0.8rem 1.5rem. A small cut (0.5rem 1rem, 0.9375rem) sits in the nav; a large cut (1.05rem 1.9rem, 1.125rem) closes the page. May carry a trailing arrow icon.
- **Hover / Focus:** Fill lifts to `ink-hover` over 0.25s on the house ease; the arrow slides 3px right; press scales to 0.97. Focus is a 2px Money Blue outline offset 3px (the lit tuning on night).
- **On night:** The primary inverts to a paper pill with ink text (the Play control). Secondary controls are 2.5rem circles with a `night-line` hairline that brightens to paper on hover and drop to 35% opacity when disabled.

### Links
- **Style:** Ink (or current colour), weight 600, with a trailing arrow icon. The underline is transparent at rest and fades to the text colour on hover, offset 0.3em; the arrow slides 3px. This is the quiet second action beside a pill.

### Chips
- **Style:** Paper fill, `line` hairline, graphite text at weight 500, full pill, padding 0.6rem 1.15rem. Used as a single-choice radio group for the contact topic.
- **State:** Hover darkens border and text to ink. Selected takes a mist fill, an ink border and weight 600.

### Segmented control
- **Style:** A `night-raised` tray (radius 1.25rem, 0.375rem inset) holding equal segments. Each segment has a two-line label: the solution name at title weight and its case-study brand beneath at fine size.
- **State:** Rest is `night-dim` text on no fill; hover brightens text to paper; pressed becomes a paper tile with ink text. A compact pill variant (the journey switch) uses the same states inside a pill tray.

### Cards / Containers
- **Corner Style:** Fluid large radius (clamp(1.5rem, 2.6vw, 2.25rem)).
- **Background:** Mist on a paper band, paper on a mist band, night-raised on a night band. A panel always differs from its band by one tonal step.
- **Shadow Strategy:** None; see Elevation & Depth.
- **Border:** None on the panel. Internal sections divide with a single hairline.
- **Internal Padding:** clamp(1.75rem, 4.5vw, 4.5rem) for solution panels; clamp(1.75rem, 3.5vw, 3rem) for engagement panels.
- **Solution panel:** Copy and an isometric scene side by side at 5fr / 7fr. The panel sets one hue, consumed only by the claim line. A hairline then introduces the case study: a small heading, a paragraph, an optional fine-print qualification and a link.

### Specification list
A definition list for naming parts of the platform: each row is a title-size term beside a graphite description in a 5fr / 6fr grid, with a `line` hairline above every row and below the last.

### Navigation
- **Style:** Sticky, 3.5rem tall, translucent paper with blur and an 8% ink hairline. Wordmark at weight 700 with the mark at left; links at 0.9375rem in graphite, darkening to ink on hover; the small ink pill at right.
- **Mobile:** Links fold behind a text "Menu" button and open as a paper sheet below the bar with larger (1.125rem) ink links.
- **Footer:** Night ground, `night-dim` links that brighten to paper, a `night-line` hairline above the legal line.

### Isometric scene (signature)
The system's only imagery: a canvas drawing in 30 degree isometric projection, sized by a scene's bounds so one grid unit scales with the box.
- **Vocabulary:** Source tiles (flat hued slabs with a label above), rails (ink at 24%), packets (small hued cubes with a short trail), cubelets (hued cubes that fill a block's eight slots), ghost frames (dashed ink at 30% where a block is forming), sealed blocks (neutral cubes with faint seams), and links (a solid ink bar between blocks).
- **Colour:** Neutral faces for infrastructure, a solution hue for anything that belongs to that solution. Labels are ink at weight 600, 11px to 15px, so scenes sit on paper or mist grounds.
- **Motion:** Packets travel at constant speed (3.2 units per second) on orthogonal rails and hop block to block where a transfer crosses the chain. Arrivals ease out exponentially, growing from 40% scale; seals and shifts ease in and out on a cubic. Nothing overshoots. Scenes loop, run only while in view and the tab is visible, and render a single composed still frame under reduced motion.
- **Access:** Each canvas is an image with a sentence describing what the scene shows.

### Walkthrough (signature)
A night-raised container that steps through one transaction. From top: flow label and summary; a numbered stepper; a three-lane node diagram; the active step's story; a control bar.
- **Stepper:** Equal-width step buttons on a `night-line` baseline. Each has a 1.5rem ringed numeral and a title. The current and completed numerals fill with the lit hue (completed swaps the numeral for a check); the current step draws a 2px lit bar along the baseline that fills over the step's 5.2s dwell.
- **Diagram:** Rounded-rectangle nodes in night with `night-line` strokes; the two nodes of the active step lift one tone and take a lit stroke. Three path kinds are distinguished by more than colour: instruction is a 2px paper line, value movement is a 3px lit line, status update is a dashed `night-dim` line. A small square packet rides the active path, and a legend repeats the three kinds.
- **Story:** A 5fr / 7fr split: step title and customer action at left; platform behaviour at right with the outcome beneath a hairline in the lit hue.
- **Behaviour:** Autoplays in view, pauses on any manual step selection, stops on the last step. Under reduced motion it does not autoplay and says so.

## Do's and Don'ts

### Do:
- **Do** keep grounds to the four tones: `paper`, `mist`, `night`, `night-raised`, and change ground to separate bands.
- **Do** give each solution its own hue everywhere it appears, and use the base tuning on light grounds, the `-lit` tuning on night, and the canvas tuning for cube faces.
- **Do** make the primary action an ink pill (a paper pill on night) and pair it with at most one quiet underlined link.
- **Do** set every piece of text in Host Grotesk, tightening tracking as size grows (-0.01em body, -0.03em title, -0.04em display).
- **Do** show ideas as isometric scenes built from the existing vocabulary: tiles, rails, packets, cubelets, ghost frames, sealed blocks, links.
- **Do** move things at constant speed, ease arrivals out, ease seals in and out, and provide a composed still frame for reduced motion.
- **Do** distinguish path kinds by weight and dash as well as hue.
- **Do** divide with 1px hairlines in `line` or `night-line`.

### Don't:
- **Don't** put a solution hue on buttons, links, headings, icons or grounds. Colour belongs to the solutions.
- **Don't** use canvas hue values for text, or CSS hue values for cube faces; the two tables are separate by design.
- **Don't** add box-shadows to panels, buttons or the nav. Shadow exists only as the contact shadow drawn inside a scene.
- **Don't** introduce a second typeface, monospace, uppercase or positively tracked text.
- **Don't** let motion overshoot, bounce or spring.
- **Don't** square off controls or sharpen panel corners; controls are pills and panels carry the fluid large radius.
- **Don't** place isometric scenes on night grounds as drawn; their labels and rails are ink.
- **Don't** bring back the discarded forest, lime and cream identity or the skewed "F" mark.
- **Don't** use photographs, product screenshots, customer logos or metrics as imagery; none exist, and the scenes are the proof.
