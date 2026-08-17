# Interactive Component Integration

[English](#english) · [中文](#中文)

## English

`interactive-component-integration` is a reusable agent skill for integrating third-party interactive and animated frontend components without silently changing how they render.

It is built for the failure mode where an adaptation looks approximately right but has already drifted from the source component's defaults, renderer setup, color pipeline, alpha behavior, DPR policy, post-processing chain, lifecycle, or accessibility contract.

### When it activates

Use this skill for tasks involving:

- canvas, WebGL, or shader-based visuals;
- post-processing and animated backgrounds;
- scroll-driven or pointer-reactive effects;
- sensor-, webcam-, or other input-reactive components;
- creative-coding snippets and component-gallery exports;
- third-party animation components that must be adapted, debugged, or verified.

It is intentionally not a general frontend skill. Ordinary page maintenance, page isolation, and visual QA do not trigger it unless they are part of an interactive-component integration.

### What it enforces

1. **Source fidelity first** — inspect the authoritative source, preserve defaults, and reproduce the real rendering pipeline before tuning visuals.
2. **Explicit deviations** — record every intentional difference, its reason, its visible impact, and how it was verified.
3. **Production boundaries** — contain component-specific code, assets, selectors, experiments, and cache behavior within the owning surface.
4. **Performance and fallback behavior** — bound DPR, animation loops, resize work, visibility handling, reduced motion, and API failure paths.
5. **Evidence-based QA** — compare normalized viewport states, exercise relevant responsive and interaction cases, and never report untested behavior as passed.

### Install

Ask Codex to install the skill from this repository path:

```text
Use $skill-installer to install the skill from:
https://github.com/Duoasa/interactive-component-integration/tree/main/interactive-component-integration
```

Codex also supports local skills under user or repository skill directories. See the [official OpenAI skill documentation](https://learn.chatgpt.com/docs/build-skills) for current discovery locations and invocation options.

### Use

Invoke it explicitly:

```text
Use $interactive-component-integration to integrate this WebGL background,
preserve the source rendering contract, and verify it in the production page.
```

Codex may also activate it implicitly when a task matches the trigger scope in `SKILL.md`.

### Repository structure

```text
interactive-component-integration/
├── README.md
└── interactive-component-integration/
    ├── SKILL.md
    └── agents/
        └── openai.yaml
```

### Validation

The skill passes the official `skill-creator` structural validator. It was also forward-tested against:

- a WebGL port with broken defaults, missing bloom, renderer/DPR drift, CSS-filter substitution, and an unmanaged animation loop;
- a third-party scroll-driven effect moving from a playground into an isolated production page with incomplete browser coverage.

The tests confirmed that the skill identifies rendering-contract drift and reports incomplete QA as `not tested` or `blocked` instead of claiming success.

### Origin

This reusable workflow was extracted and generalized from production rules in [Duoasa Design](https://github.com/Duoasa/Duoasa-Design):

- [External Interaction Component Integration Guidelines](https://github.com/Duoasa/Duoasa-Design/blob/main/docs/external-interaction-component-guidelines.md)
- [Case Study Page Independence Rules](https://github.com/Duoasa/Duoasa-Design/blob/main/cases/README.md)
- [Mobile Hero Design QA](https://github.com/Duoasa/Duoasa-Design/blob/main/design-qa.md)

---

## 中文

`interactive-component-integration` 是一个可复用的 agent skill，用于把第三方交互与动画组件可靠地集成到前端项目中，并避免在适配过程中悄悄改变其真实渲染机制。

它解决的典型问题是：页面“看起来差不多”，但组件的默认参数、渲染器配置、色彩管线、透明度与混合、DPR、后处理链、生命周期或无障碍行为已经偏离官方实现。

### 触发场景

这个 skill 适用于涉及以下内容的任务：

- canvas、WebGL 或 shader 视觉效果；
- post-processing 和动态背景；
- 滚动驱动或指针响应效果；
- 陀螺仪、摄像头或其他输入响应组件；
- creative coding 代码片段与组件库导出代码；
- 需要适配、调试或验收的第三方动画组件。

它不是通用前端 skill。普通页面维护、页面隔离和常规视觉 QA 不会单独触发；只有当这些工作属于交互组件集成的一部分时才会加载。

### 核心约束

1. **先保证官方机制一致** —— 检查权威源码和默认值，先复刻真实渲染管线，再进行视觉调优。
2. **明确记录偏差** —— 记录每个有意改动、改动原因、可见影响和验证方式。
3. **控制生产边界** —— 将组件代码、资源、选择器、实验页面和缓存行为限制在所属页面或组件范围内。
4. **覆盖性能与降级** —— 明确 DPR 上限、动画循环、resize、页面可见性、reduced motion 和 API 不可用时的 fallback。
5. **用证据完成验收** —— 统一 viewport 与状态进行比较，覆盖相关响应式和交互场景，不把未执行的检查写成通过。

### 安装

让 Codex 从本仓库的 skill 路径进行安装：

```text
使用 $skill-installer 安装以下路径中的 skill：
https://github.com/Duoasa/interactive-component-integration/tree/main/interactive-component-integration
```

Codex 也支持用户级和仓库级本地 skill。当前的扫描位置与调用方式请参考 [OpenAI 官方 skill 文档](https://learn.chatgpt.com/docs/build-skills)。

### 使用

显式调用示例：

```text
使用 $interactive-component-integration 集成这个 WebGL 背景，
保留官方渲染管线，并在真实生产页面中完成验证。
```

当任务匹配 `SKILL.md` 中的触发条件时，Codex 也可以自动加载这个 skill。

### 仓库结构

```text
interactive-component-integration/
├── README.md
└── interactive-component-integration/
    ├── SKILL.md
    └── agents/
        └── openai.yaml
```

### 验证情况

该 skill 已通过官方 `skill-creator` 结构校验，并完成两组独立前向测试：

- 检查一个默认值错误、缺少 bloom、渲染器与 DPR 漂移、用 CSS filter 假替代真实效果、且动画循环未清理的 WebGL 适配；
- 将第三方滚动驱动效果从 playground 迁移到独立生产页面，同时面对浏览器覆盖不完整的情况。

测试确认：skill 能识别渲染管线偏差，并会把未完成的验收明确标记为 `not tested` 或 `blocked`，而不是直接宣称成功。

### 来源

这套通用工作流提炼自 [Duoasa Design](https://github.com/Duoasa/Duoasa-Design) 的生产规则：

- [外部交互组件集成规范](https://github.com/Duoasa/Duoasa-Design/blob/main/docs/external-interaction-component-guidelines.md)
- [案例页面隔离规则](https://github.com/Duoasa/Duoasa-Design/blob/main/cases/README.md)
- [移动端 Hero 视觉 QA](https://github.com/Duoasa/Duoasa-Design/blob/main/design-qa.md)
