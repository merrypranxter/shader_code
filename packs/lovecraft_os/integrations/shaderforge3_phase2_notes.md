# ShaderForge3 Phase 2 Integration Notes

## Additions
- Load `presets/lovecraft_blends_phase2.json` after phase 1 presets.
- Expose optional post-FX toggles:
  - `void_grain` (`u_grain`, `u_vignette`)
  - `arcane_aberration` (`u_aberration`, `u_scan`)
- Support preset-level `postFx` arrays in addition to shader uniforms.

## Suggested render order
1. Draw base shader preset to scene target.
2. Apply `void_grain_post.frag`.
3. Apply `arcane_aberration_post.frag`.
4. Present to screen.

## Performance knobs
- Set `madness_lattice` as default low/medium fallback.
- Reduce `u_glow` and `u_moire` for weaker GPUs.
- Disable post-FX entirely for battery saver mode.
