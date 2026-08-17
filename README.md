# Interactive Component Integration

[English](#english) · [中文](#中文)

> Public agent skill for production-grade interactive frontend integration. Compatible with Codex and DeepSeek Harness (DSH). Free for anyone to use, modify, and redistribute under the MIT License.

## English

`interactive-component-integration` helps agents integrate third-party interactive and animated frontend components without silently changing how they actually render.

It targets a common failure mode: an adaptation looks approximately right, but its defaults, renderer setup, color pipeline, alpha behavior, DPR policy, post-processing chain, lifecycle, or accessibility contract have already drifted from the authoritative implementation.

### When it activates

Use this skill when a task involves:

- canvas, WebGL, or shader-based visuals;
- post-processing or animated backgrounds;
- scroll-driven or pointer-reactive effects;
- sensor-, webcam-, or other input-reactive components;
- creative-coding snippets or component-gallery exports;
- third-party animation components that must be integrated, adapted, debugged, or verified.

The name and trigger scope are intentionally aligned. This is not a general frontend skill: ordinary page maintenance, page isolation, and visual QA do not trigger it unless they are part of an interactive-component integration.

### What it enforces

1. **Source fidelity first** — inspect the authoritative source, preserve defaults, and reproduce the real rendering pipeline before visual tuning.
2. **Explicit deviations** — record every intentional difference, its reason, visible impact, and verification method.
3. **Production boundaries** — contain component code, assets, selectors, experiments, and cache behavior within the owning surface.
4. **Performance and fallback behavior** — bound DPR, animation loops, resize work, visibility handling, reduced motion, and API failure paths.
5. **Evidence-based QA** — compare normalized viewport states, test relevant widths and interactions, and never report untested behavior as passed.

### Install with Codex

Ask Codex to install the standalone skill directory:

```text
Use $skill-installer to install the skill from:
https://github.com/Duoasa/interactive-component-integration/tree/main/resources/skills/interactive-component-integration
```

Codex can also discover skills from supported user- and repository-level skill directories. See the [official OpenAI skill documentation](https://learn.chatgpt.com/docs/build-skills) for current locations and invocation behavior.

### Install with DSH

The repository is also a native DSH bundle. Install it directly from GitHub into a profile:

```sh
dsh plugin --profile web add github:Duoasa/interactive-component-integration
```

Then start DSH with that profile as usual:

```sh
dsh --profile web
```

No marketplace listing or build permission is required. The package ships plain JavaScript, declares its bundle layer through `dsh.bundle.patch`, and registers the same canonical skill at runtime through `ctx.skills.register`.

For supply-chain-sensitive environments, pin a reviewed commit:

```sh
dsh plugin --profile web add github:Duoasa/interactive-component-integration#<commit>
```

See the [DeepSeek Harness repository](https://github.com/deepseek-ai/deepseek-harness) for current DSH installation and plugin documentation.

### Use

Invoke the skill explicitly:

```text
Use $interactive-component-integration to integrate this WebGL background,
preserve the source rendering contract, and verify it in the production page.
```

An agent may also activate it automatically when the task matches the trigger description in `SKILL.md`.

### One source, two distribution paths

```text
interactive-component-integration/
├── package.json                 # DSH bundle manifest
├── cordis.patch.yml             # DSH activation layer
├── index.js                     # DSH runtime registration
├── LICENSE
├── README.md
└── resources/
    └── skills/
        └── interactive-component-integration/
            ├── SKILL.md         # canonical skill instructions
            └── agents/
                └── openai.yaml
```

Codex installs the canonical skill directory. DSH installs the whole GitHub repository as a bundle and registers that exact same `SKILL.md`. There is no duplicated instruction body to drift between platforms.

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

### License

MIT. Anyone may use, copy, modify, publish, and redistribute this skill subject to the license terms.

---

## 中文

`interactive-component-integration` 是一个公开、可复用的 agent skill，用于把第三方交互与动画组件可靠地集成到前端项目中，并避免适配过程悄悄改变其真实渲染机制。

它解决的典型问题是：页面“看起来差不多”，但组件的默认参数、渲染器配置、色彩管线、透明度与混合、DPR、后处理链、生命周期或无障碍行为已经偏离权威实现。

本 skill 同时兼容 Codex 与 DeepSeek Harness（DSH），并以 MIT 许可证公开发布，任何人都可以使用、修改与再分发。

### 触发场景

这个 skill 适用于涉及以下内容的任务：

- canvas、WebGL 或 shader 视觉效果；
- post-processing 或动态背景；
- 滚动驱动或指针响应效果；
- 陀螺仪、摄像头或其他输入响应组件；
- creative coding 代码片段或组件库导出代码；
- 需要集成、适配、调试或验收的第三方动画组件。

名称与触发范围刻意保持一致。它不是通用前端 skill：普通页面维护、页面隔离和常规视觉 QA 不会单独触发，只有当这些工作属于交互组件集成的一部分时才会加载。

### 核心约束

1. **先保证官方机制一致** —— 检查权威源码和默认值，先复刻真实渲染管线，再进行视觉调优。
2. **明确记录偏差** —— 记录每个有意改动、改动原因、可见影响和验证方式。
3. **控制生产边界** —— 将组件代码、资源、选择器、实验页面和缓存行为限制在所属页面或组件范围内。
4. **覆盖性能与降级** —— 明确 DPR 上限、动画循环、resize、页面可见性、reduced motion 和 API 不可用时的 fallback。
5. **用证据完成验收** —— 统一 viewport 与状态进行比较，覆盖相关响应式和交互场景，不把未执行的检查写成通过。

### 在 Codex 中安装

让 Codex 安装仓库中的独立 skill 目录：

```text
使用 $skill-installer 安装以下路径中的 skill：
https://github.com/Duoasa/interactive-component-integration/tree/main/resources/skills/interactive-component-integration
```

Codex 也支持从用户级和仓库级目录发现 skill。当前扫描位置与调用方式请参考 [OpenAI 官方 skill 文档](https://learn.chatgpt.com/docs/build-skills)。

### 在 DSH 中安装

本仓库同时是一个原生 DSH bundle。按照示例，直接用一条命令从 GitHub 安装到 profile：

```sh
dsh plugin --profile web add github:Duoasa/interactive-component-integration
```

然后照常启动该 profile：

```sh
dsh --profile web
```

不需要进入任何市场，也不需要允许安装时构建脚本。仓库直接提交可运行的 JavaScript，通过 `dsh.bundle.patch` 声明配置层，并使用 `ctx.skills.register` 在运行时注册同一份 canonical skill。

对供应链安全要求较高时，可以固定到已审核的 commit：

```sh
dsh plugin --profile web add github:Duoasa/interactive-component-integration#<commit>
```

当前 DSH 的安装和插件机制请参考 [DeepSeek Harness 官方仓库](https://github.com/deepseek-ai/deepseek-harness)。

### 使用

显式调用示例：

```text
使用 $interactive-component-integration 集成这个 WebGL 背景，
保留官方渲染管线，并在真实生产页面中完成验证。
```

当任务匹配 `SKILL.md` 中的触发条件时，agent 也可以自动加载这个 skill。

### 一份内容，两种分发路径

```text
interactive-component-integration/
├── package.json                 # DSH bundle manifest
├── cordis.patch.yml             # DSH 激活层
├── index.js                     # DSH 运行时注册
├── LICENSE
├── README.md
└── resources/
    └── skills/
        └── interactive-component-integration/
            ├── SKILL.md         # 唯一的 skill 指令源
            └── agents/
                └── openai.yaml
```

Codex 安装 canonical skill 目录；DSH 把整个 GitHub 仓库作为 bundle 安装，并注册完全相同的 `SKILL.md`。两套平台之间没有重复的指令正文，因此不会产生版本漂移。

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

### 许可证

MIT。任何人都可以在遵守许可证条款的前提下使用、复制、修改、发布与再分发本 skill。
