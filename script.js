function resizeImage(inputId, maxWidth, maxHeight) {
    const input = document.getElementById(inputId);
    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const img = new Image();
            img.src = e.target.result;

            img.onload = function () {
                // Calculate new dimensions while maintaining aspect ratio
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                let width = img.width;
                let height = img.height;

                if (width > maxWidth || height > maxHeight) {
                    const ratio = Math.min(maxWidth / width, maxHeight / height);
                    width = width * ratio;
                    height = height * ratio;
                }

                // Set canvas dimensions
                canvas.width = width;
                canvas.height = height;

                // Draw the resized image
                ctx.drawImage(img, 0, 0, width, height);

                // Convert canvas to image and trigger download
                canvas.toBlob((blob) => {
                    const link = document.createElement('a');
                    link.download = `resized_${inputId}.png`; // Default to PNG format
                    link.href = URL.createObjectURL(blob);
                    link.click();
                    URL.revokeObjectURL(link.href); // Clean up
                }, 'image/png'); // You can change the format to 'image/jpeg' if needed
            };
        };

        reader.readAsDataURL(input.files[0]);
    } else {
        alert('Please select an image file first.');
    }
}

function downloadFile(inputId) {
    const input = document.getElementById(inputId);
    if (input.files && input.files[0]) {
        const file = input.files[0];
        const link = document.createElement('a');
        link.download = file.name;
        link.href = URL.createObjectURL(file);
        link.click();
        URL.revokeObjectURL(link.href); // Clean up
    } else {
        alert('Please select a file first.');
    }
}
