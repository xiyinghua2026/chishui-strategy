(function () {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();

  // ---------- Chart 1: 累计现金流 ----------
  var cashEl = document.getElementById('chart-cash');
  if (cashEl) {
    // 每月支出（万元）
    var spend = [1.0, 1.0, 1.1, 1.1, 1.1, 1.1, 1.2, 1.2, 1.2, 1.3];
    var costCum = [];
    var acc = 0;
    for (var i = 0; i < 30; i++) {
      if (i < spend.length) { acc += spend[i]; }
      costCum.push(acc);
    }

    // 累计收入比例（M11 发售起）
    var revShare = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0.22, 0.38, 0.49, 0.57, 0.63, 0.68, 0.72, 0.76, 0.79, 0.82,
      0.84, 0.86, 0.88, 0.89, 0.90, 0.91, 0.92, 0.93, 0.94, 0.95];

    var NET_PER_UNIT = 48 * 0.7 / 10000; // 万元/份
    var scenarios = [
      { name: '保守 3,000 份', units: 3000, color: muted },
      { name: '中性 25,000 份', units: 25000, color: accent },
      { name: '乐观 60,000 份', units: 60000, color: accent2 }
    ];

    var months = [];
    for (var m = 1; m <= 30; m++) { months.push('M' + m); }

    var series = scenarios.map(function (s) {
      return {
        name: s.name,
        type: 'line',
        smooth: true,
        symbol: 'none',
        lineStyle: { width: s.name.indexOf('中性') >= 0 ? 2.6 : 1.8, color: s.color },
        itemStyle: { color: s.color },
        data: revShare.map(function (r, idx) {
          return +(r * s.units * NET_PER_UNIT - costCum[idx]).toFixed(2);
        })
      };
    });

    var cash = echarts.init(cashEl, null, { renderer: 'svg' });
    cash.setOption({
      animation: false,
      color: [muted, accent, accent2],
      tooltip: {
        appendToBody: true,
        confine: true,
        trigger: 'axis',
        valueFormatter: function (v) { return v + ' 万元'; }
      },
      legend: {
        bottom: 0, itemWidth: 14, itemHeight: 8,
        textStyle: { color: ink, fontSize: 12 }
      },
      grid: { left: 12, right: 24, top: 24, bottom: 58, containLabel: true },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: months,
        axisLine: { lineStyle: { color: rule } },
        axisTick: { show: false },
        axisLabel: { color: muted, fontSize: 10, interval: 2 }
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
      series: series.concat([{
        type: 'line',
        data: [],
        markLine: {
          silent: true,
          symbol: 'none',
          lineStyle: { color: accent, type: 'dashed', width: 1 },
          label: {
            formatter: '成本线 −' + costCum[9].toFixed(1) + ' 万',
            color: accent, fontSize: 10, position: 'insideStartTop'
          },
          data: [{ yAxis: -costCum[9] }]
        }
      }, {
        type: 'line',
        data: [],
        markLine: {
          silent: true,
          symbol: 'none',
          lineStyle: { color: rule, width: 1 },
          label: { formatter: '发售', color: muted, fontSize: 10, position: 'insideEndTop' },
          data: [{ xAxis: 'M11' }]
        }
      }])
    });
    window.addEventListener('resize', function () { cash.resize(); });
  }

  // ---------- Chart 2: 销量敏感性 ----------
  var sensEl = document.getElementById('chart-sens');
  if (sensEl) {
    var units = [3000, 5000, 10000, 20000, 35000, 60000];
    var netPerUnit = 48 * 0.7 / 10000; // 万元/份
    var values = units.map(function (u) { return +(u * netPerUnit).toFixed(1); });

    var sens = echarts.init(sensEl, null, { renderer: 'svg' });
    sens.setOption({
      animation: false,
      tooltip: {
        appendToBody: true,
        confine: true,
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        valueFormatter: function (v) { return v + ' 万元'; }
      },
      grid: { left: 12, right: 30, top: 30, bottom: 40, containLabel: true },
      xAxis: {
        type: 'category',
        data: units.map(function (u) { return (u / 1000) + 'k'; }),
        name: '销量（份）',
        nameLocation: 'middle',
        nameGap: 30,
        nameTextStyle: { color: muted, fontSize: 11 },
        axisLine: { lineStyle: { color: rule } },
        axisTick: { show: false },
        axisLabel: { color: muted, fontSize: 11 }
      },
      yAxis: {
        type: 'value',
        name: '净收入（万元）',
        nameTextStyle: { color: muted, fontSize: 11 },
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { color: muted, fontSize: 11 },
        splitLine: { lineStyle: { color: rule, type: 'dashed' } }
      },
      series: [{
        type: 'bar',
        barWidth: '46%',
        data: values.map(function (v) {
          return {
            value: v,
            itemStyle: { color: v >= 11.3 ? accent2 : accent }
          };
        }),
        label: {
          show: true, position: 'top', color: ink, fontSize: 11,
          formatter: '{c} 万'
        },
        markLine: {
          silent: true,
          symbol: 'none',
          lineStyle: { color: accent, type: 'dashed', width: 1.4 },
          label: {
            formatter: '成本线 11.3 万',
            color: accent, fontSize: 10, position: 'insideEndTop'
          },
          data: [{ yAxis: 11.3 }]
        }
      }]
    });
    window.addEventListener('resize', function () { sens.resize(); });
  }
})();
