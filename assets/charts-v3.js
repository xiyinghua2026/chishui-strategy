(function () {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();

  // ---------- 图 1：三条路的首年期望净收入 ----------
  var routeEl = document.getElementById('chart-route');
  if (routeEl) {
    // 倒序写入，使「抖音」显示在顶部
    var routes = [
      { name: '免费网页 · 作品集', value: 0, note: '不赚钱，换数据与作品' },
      { name: 'Steam 短篇 · 买断', value: 1.8, note: '20 关，18 元 × 3000 份' },
      { name: '抖音小游戏 · 广告', value: 3.6, note: '12 个月累计中位' }
    ];

    var chart1 = echarts.init(routeEl, null, { renderer: 'svg' });
    chart1.setOption({
      animation: false,
      tooltip: {
        appendToBody: true,
        confine: true,
        trigger: 'item',
        formatter: function (p) {
          var r = routes[p.dataIndex];
          return r.name + '<br/>首年净收入 ' + r.value + ' 万元<br/>' + r.note;
        }
      },
      grid: { left: 8, right: 74, top: 20, bottom: 40, containLabel: true },
      xAxis: {
        type: 'value',
        max: 4.5,
        name: '万元',
        nameTextStyle: { color: muted, fontSize: 11 },
        nameGap: 26,
        nameLocation: 'middle',
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { color: muted, fontSize: 11 },
        splitLine: { lineStyle: { color: rule, type: 'dashed' } }
      },
      yAxis: {
        type: 'category',
        data: routes.map(function (r) { return r.name; }),
        axisLine: { lineStyle: { color: rule } },
        axisTick: { show: false },
        axisLabel: { color: ink, fontSize: 12.5 }
      },
      series: [
        {
          type: 'bar',
          barWidth: '46%',
          data: routes.map(function (r, i) {
            return {
              value: r.value,
              itemStyle: { color: i === 2 ? accent : accent2 }
            };
          }),
          label: {
            show: true,
            position: 'right',
            color: muted,
            fontSize: 11,
            formatter: function (p) {
              return p.value === 0 ? '0' : p.value + ' 万';
            }
          }
        }
      ]
    });
    window.addEventListener('resize', function () { chart1.resize(); });
  }

  // ---------- 图 2：月广告收入 vs DAU × ARPDAU ----------
  var revEl = document.getElementById('chart-rev');
  if (revEl) {
    var dau = ['100', '300', '1000', '3000', '10000'];
    var seriesDef = [
      { name: 'ARPDAU 0.08', color: muted, data: [240, 720, 2400, 7200, 24000] },
      { name: 'ARPDAU 0.15', color: accent2, data: [450, 1350, 4500, 13500, 45000] },
      { name: 'ARPDAU 0.25', color: accent, data: [750, 2250, 7500, 22500, 75000] }
    ];

    var chart2 = echarts.init(revEl, null, { renderer: 'svg' });
    chart2.setOption({
      animation: false,
      tooltip: {
        appendToBody: true,
        confine: true,
        trigger: 'axis',
        axisPointer: { type: 'line' },
        valueFormatter: function (v) { return v.toLocaleString('en-US') + ' 元 / 月'; }
      },
      legend: {
        bottom: 0,
        itemWidth: 14,
        itemHeight: 8,
        textStyle: { color: ink, fontSize: 12 }
      },
      grid: { left: 8, right: 46, top: 34, bottom: 74, containLabel: true },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: dau,
        name: 'DAU',
        nameTextStyle: { color: muted, fontSize: 11 },
        nameGap: 26,
        nameLocation: 'middle',
        axisLine: { lineStyle: { color: rule } },
        axisTick: { show: false },
        axisLabel: { color: muted, fontSize: 11 }
      },
      yAxis: {
        type: 'value',
        name: '元 / 月',
        nameTextStyle: { color: muted, fontSize: 11 },
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          color: muted,
          fontSize: 11,
          formatter: function (v) {
            if (v === 0) { return '0'; }
            return v >= 10000 ? (v / 10000) + ' 万' : v;
          }
        },
        splitLine: { lineStyle: { color: rule, type: 'dashed' } }
      },
      series: seriesDef.map(function (s) {
        return {
          name: s.name,
          type: 'line',
          data: s.data,
          symbol: 'circle',
          symbolSize: 6,
          lineStyle: { width: 2, color: s.color },
          itemStyle: { color: s.color },
          emphasis: { focus: 'series' }
        };
      })
    });
    window.addEventListener('resize', function () { chart2.resize(); });
  }
})();
