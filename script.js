function processImage(inputId, maxWidth, maxHeight, minSizeKB, maxSizeKB) {
    const input = document.getElementById(inputId);
    if (!input.files.length) {
        alert("Please upload an image file.");
        return;
    }

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const img = new Image();
        img.src = event.target.result;

        img.onload = function() {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            // Maintain aspect ratio
            let width = img.width;
            let height = img.height;

            if (width > maxWidth || height > maxHeight) {
                const scale = Math.min(maxWidth / width, maxHeight / height);
                width = Math.round(width * scale);
                height = Math.round(height * scale);
            }

            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);

            // Convert to Blob and check file size
            canvas.toBlob((blob) => {
                const fileSizeKB = blob.size / 1024;
                if (fileSizeKB < minSizeKB || fileSizeKB > maxSizeKB) {
                    alert(`File size must be between ${minSizeKB}KB and ${maxSizeKB}KB. Current size: ${Math.round(fileSizeKB)}KB`);
                    return;
                }

                // Create download link
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = inputId + ".jpg";
                link.innerText = "Download Resized Image";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }, "image/jpeg", 0.9); // 0.9 is the quality (90%)
        };
    };

    reader.readAsDataURL(file);
}
