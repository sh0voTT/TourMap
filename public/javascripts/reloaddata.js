document.addEventListener('DOMContentLoaded', function () {
  // 初始化 map 地图
  mapboxgl.accessToken = 'pk.eyJ1IjoiZnZ6dnpzdnJleiIsImEiOiJjbTJiaWgxY3IwbXlnMmlxeGlpNGc1cG4zIn0.2fBEaWiOxCFoohoyJl7LbQ';
  const map = new mapboxgl.Map({
    container: 'map', // 容器ID
    style: 'mapbox://styles/mapbox/streets-v11', // 地图样式
    center: [120, 30], // 初始中心点
    zoom: 12 // 初始缩放级别
  });

  // 添加导航控件
  map.addControl(new mapboxgl.NavigationControl());

  // 添加全屏控件
  map.addControl(new mapboxgl.FullscreenControl());

  // 设置中文
  mapboxgl.setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.1.0/mapbox-gl-rtl-text.js');
  map.addControl(new MapboxLanguage({ defaultLanguage: "zh-Hans" }));

  // 导航栏显示/隐藏逻辑
  const navbar = document.getElementById('navbar');
  let timeout;

  function showNavbar() {
    navbar.style.top = '0';
  }

  function hideNavbar() {
    navbar.style.top = '-50px';
  }

  document.addEventListener('mousemove', (e) => {
    if (e.clientY < 50) {
      showNavbar();
      clearTimeout(timeout);
    } else {
      timeout = setTimeout(hideNavbar, 1000);
    }
  });

  navbar.addEventListener('mouseenter', () => {
    clearTimeout(timeout);
  });

  navbar.addEventListener('mouseleave', () => {
    timeout = setTimeout(hideNavbar, 1000);
  });

  // 创建一个 GeoJSON 数据源
  const geojson = {
    type: 'FeatureCollection',
    features: []
  };

  // 生成唯一颜色的函数
  function generateUniqueColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  }

  // 获取位置数据并更新 GeoJSON 数据源
  fetch('/api/locations')
    .then(response => response.json())
    .then(data => {
      console.log('Fetched locations:', data); // 打印返回的数据

      // 生成明星名字到颜色的映射
      const nameToColor = {};
      const uniqueNames = new Set(data.map(location => location.name));
      uniqueNames.forEach(name => {
        nameToColor[name] = generateUniqueColor();
      });

      data.forEach(location => {
        // 假设 location 对象中有一个 number 属性
        const imagePath = `../images/PlaceImage/${location.number}.jpg`;

        geojson.features.push({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [parseFloat(location.longitude), parseFloat(location.latitude)]
          },
          properties: {
            name: location.name,
            color: nameToColor[location.name],
            message: `明星: ${location.name}\n经度: ${location.longitude}\n纬度: ${location.latitude}\n地址: ${location.address}`,
            image: imagePath,
            address: location.address // 添加 address 字段
          }
        });
      });

      // 将 GeoJSON 数据添加到地图
      map.on('load', () => {
        map.addSource('locations', {
          type: 'geojson',
          data: geojson
        });

        // 添加 Circle 图层
        map.addLayer({
          id: 'locations-layer',
          type: 'circle',
          source: 'locations',
          paint: {
            'circle-radius': 6, // 圆点半径
            'circle-color': ['get', 'color'], // 使用特征属性中的颜色
            'circle-opacity': 1, // 圆点透明度
            'circle-stroke-width': 2, // 描边宽度
            'circle-stroke-color': 'white', // 描边颜色
            'circle-stroke-opacity': 1 // 描边透明度
          }
        });

        // 添加点击事件监听器
        map.on('click', 'locations-layer', (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const description = e.features[0].properties.message;
          const imagePath = e.features[0].properties.image;
          const address = e.features[0].properties.address; // 获取 address 字段

          // 确保弹出窗口与鼠标点击位置对齐
          while (Math.abs(e.point.x - coordinates[0]) > 180) {
            coordinates[0] += e.point.x > coordinates[0] ? 360 : -360;
          }

          // 创建 Popup
          new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(`
              <div style="text-align: center;">
                <img src="${imagePath}" alt="明星照片" style="max-width: 100%; max-height: 150px; display: block; margin: 0 auto;">
                <div style="text-align: center;">
                  <h3 style="color: #333; font-size: 18px; margin: 10px 0;">${e.features[0].properties.name}</h3>
                  <p style="color: #666; font-size: 14px; margin: 5px 0;">经度: ${e.features[0].geometry.coordinates[0]}</p>
                  <p style="color: #666; font-size: 14px; margin: 5px 0;">纬度: ${e.features[0].geometry.coordinates[1]}</p>
                  <p style="color: #666; font-size: 14px; margin: 5px 0;">地址: ${address}</p> <!-- 显示地址 -->
                </div>
              </div>
            `)
            .addTo(map);
        });

        // 当鼠标悬停在圆点上时改变鼠标指针
        map.on('mouseenter', 'locations-layer', () => {
          map.getCanvas().style.cursor = 'pointer';
        });

        // 当鼠标离开圆点时恢复默认鼠标指针
        map.on('mouseleave', 'locations-layer', () => {
          map.getCanvas().style.cursor = '';
        });
      });
    })
    .catch(error => {
      console.error('Error fetching locations:', error);
    });
});