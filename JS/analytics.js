document.addEventListener('DOMContentLoaded', function () {
    const salesCtx = document.getElementById('salesChart').getContext('2d');
    const shareCtx = document.getElementById('shareChart').getContext('2d');
    const demographicsCtx = document.getElementById('demographicsChart').getContext('2d');

    const salesData = {
        labels: [
            1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 
            2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 
            2019, 2020, 2021, 2022
        ],
        datasets: [{
            label: 'Worldwide Sales of Organic Foods (in billion USD)',
            data: [
                17, 18, 22, 24, 25, 27, 30, 37.5, 40, 51,
                53, 57, 62.5, 70, 67, 78, 80, 87, 93, 89,
                109, 119, 131, 135
            ],
            backgroundColor: 'rgba(0, 123, 255, 0.6)', 
            borderColor: 'rgba(0, 123, 255, 1)',
            borderWidth: 1
        }]
    };

    const salesChart = new Chart(salesCtx, {
        type: 'bar',
        data: salesData,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });

    const shareData = {
        labels: ['USA', 'Germany', 'China', 'France', 'Canada', 'Others'],
        datasets: [{
            label: 'Retail Shares of Organic Food Worldwide (in %)',
            data: [43, 11, 9, 9, 4, 23],
            backgroundColor: [
                'rgba(255, 99, 132, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 206, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(153, 102, 255, 0.8)',
                'rgba(255, 159, 64, 0.8)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    };

    const shareChart = new Chart(shareCtx, {
        type: 'pie',
        data: shareData,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        color: 'black', 
                        font: {
                            weight: 'bold'
                        }
                    }
                }
            }
        }
    });

    const demographicsData = {
        labels: ['upto 20', '21-30', '31-40', '41-50', '51-60', 'over 60'],
        datasets: [{
            label: 'Consumer Demographics for Organic Food (in %)',
            data: [0.3, 25.1, 33.8, 21.9, 12.5, 6.4],
            backgroundColor: [
                'rgba(75, 192, 192, 0.8)',
                'rgba(153, 102, 255, 0.8)',
                'rgba(255, 159, 64, 0.8)',
                'rgba(255, 99, 132, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 206, 86, 0.8)'
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
        }]
    };

    const demographicsChart = new Chart(demographicsCtx, {
        type: 'doughnut',
        data: demographicsData,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        color: 'black', 
                        font: {
                            weight: 'bold'
                        }
                    }
                }
            }
        }
    });
});
