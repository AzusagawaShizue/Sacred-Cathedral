# Pray1209 UI 设计规范与资产指南

## 1. 核心设计理念 (Core Design Philosophy)

### 1.1 视觉叙事
我们要保留参考图的 **笔触（油画厚涂）**、**光影（神圣光辉）** 和 **动态感（漩涡/流动）**，但将内容从“航海”替换为 **“圣所/大教堂/祭坛”**。

*   **视觉关键词**: `Baroque Surrealism` (巴洛克超现实), `Divine Light` (神圣之光), `Ethereal Cathedral` (空灵大教堂), `Sacred Geometry` (神圣几何), `Liquid Gold` (液态金), `Impasto Oil` (厚涂油画).
*   **推荐风格方向**: **混合风格 (Hybrid Approach)**
    *   以 **"Deep Void" (深邃虚空)** 为基础氛围，营造沉浸式暗黑背景。
    *   结合 **"Baroque Oil" (巴洛克油画)** 的质感，用于核心交互元素（如圣物、按钮、边框），保留厚涂笔触和材质感。

### 1.2 配色方案概览
*   **背景**: 深邃虚空蓝 (#0F172A) + 星云紫.
*   **主色**: 礼拜金 (#D4AF37) —— 用于边框、高光.
*   **点缀**: 象牙白/发光白 —— 用于神圣光辉.

---

## 2. 视觉风格指南 (Visual Style Guide)

### 2.1 色彩系统 (Color System)

#### 核心色板 (Primary Palette)
| 名称 | Hex | CSS变量 | 用途 |
|------|-----|----------|-------|
| **Midnight Void (深邃虚空)** | `#0F172A` | `--color-void` | 主背景，深层阴影 |
| **Cathedral Blue (大教堂蓝)** | `#1E2A5A` | `--color-cathedral` | 次级背景，标题栏 |
| **Liturgical Gold (礼拜金)** | `#D4AF37` | `--color-gold` | 主要操作，边框，高光 |
| **Soft Gold (柔光金)** | `#EEDCB3` | `--color-gold-soft` | 次级文本，细微边框 |
| **Ivory Light (象牙白)** | `#FAF7F0` | `--color-ivory` | 亮色背景，高对比文本 |

#### 功能色板 (Functional Colors)
| 名称 | Hex | CSS变量 | 用途 |
|------|-----|----------|-------|
| **Legendary Red (传说红)** | `#E84C4C` | `--color-legendary` | 传说级物品光效/徽章 |
| **Rare Purple (稀有紫)** | `#6A5BFF` | `--color-rare` | 稀有级物品光效/徽章 |
| **Common Silver (普通银)** | `#E0DFDA` | `--color-common` | 普通物品 |
| **Error Crimson (错误红)** | `#D4183D` | `--destructive` | 错误状态，破坏性操作 |

### 2.2 排版系统 (Typography)

#### 标题 (Serif / Display)
*   **字体族**: `Cinzel`, serif.
*   **字重**: 400 (Regular), 700 (Bold).
*   **用途**: 页面标题，弹窗头部，重要统计数字。

#### 正文 (Sans-Serif)
*   **字体族**: `Inter`, sans-serif.
*   **字重**: 400 (Regular), 500 (Medium).
*   **用途**: 说明文字，UI 标签，按钮文本。

### 2.3 间距与布局 (Spacing & Layout)
*   **基准单位**: `4px` (0.25rem).
*   **圆角 (Border Radius)**:
    *   `sm`: `4px`
    *   `md`: `8px`
    *   `lg`: `16px` (卡片)
    *   `xl`: `24px` (弹窗)
    *   `full`: `9999px` (按钮, 胶囊状元素)

### 2.4 UI 特效 (UI Effects)

#### 神圣玻璃拟态 (Glassmorphism)
```css
.glass-sacred {
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(212, 175, 55, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}
```

#### 金色光辉 (Golden Glow)
```css
.glow-gold {
  box-shadow: 0 0 15px rgba(212, 175, 55, 0.4);
}
```

---

## 3. UI 组件库规范 (Component Library Specs)

### 3.1 按钮 (Buttons)

#### 主按钮 (Primary - Gold)
*   **背景**: 线性渐变 (`#D4AF37` 到 `#C5A028`)
*   **文字**: `#0F172A` (Midnight Blue) - **Bold**
*   **边框**: 无 或 1px 实线 `#FAF7F0` (内圈)
*   **悬停 (Hover)**: 亮度 110%, 阴影 `0 0 15px rgba(212, 175, 55, 0.6)`
*   **点击 (Active)**: 缩放 0.98

#### 次级按钮 (Secondary - Glass)
*   **背景**: `rgba(255, 255, 255, 0.1)`
*   **文字**: `#EEDCB3` (Soft Gold)
*   **边框**: 1px 实线 `#EEDCB3`
*   **悬停 (Hover)**: 背景 `rgba(255, 255, 255, 0.2)`

### 3.2 卡片 (Cards) - 圣物容器
*   **背景**: 深色玻璃 (`.glass-sacred`)
*   **边框**: 1px 实线渐变 (金色到透明)
*   **内边距**: `24px` (6 units)
*   **圆角**: `16px`

### 3.3 弹窗 (Modals)
*   **遮罩**: 黑色 80% 透明度, 背景模糊 4px.
*   **内容区**:
    *   背景: 深邃虚空蓝，叠加“大理石”或“噪点”纹理。
    *   边框: 双重金色边框 (巴洛克风格)。
    *   动画: 缩放进入 + 淡入 (Scale In + Fade In).

### 3.4 输入框 (Inputs)
*   **背景**: `rgba(0, 0, 0, 0.3)`
*   **文字**: `#FAF7F0`
*   **边框**: 底部边框 2px `#717182` (Muted), 聚焦时变为 `#D4AF37` (Gold).
*   **占位符**: `#717182`

---

## 4. 资产生成工作流 (Asset Generation Workflow)

### 4.1 工具准备
1.  **Midjourney v6:** 核心生成器。
2.  **Discord:** 发送指令。
3.  **Photoshop / Figma:** 切图和排版。
4.  **Magnific AI:** (可选) 背景放大与纹理增强。

### 4.2 核心提示词 (Prompt Bank)
在所有 Prompt 末尾加上：`--sref [参考图链接] --sw 100 --v 6.0`

#### 场景：沉浸式背景 (The Sanctuary Environment)
> `Epic interior of a surreal floating cathedral in the void, baroque architectural details merging with swirling galaxies, massive divine light beam coming from above, golden incense smoke forming spirals, holy atmosphere. Heavy impasto oil painting texture, liquid gold highlights, deep midnight blue shadows. Cinematic composition, wide angle, center empty for gameplay elements --ar 16:9`

#### 核心：祈祷目标 (The Clicker Target)
> `A sacred floating [Holy Grail / Golden Cross / Crown of Thorns], hovering in the center of a dark void. Glowing with divine energy, intricate gold filigree work, encrusted with gems. Surreal oil painting style, thick brushstrokes, dramatic rim lighting. Isolated on black background --ar 1:1`

#### UI 组件素材
> `Game UI asset sheet for a fantasy RPG. Set of: ornate golden frames, gothic window borders, jewel-encrusted buttons, decorative dividers. Baroque cathedral style. Obsidian glass texture inside frames. Heavy oil painting texture. All elements isolated on black background for easy cropping. High contrast --ar 3:2`

### 4.3 后期处理
1.  **背景处理**: 使用 Magnific AI 放大并增加油画纹理；CSS 中添加暗色遮罩层以保证文字可读性。
2.  **UI 切图**: 使用 PS 去除黑色背景，对复杂边框使用九宫格 (9-Slice) 切图技术。
3.  **动态效果**: 使用 `react-tsparticles` 增加金色尘埃粒子；对核心圣物添加 CSS `drop-shadow` 呼吸动画。

---

## 5. 设计审计报告 (Design Audit Report)

### 5.1 现状分析
*   **代码库**: React + Vite + Tailwind CSS.
*   **样式**: 混合使用了 Tailwind 类、`globals.css` 变量和内联样式。
*   **主题**: 基础的亮/暗模式已存在，但特定的“圣所”主题尚未完全统一。

### 5.2 已知问题与优化建议
1.  **色彩一致性**:
    *   *问题*: 存在硬编码的 Hex 颜色值。
    *   *建议*: 迁移至 Tailwind 配置和 CSS 变量 (已在进行中)。
2.  **排版**:
    *   *问题*: 缺少 `Cinzel` 和 `Uncial Antiqua` 字体。
    *   *建议*: 引入 Google Fonts 并配置 Tailwind。
3.  **组件复用性**:
    *   *问题*: 玻璃卡片等样式在 `Home.tsx` 中是内联编写的。
    *   *建议*: 提取为通用组件 (SacredCard, SacredButton)。
