(function () {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();

  // ---------- Chart 1: 任务工时 ----------
  var hoursEl = document.getElementById('chart-hours');
  if (hoursEl) {
    // yAxis 类目自下而上，故按倒序写入，使 T0 位于顶部
    var rows = [
      { id: 'T10', name: 'T10 合规材料', h: 2, phase: 'polish' },
      { id: 'T9', name: 'T9 本地榜与成绩图', h: 1.5, phase: 'polish' },
      { id: 'T8', name: 'T8 部署上线', h: 1.5, phase: 'polish' },
      { id: 'T7', name: 'T7 质感与存档', h: 7, phase: 'polish' },
      { id: 'T6', name: 'T6 视觉语言', h: 5, phase: 'polish' },
      { id: 'T5', name: 'T5 四关设计', h: 10, phase: 'core' },
      { id: 'T4', name: 'T4 扩到三省', h: 4, phase: 'core' },
      { id: 'T3', name: 'T3 真实地形', h: 6, phase: 'core' },
      { id: 'T2', name: 'T2 操作与相机', h: 4, phase: 'core' },
      { id: 'T1b', name: 'T1b 埋点四事件', h: 1, phase: 'core' },
      { id: 'T1', name: 'T1 最小可玩核心', h: 15, phase: 'core' },
      { id: 'T0', name: 'T0 一页规则', h: 2, phase: 'prep' }
    ];

    var colorMap = { prep: muted, core: accent, polish: accent2 };

    var chart = echarts.init(hoursEl, null, { renderer: 'svg' });
    chart.setOption({
      animation: false,
      tooltip: {
        appendToBody: true,
        confine: true,
        trigger: 'item',
        formatter: function (p) { return p.name + '：' + p.value + ' 小时'; }
      },
      grid: { left: 8, right: 46, top: 10, bottom: 30, containLabel: true },
      xAxis: {
        type: 'value',
        name: '小时',
        nameTextStyle: { color: muted, fontSize: 11 },
        max: 16,
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
          type: 'bar',
          barWidth: '52%',
          data: rows.map(function (r) {
            return {
              value: r.h,
              itemStyle: { color: colorMap[r.phase] }
            };
          }),
          label: {
            show: true,
            position: 'right',
            color: muted,
            fontSize: 10.5,
            formatter: '{c}h'
          }
        }
      ]
    });
    window.addEventListener('resize', function () { chart.resize(); });
  }

  // ---------- Chart 2: 15 个工作日排期 ----------
  var ganttEl = document.getElementById('chart-gantt');
  if (ganttEl) {
    var tasks = [
      { name: '缓冲（16 小时）', start: 11.8, dur: 3.2, phase: 'buffer' },
      { name: 'T10 合规材料', start: 11.4, dur: 0.4, phase: 'polish' },
      { name: 'T9 本地榜与成绩图', start: 11.1, dur: 0.3, phase: 'polish' },
      { name: 'T8 部署上线', start: 10.8, dur: 0.3, phase: 'polish' },
      { name: 'T7 质感与存档', start: 9.4, dur: 1.4, phase: 'polish' },
      { name: 'T6 视觉语言', start: 8.4, dur: 1, phase: 'polish' },
      { name: 'T5 四关设计', start: 6.4, dur: 2, phase: 'core' },
      { name: 'T4 扩到三省', start: 5.6, dur: 0.8, phase: 'core' },
      { name: 'T3 真实地形', start: 4.4, dur: 1.2, phase: 'core' },
      { name: 'T2 操作与相机', start: 3.6, dur: 0.8, phase: 'core' },
      { name: 'T1b 埋点四事件', start: 3.4, dur: 0.2, phase: 'core' },
      { name: 'T1 最小可玩核心', start: 0.4, dur: 3, phase: 'core' },
      { name: 'T0 一页规则', start: 0, dur: 0.4, phase: 'prep' }
    ];
    var cMap = { prep: muted, core: accent, polish: accent2, buffer: rule };

    var gantt = echarts.init(ganttEl, null, { renderer: 'svg' });
    gantt.setOption({
      animation: false,
      tooltip: {
        appendToBody: true,
        confine: true,
        trigger: 'item',
        formatter: function (p) {
          var t = tasks[p.dataIndex];
          var h = (t.dur * 5).toFixed(1).replace('.0', '');
          return t.name + '<br/>D' + (t.start + 1) + ' 起，约 ' + h + ' 小时（每天 5 小时）';
        }
      },
      grid: { left: 8, right: 20, top: 26, bottom: 44, containLabel: true },
      xAxis: {
        type: 'value',
        min: 0,
        max: 15,
        interval: 1,
        name: '工作日',
        nameLocation: 'middle',
        nameGap: 26,
        nameTextStyle: { color: muted, fontSize: 11 },
        axisLine: { lineStyle: { color: rule } },
        axisTick: { show: false },
        axisLabel: { color: muted, fontSize: 10.5 },
        splitLine: { lineStyle: { color: rule, type: 'dashed' } }
      },
      yAxis: {
        type: 'category',
        data: tasks.map(function (t) { return t.name; }),
        axisLine: { lineStyle: { color: rule } },
        axisTick: { show: false },
        axisLabel: { color: ink, fontSize: 11.5 }
      },
      series: [
        {
          name: '偏移',
          type: 'bar',
          stack: 'g',
          barWidth: '50%',
          silent: true,
          itemStyle: { color: 'transparent' },
          emphasis: { itemStyle: { color: 'transparent' } },
          data: tasks.map(function (t) { return t.start; })
        },
        {
          name: '工期',
          type: 'bar',
          stack: 'g',
          barWidth: '50%',
          data: tasks.map(function (t) {
            return { value: t.dur, itemStyle: { color: cMap[t.phase] } };
          }),
          itemStyle: { borderColor: bg2, borderWidth: 1 },
          markLine: {
            silent: true,
            symbol: 'none',
            lineStyle: { color: accent, type: 'dashed', width: 1 },
            label: {
              position: 'insideEndTop',
              color: accent,
              fontSize: 10,
              formatter: '{b}'
            },
            data: [
              { xAxis: 4, name: 'D4 核心可玩' },
              { xAxis: 9, name: 'D9 四关齐' },
              { xAxis: 13, name: 'D13 上线' }
            ]
          }
        }
      ]
    });
    window.addEventListener('resize', function () { gantt.resize(); });
  }
})();
