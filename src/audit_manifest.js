// Phase 2P full parity audit.
// These are not silently ignored: each source concept below has no executable counterpart in
// the v0.6.4 offline rules/data model or is explicitly marked as future content there.
export const INTENTIONAL_SOURCE_GAPS = Object.freeze([
  {
    id:"E015_ENVIRONMENT_BONUS",
    source:"E015 condition: 비/번개 계열 환경 이벤트가 활성화되면 확률 상승",
    reason:"v0.6.4 contains no weather/environment-state system that can activate this condition.",
    policy:"Keep the event usable; do not invent weather state solely for this modifier."
  },
  {
    id:"E052_MAGIC_CRAFT_EFFECT",
    source:"E052: 다음 마도 제작 효과 +5% 1회",
    reason:"Items/recipes have no craft-quality or scalable crafted-effect field in v0.6.4.",
    policy:"Do not invent a permanent stat/quality system; leave this source-only bonus documented."
  },
  {
    id:"E066_HOSTILE_NPC",
    source:"E066: 20% 적대 NPC 조우",
    reason:"The source note itself says NPC 연계 예정 and v0.6.4 has no hostile-NPC event entity/rules.",
    policy:"Do not substitute a wild monster and falsely present it as the authored NPC encounter."
  }
]);
