# Pray1209 UI 资产生成工作流文档 (v1.0)

## 1. 核心设计理念
我们要保留参考图的**笔触（油画厚涂）**、**光影（神圣光辉）**和**动态感（漩涡/流动）**，但将内容从“航海”替换为**“圣所/大教堂/祭坛”**。

*   **视觉关键词:** `Baroque Surrealism` (巴洛克超现实), `Divine Light` (神圣之光), `Ethereal Cathedral` (空灵大教堂), `Sacred Geometry` (神圣几何), `Liquid Gold` (液态金), `Impasto Oil` (厚涂油画).
*   **配色方案:**
    *   **背景:** 深邃虚空蓝 (#0F172A) + 星云紫.
    *   **主色:** 礼拜金 (#D4AF37) —— 用于边框、高光.
    *   **点缀:** 象牙白/发光白 —— 用于神圣光辉.

---

## 2. 工具准备
1.  **Midjourney v6:** 核心生成器。
2.  **Discord:** 用于发送指令。
3.  **Photoshop / Figma:** 用于切图和排版。
4.  **Magnific AI (可选但推荐):** 用于将背景图放大并增加油画细节纹理。

---

## 3. 生成流程详解

### 第一步：锁定风格 (Style Reference)
这是最关键的一步。请**务必**获取你发给我的那三张参考图的 URL 链接。
在所有 Prompt 的末尾，我们都要加上：
`--sref [图1链接] [图2链接] [图3链接] --sw 100 --v 6.0`
*   `--sref`: 风格参考，强制 MJ 模仿这几张图的画风。
*   `--sw 100`: 风格权重，100 为标准，如果觉得风格不够浓烈可调至 200-500。

---

### 第二步：分模块生成 (Prompts 指南)

#### 1. 沉浸式背景 (The Sanctuary Environment)
**目标:** 首页的大背景。需要体现“大教堂”的感觉，但不能是死板的建筑物，而是像参考图那样流动的、位于虚空中的精神圣殿。
**注意:** 要求中心留白，以便放置 UI 和祈祷物。

> **Prompt:**
> `Epic interior of a surreal floating cathedral in the void, baroque architectural details merging with swirling galaxies, massive divine light beam coming from above, golden incense smoke forming spirals, holy atmosphere. Heavy impasto oil painting texture, liquid gold highlights, deep midnight blue shadows. Cinematic composition, wide angle, center empty for gameplay elements --ar 16:9 --sref [你的图片链接] --v 6.0`

#### 2. 核心祈祷物 (The Clicker Target)
**目标:** 屏幕正中央的可点击物体。这是用户每天点 100 次的东西，必须非常精致、有触感。
**建议生成:** 圣杯、悬浮的十字架、发光的圣球、荆棘冠。

> **Prompt:**
> `A sacred floating [Holy Grail / Golden Cross / Crown of Thorns], hovering in the center of a dark void. Glowing with divine energy, intricate gold filigree work, encrusted with gems. Surreal oil painting style, thick brushstrokes, dramatic rim lighting. Isolated on black background --ar 1:1 --sref [你的图片链接] --v 6.0`

#### 3. UI 组件系统 (UI Kit)
**目标:** 按钮、弹窗边框、分割线。需要带有巴洛克风格的雕花，看起来像教堂的装饰。

> **Prompt:**
> `Game UI asset sheet for a fantasy RPG. Set of: ornate golden frames, gothic window borders, jewel-encrusted buttons, decorative dividers. Baroque cathedral style. Obsidian glass texture inside frames. Heavy oil painting texture. All elements isolated on black background for easy cropping. High contrast --ar 3:2 --sref [你的图片链接] --v 6.0`

#### 4. 功能图标 (Icons)
**目标:** 导航栏图标（如：背包、排行榜、DAO、市场）。

> **Prompt:**
> `UI Icon set for a religious game. Items: [an open bible book / a burning candle / a praying hand / a treasure chest]. Baroque oil painting style, golden and shiny, dramatic lighting, minimalist but painterly. Isolated on black background --ar 1:1 --sref [你的图片链接] --v 6.0`

#### 5. NFT 占位符与素材
**目标:** 盲盒状态的图，或者“木头”、“蜡烛”等素材图。

> **Prompt:**
> `A mysterious antique wooden box wrapped in golden chains, glowing from inside, floating in dark mist. Religious artifact, baroque style, oil painting texture. High detail --ar 1:1 --sref [你的图片链接] --v 6.0`

---

### 第三步：后期合成与前端应用

AI 生成的图片不能直接用（太乱、尺寸不对），必须经过以下处理：

#### 1. 背景处理 (Backgrounds)
*   **放大:** 把生成的背景图放入 Magnific AI，提示词输入 "Heavy oil painting texture, brushstrokes"，放大 2 倍。
*   **暗化:** 在 CSS 中，在背景图之上盖一层遮罩，保证文字可读性。
    ```css
    .bg-layer {
      background-image: url('your-ai-bg.jpg');
      background-size: cover;
    }
    .overlay {
      background: radial-gradient(circle, rgba(15,23,42,0.4) 0%, rgba(15,23,42,0.9) 100%);
    }
    ```

#### 2. UI 组件切片 (Slicing)
*   **抠图:** 使用 Photoshop 的“色彩范围”选择黑色背景并删除，获得透明 PNG。
*   **九宫格切图 (9-Slice Scaling):** 
    *   对于复杂的金色边框，不要直接拉伸（会变形）。
    *   在 CSS 中使用 `border-image` 技术，或者把边框拆分为：左上角、右上角、左下角、右下角、上边、下边、左边、右边，共8张小图拼接。

#### 3. 动态效果 (VFX)
为了让静态的油画动起来（像你参考图里的漩涡感）：
*   **粒子特效:** 使用 `react-tsparticles`，生成金色的微小粒子，模拟教堂里的尘埃。
*   **呼吸光:** 给核心祈祷物（如十字架）添加 CSS `drop-shadow` 动画，模拟呼吸频率。
    ```css
    @keyframes holy-glow {
      0% { filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.5)); }
      50% { filter: drop-shadow(0 0 25px rgba(212, 175, 55, 0.9)); }
      100% { filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.5)); }
    }
    ```

---

## 4. 关键提示词库 (Prompt Bank)

在微调生成结果时，可以组合使用这些词：

*   **材质:** `Obsidian` (黑曜石), `Polished Gold` (抛光金), `Velvet` (天鹅绒), `Parhment` (羊皮纸).
*   **光效:** `Volumetric Lighting` (体积光/丁达尔效应), `God Rays` (耶稣光), `Bioluminescence` (生物荧光 - 用于表现神迹).
*   **构图:** `Symmetrical` (对称 - 适合教堂), `Macro Shot` (微距 - 适合图标).
*   **氛围:** `Solemn` (庄严), `Meditative` (冥想), `Apocalyptic` (启示录风格).