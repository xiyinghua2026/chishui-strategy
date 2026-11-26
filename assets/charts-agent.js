(function () {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();

  // ---------- Chart 1: 工作包人月构成 ----------
  var wbsEl = document.getElementById('chart-wbs');
  if (wbsEl) {
    // 顺序从下到上，最大的在最上
    var rows = [
      { name: '音频', agent: 0.09, human: 0.21 },
      { name: '合规 / 顾问 / 法务', agent: 0.05, human: 0.45 },
      { name: '项目管理', agent: 0.105, human: 0.595 },
      { name: 'UI / UX', agent: 0.44, human: 0.36 },
      { name: '商店页与宣发', agent: 0.315, human: 0.585 },
      { name: '测试与平衡', agent: 0.40, human: 0.60 },
      { name: '史实研究与大纲', agent: 0.40, human: 0.60 },
      { name: '美术（外包把控）', agent: 0.30, human: 0.90 },
      { name: '系统与数值设计', agent: 0.825, human: 0.675 },
      { name: '叙事写作', agent: 0.50, human: 1.50 },
      { name: '代码实现', agent: 2.10, human: 0.90 }
    ];

    var chart = echarts.init(wbsEl, null, { renderer: 'svg' });
    chart.setOption({
      animation: false,
      color: [accent2, accent],
      tooltip: {
        appendToBody: true,
        confine: true,
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        valueFormatter: function (v) { return v + ' 人月'; }
      },
      legend: {
        bottom: 0, itemWidth: 14, itemHeight: 8,
        textStyle: { color: ink, fontSize: 12 }
      },
      grid: { left: 8, right: 26, top: 16, bottom: 56, containLabel: true },
      xAxis: {
        type: 'value',
        name: '人月',
        nameTextStyle: { color: muted, fontSize: 11 },
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { color: muted, fontSize: 11 },
        splitLine: { lineStyle: { color: rule, type: 'dashed' } }
      },
      yAxis: {
        type: 'category',
        data: rows.map(function (r) { return r.name; }),
        axisLine: { lineStyle: { color: rule } },
        axisTick: { show: false },
        axisLabel: { color: ink, fontSize: 12 }
      },
      series: [
        {
          name: 'Agent 可吸收',
          type: 'bar',
          stack: 'total',
          barWidth: '54%',
          data: rows.map(function (r) { return +r.agent.toFixed(2); }),
          itemStyle: { borderColor: '#FFFDF8', borderWidth: 1 }
        },
        {
          name: '必须由人完成',
          type: 'bar',
          stack: 'total',
          barWidth: '54%',
          data: rows.map(function (r) { return +r.human.toFixed(2); }),
          itemStyle: { borderColor: '#FFFDF8', borderWidth: 1 },
          label: {
            show: true,
            position: 'right',
            color: muted,
            fontSize: 10,
            formatter: function (p) {
              var r = rows[p.dataIndex];
              return (r.agent + r.human).toFixed(2);
            }
          }
        }
      ]
    });
    window.addEventListener('resize', function () { chart.resize(); });
  }

  // ---------- Chart 2: 成本结构对比 ----------
  var costEl = document.getElementById('chart-cost');
  if (costEl) {
    var chart2 = echarts.init(costEl, null, { renderer: 'svg' });
    chart2.setOption({
      animation: false,
      color: [muted, accent],
      tooltip: {
        appendToBody: true,
        confine: true,
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        valueFormatter: function (v) { return v + ' 万元'; }
      },
      legend: {
        bottom: 0, itemWidth: 14, itemHeight: 8,
        textStyle: { color: ink, fontSize: 12 }
      },
      grid: { left: 12, right: 26, top: 30, bottom: 64, containLabel: true },
      xAxis: {
        type: 'category',
        data: ['现金支出', '时间成本', '真实总成本'],
        axisLine: { lineStyle: { color: rule } },
        axisTick: { show: false },
        axisLabel: { color: ink, fontSize: 12 }
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
          name: '无 Agent',
          type: 'bar',
          barGap: '20%',
          barWidth: '28%',
          data: [12.3, 15.0, 27.3],
          label: { show: true, position: 'top', color: muted, fontSize: 11, formatter: '{c}' }
        },
        {
          name: '有 Agent',
          type: 'bar',
          barWidth: '28%',
          data: [10.2, 10.5, 20.7],
          label: { show: true, position: 'top', color: accent, fontSize: 11, formatter: '{c}' }
        }
      ]
    });
    window.addEventListener('resize', function () { chart2.resize(); });
  }
})();
