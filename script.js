const monthlyUsersData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    data: [1200, 1900, 3000, 5000, 4000, 3000]
};

const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    data: [1200, 19000, 3000, 50000, 42000, 3000]
};

// Draw line chart for user
function drawLineChart(canvasId, data, color) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
        console.error('Canvas element not found:', canvasId);
        return;
    }
    
    // here we are Setting initial canvas size as we need to show in here
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetWidth * 0.5;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    const dataPoints = data.data;
    
    // Clear canvas widrth and height
    ctx.clearRect(0, 0, width, height);
    
    const maxValue = Math.max(...dataPoints);
    
    // Drawing the  grid lines and labels
    ctx.beginPath();
    ctx.strokeStyle = '#e0e0e0';
    ctx.font = '12px Arial';
    ctx.fillStyle = '#666';
    
    // Horizontal grid lines
    for(let i = 0; i <= 5; i++) {
        const y = padding + (height - 2 * padding) * (1 - i/5);
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.fillText((maxValue * i/5).toFixed(0), 5, y);
    }
    
    // Vertical grid lines and labels
    data.labels.forEach((label, i) => {
        const x = padding + (width - 2 * padding) * (i/(data.labels.length - 1));
        ctx.moveTo(x, height - padding);
        ctx.lineTo(x, padding);
        ctx.fillText(label, x - 15, height - 10);
    });
    ctx.stroke();
    
    // Drawing the line inbetwenn
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    dataPoints.forEach((value, i) => {
        const x = padding + (width - 2 * padding) * (i/(dataPoints.length - 1));
        const y = padding + (height - 2 * padding) * (1 - value/maxValue);
        if(i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.stroke();
    
    // Drawing points for filling thegraph
    dataPoints.forEach((value, i) => {
        const x = padding + (width - 2 * padding) * (i/(dataPoints.length - 1));
        const y = padding + (height - 2 * padding) * (1 - value/maxValue);
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
    });
}

// Drawing bar chart for revenuegrowth
function drawBarChart(canvasId, data, color) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
        console.error('Canvas element not found:', canvasId);
        return;
    }
    
    // Set initial canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetWidth * 0.5;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    const dataPoints = data.data;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Finding the   max value for scaling
    const maxValue = Math.max(...dataPoints);
    
    // Draw grid lines and labels
    ctx.beginPath();
    ctx.strokeStyle = '#e0e0e0';
    ctx.font = '12px Arial';
    ctx.fillStyle = '#666';
    
    // Horizontal grid lines
    for(let i = 0; i <= 5; i++) {
        const y = padding + (height - 2 * padding) * (1 - i/5);
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.fillText('Rs' + (maxValue * i/5).toFixed(0), 5, y);
    }
    
    // Draw bars
    const barWidth = (width - 2 * padding) / dataPoints.length * 0.8;
    dataPoints.forEach((value, i) => {
        const x = padding + (width - 2 * padding) * (i/dataPoints.length);
        const y = padding + (height - 2 * padding) * (1 - value/maxValue);
        ctx.fillStyle = color;
        ctx.fillRect(x, y, barWidth, height - padding - y);
        
        // Add label
        ctx.fillStyle = '#666';
        ctx.fillText(data.labels[i], x + barWidth/2 - 15, height - 10);
    });
}

// Update dashboard data
function updateDashboardData() {
    document.getElementById('totalUsers').textContent = '1,235';
    document.getElementById('activeUsers').textContent = '892';
    document.getElementById('revenue').textContent = 'Rs 45,678';
}


function initDashboard() {
    console.log('Initializing dashboard...');
    updateDashboardData();
    
    // Adding a small delay to ensure the canvas elements are ready to execute for frontend og the site
    setTimeout(() => {
        drawLineChart('usersChart', monthlyUsersData, '#646cff');
        drawBarChart('revenueChart', revenueData, 'rgba(83, 91, 242, 0.5)');
    }, 100);
}

// Handle window resize
window.addEventListener('resize', () => {
    drawLineChart('usersChart', monthlyUsersData, '#646cff');
    drawBarChart('revenueChart', revenueData, 'rgba(83, 91, 242, 0.5)');
});

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', initDashboard);
window.onload = initDashboard;