ymaps.ready(init);

function init() {

    var myMap = new ymaps.Map("map", {
        center: [92.85676853332468, 56.00970232953383],
        zoom: 7,
        controls: ['smallMapDefaultSet']
    });

    let point;
    let json_data

    $.ajax({
        url: 'http://127.0.0.1:8000/static/doc/map.geojson',
        dataType: 'json'
    }).then(function (res) {
        // Формируем выборку на основе загруженных данных.
        json_data = res
        const objects = ymaps.geoQuery(res);
        objects.addToMap(myMap);
    });

    function polygon_contain_point(point_coord) {
        var a = 0;
        json_data.features.forEach(function (obj) {
            if (turf.booleanPointInPolygon(turf.point(point_coord), turf.polygon(obj.geometry.coordinates))) {
                a = 1
            }
        });
        return a
    }

    document.querySelector('#form').addEventListener('submit', (e) => {
        e.preventDefault();
        if (point) {
            myMap.geoObjects.remove(point)
        }
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData)

        ymaps.geocode(`${data.city} ${data.street} ${data.house}`).then(res => {
            let obj = res.geoObjects.get(0)
            const coords = obj.geometry.getCoordinates()
            if (coords) {
                if (polygon_contain_point(coords)) {
                    point = new ymaps.Placemark(coords, {
                    }, {
                        'preset': 'islands#greenCircleDotIcon'
                    });
                } else {
                    point = new ymaps.Placemark(coords, {
                    }, {
                        'preset': 'islands#redCircleDotIcon'
                    });
                }
                myMap.geoObjects.add(point)
                myMap.panTo(coords, {
                    delay: 0,
                    flying: true
                }).then(() => {
                    myMap.setZoom(19)
                })
            }
        })
    });
}