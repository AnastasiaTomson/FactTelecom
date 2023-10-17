const data = {
    labels: labels_list,
    datasets: [{
        data: data_list,
        backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(147,9,194)',
            'rgb(11,208,50)',
            'rgb(86,255,255)',
            'rgb(255,86,86)',
            'rgb(255,86,227)',
            'rgb(92,86,255)',
            'rgb(86,255,159)',
            'rgb(255, 255, 51)',
            'rgb(204, 0, 0)',
            'rgb(255, 102, 0)',
            'rgb(135, 206, 250)',
            'rgb(255, 105, 180)',
            'rgb(0, 100, 0)',
            'rgb(188, 143, 143)',
            'rgb(29, 0, 136)',
            'rgb(255, 176, 86)',
            'rgb(9, 194, 172)',
        ],
        hoverOffset: 10
    }]
};
const config = {
    type: 'doughnut',
    data: data,
    options: {
        layout: {
            padding: 20,
        },
        cutout: '80%',
        plugins: {
            legend: {
                position: 'chartArea',
                display: false,
                labels: {
                    boxWidth: 80,
                    fontColor: 'rgb(60, 180, 100)'
                }
            }
        }
    }
};

const myChart = new Chart(
    document.getElementById('myChart'),
    config
);