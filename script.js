document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('cursorCanvas');
    const ctx = canvas.getContext('2d');

    // Set canvas to full window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let points = []; // Stores the points through which the spiral passes
    let rotationSpeed = 0.2; // Control the speed of rotation

    document.addEventListener('mousemove', function(e) {
        // Add point to the list with a random size factor and color
        points.push({ 
            x: e.clientX, 
            y: e.clientY, 
            alpha: 1, 
            scale: 1, 
            sizeFactor: Math.random() * 2 + 0.5, // Random size factor between 0.5 and 2.5
            color: getRandomBlueShade() // Random blue shade
        });

        // Keep the array size manageable
        if (points.length > 150) {
            points.shift();
        }
    });

    function fadePoints() {
        // Reduce the alpha (opacity) and scale of each point
        points.forEach(point => {
            point.alpha -= 0.01;
            point.scale -= 0.01;
        });

        // Remove points that are fully faded or scaled down
        points = points.filter(point => point.alpha > 0 && point.scale > 0);
    }

    function getRandomBlueShade() {
        // Generate a random blue shade
        const r = Math.floor(Math.random() * 100); // Red component 0-99
        const g = Math.floor(Math.random() * 100); // Green component 0-99
        const b = 200 + Math.floor(Math.random() * 56); // Blue component 200-255
        return `rgb(${r}, ${g}, ${b})`;
    }

    function drawSquare(centerX, centerY, alpha, scale, sizeFactor, color, offsetAngle) {
        const numSquares = 3;
        const spiralRadius = 15; // Spiral radius
        const angleOffset = (2 * Math.PI) / numSquares;
        const baseSquareSize = 5; // Base size of the square
        const squareSize = baseSquareSize * scale * sizeFactor; // Scale and randomize the size of the square

        for (let i = 0; i < numSquares; i++) {
            const angle = offsetAngle + angleOffset * i;
            const x = centerX + spiralRadius * Math.cos(angle) - squareSize / 2;
            const y = centerY + spiralRadius * Math.sin(angle) - squareSize / 2;

            ctx.fillStyle = color;
            ctx.globalAlpha = alpha; // Apply alpha for fading effect
            ctx.fillRect(x, y, squareSize, squareSize);
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

        let offsetAngle = 0.3;
        for (let i = 0; i < points.length; i++) {
            drawSquare(points[i].x, points[i].y, points[i].alpha, points[i].scale, points[i].sizeFactor, points[i].color, offsetAngle);
            offsetAngle += rotationSpeed; // Use rotationSpeed to control the revolving speed
        }

        fadePoints();

        requestAnimationFrame(draw); // Call draw again
    }

    draw(); // Start the drawing loop
});