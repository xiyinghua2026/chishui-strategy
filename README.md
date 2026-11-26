# 四渡赤水 · 个人开发者游戏方案

一款以 1935 年 1–3 月四渡赤水为题材的回合制战术小游戏，单人开发，15 个工作日 × 每天 5 小时。

本仓库是策划阶段的全部产出：玩法主方案、逐日任务清单、三张策划用地图、T0 规则与四张关卡分幅稿。

## 页面索引

| 文档 | 内容 |
|---|---|
| [chishui-v3.html](./chishui-v3.html) | 主方案 v3.0：玩法、四关结构、工时与降级口径 |
| [chishui-taskplan.html](./chishui-taskplan.html) | 任务清单：15 天逐日排期、任务卡、里程碑 |
| [chishui-route-map.html](./chishui-route-map.html) | 长征总图：于都 → 吴起，点击下钻到四渡赤水 |
| [chishui-campaign-map.html](./chishui-campaign-map.html) | 四渡赤水作战图：四段路线、箭头方向、渡口放大 |
| [chishui-t0-rules.html](./chishui-t0-rules.html) | T0 规则：四关参数、回合与胜负判定 |
| [chishui-levels.html](./chishui-levels.html) | 关卡分幅：四关设计稿 v2，同一底图四个方框 |

早期文档（15 天排期推演、Agent 影响评估、单人方案）保留在仓库根目录。

## 阅读方式

页面为单文件 HTML，图表依赖本地 `_shared/` 与 `assets/`，可直接双击打开，也可起本地服务：

```bash
python3 -m http.server 8899
```

然后访问 `http://127.0.0.1:8899/chishui-v3.html`。

## 口径声明

- 本仓库为**策划用**产出，非正式美术稿，非交付版本。
- 地图底图取自公开地理数据集（DataV.GeoAtlas），**未经审图，不得用于对外发布**。对外素材须使用自然资源部标准地图服务发布的标准地图；游戏内建议只画河、渡口、山地与路线，不画行政边界。
- T0 四关参数（追兵 3 / 4 / 5 / 6 支，回合上限 8 / 9 / 10 / 12，棋盘 8 / 10 / 12 / 14 格）为锁定口径，后续改动须重新评估关卡平衡。
