(function () {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();

  // ---------- Chart 1: 三条路线五维评估 ----------
  var radarEl = document.getElementById('chart-radar');
  if (radarEl) {
    var radar = echarts.init(radarEl, null, { renderer: 'svg' });
    radar.setOption({
      animation: false,
      color: [accent, accent2, muted],
      tooltip: { appendToBody: true, confine: true },
      legend: {
        bottom: 0,
        itemWidth: 14,
        itemHeight: 8,
        textStyle: { color: ink, fontSize: 12 }
      },
      radar: {
        center: ['50%', '46%'],
        radius: '62%',
        indicator: [
          { name: '玩法深度', max: 5 },
          { name: '情感冲击', max: 5 },
          { name: '合规安全', max: 5 },
          { name: '变现能力', max: 5 },
          { name: '易落地', max: 5 }
        ],
        axisName: { color: muted, fontSize: 12 },
        splitLine: { lineStyle: { color: rule } },
        axisLine: { lineStyle: { color: rule } },
        splitArea: { show: false }
      },
      series: [{
        type: 'radar',
        symbolSize: 4,
        data: [
          { value: [2, 5, 3, 2, 5], name: 'A · 叙事 AVG', lineStyle: { width: 2 }, areaStyle: { opacity: 0.06 } },
          { value: [5, 4, 4, 4, 2], name: 'B · 战术策略', lineStyle: { width: 2.5 }, areaStyle: { opacity: 0.12 } },
          { value: [2, 3, 5, 5, 5], name: 'C · 轻量互动 H5', lineStyle: { width: 2 }, areaStyle: { opacity: 0.06 } }
        ]
      }]
    });
    window.addEventListener('resize', function () { radar.resize(); });
  }

  // ---------- Chart 2: 两档方案分阶段投入 ----------
  var costEl = document.getElementById('chart-cost');
  if (costEl) {
    var cost = echarts.init(costEl, null, { renderer: 'svg' });
    cost.setOption({
      animation: false,
      color: [accent2, accent],
      tooltip: {
        appendToBody: true,
        confine: true,
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        valueFormatter: function (v) { return v + ' 万元'; }
      },
      legend: {
        bottom: 0,
        itemWidth: 14,
        itemHeight: 8,
        textStyle: { color: ink, fontSize: 12 }
      },
      grid: { left: 12, right: 20, top: 20, bottom: 56, containLabel: true },
      xAxis: {
        type: 'category',
        data: ['概念验证', '垂直切片', '量产', '上线与长线'],
        axisLine: { lineStyle: { color: rule } },
        axisTick: { show: false },
        axisLabel: { color: muted, fontSize: 12 }
      },
      yAxis: {
        type: 'value',
        name: '万元',
        nameTextStyle: { color: muted, fontSize: 11 },
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { color: muted, fontSize: 11 },
        splitLine: { lineStyle: { color: rule, type: 'dashed' } }
      },
      series: [
        {
          name: '精益版（8–12 人 / 18 个月）',
          type: 'bar',
          barGap: '18%',
          barWidth: '30%',
          data: [80, 260, 550, 125]
        },
        {
          name: '标准版（20–25 人 / 30 个月）',
          type: 'bar',
          barWidth: '30%',
          data: [125, 475, 2100, 375],
          label: {
            show: true,
            position: 'top',
            color: muted,
            fontSize: 10,
            formatter: function (p) { return p.value >= 1000 ? (p.value / 10000).toFixed(2) + ' 亿' : p.value; }
          }
        }
      ]
    });
    window.addEventListener('resize', function () { cost.resize(); });
  }
})();
