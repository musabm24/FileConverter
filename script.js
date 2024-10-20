const dropArea = document.getElementById('dropArea');
const fileInput = document.getElementById('fileInput');

function handleFiles(files) {
    if (files.length > 0) {
        fileInput.files = files;
        dropArea.textContent = `File selected: ${files[0].name}`;
    }
}

dropArea.addEventListener('click', () => {
    fileInput.click();
});
dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropArea.classList.add('drag-over');
    dropArea.textContent = 'Release to upload the file';
});

dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('drag-over');
    dropArea.textContent = 'Drag & Drop your file here or click to select';
});

dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    dropArea.classList.remove('drag-over');
    dropArea.textContent = 'File dropped successfully';
    handleFiles(e.dataTransfer.files);
});

fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
});



document.getElementById('convertButton').addEventListener('click', function() {
    const fileType = document.getElementById('fileType').value;
    const resultDiv = document.getElementById('result');
    const downloadLink = document.getElementById('downloadLink');
    resultDiv.textContent = '';
    downloadLink.style.display = 'none';

    if (fileInput.files.length === 0) {
        resultDiv.textContent = 'Please select a file to convert.';
        return;
    }

    const file = fileInput.files[0];
    const fileName = file.name;
    const newFileName = fileName.split('.').slice(0, -1).join('.') + '.' + fileType;

    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = function() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob(function(blob) {
            const url = URL.createObjectURL(blob);
            resultDiv.textContent = `Successfully converted ${fileName} to ${newFileName}!`;
            downloadLink.href = url;
            downloadLink.download = newFileName;
            downloadLink.style.display = 'block';
        }, fileType === 'jpeg' ? 'image/jpeg' : `image/${fileType}`);
    };

    img.onerror = function() {
        resultDiv.textContent = 'Error loading the file. Please make sure it is a valid image.';
    };
});
