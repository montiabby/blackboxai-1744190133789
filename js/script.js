document.addEventListener('DOMContentLoaded', function() {
    const videoInput = document.getElementById('videoInput');
    const uploadStatus = document.getElementById('uploadStatus');
    const previewSection = document.getElementById('previewSection');
    const videoPreview = document.getElementById('videoPreview');
    const convertBtn = document.getElementById('convertBtn');
    const progressSection = document.getElementById('progressSection');
    const progressBar = document.getElementById('progressBar');
    const progressPercentage = document.getElementById('progressPercentage');
    const historyGrid = document.getElementById('historyGrid');

    // Handle file selection
    videoInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('video/')) {
                alert('Please select a valid video file.');
                return;
            }

            // Show upload status
            uploadStatus.classList.remove('hidden');
            
            // Create video preview
            const videoUrl = URL.createObjectURL(file);
            videoPreview.src = videoUrl;
            previewSection.classList.remove('hidden');
            
            // Enable convert button
            convertBtn.disabled = false;
        }
    });

    // Handle conversion
    convertBtn.addEventListener('click', function() {
        // Show progress section
        progressSection.classList.remove('hidden');
        convertBtn.disabled = true;

        // Simulate conversion process
        let progress = 0;
        const interval = setInterval(() => {
            progress += 1;
            progressBar.style.width = `${progress}%`;
            progressPercentage.textContent = `${progress}%`;

            if (progress >= 100) {
                clearInterval(interval);
                addToHistory();
                // Reset UI
                setTimeout(() => {
                    progressSection.classList.add('hidden');
                    convertBtn.disabled = false;
                }, 1000);
            }
        }, 50);
    });

    // Add to conversion history
    function addToHistory() {
        const file = videoInput.files[0];
        const timestamp = new Date().toLocaleString();
        
        const historyItem = document.createElement('div');
        historyItem.className = 'bg-retro-dark rounded-lg p-4 border border-neon-blue hover:neon-border transition-all duration-300';
        
        const thumbnailDiv = document.createElement('div');
        thumbnailDiv.className = 'mb-4 aspect-video bg-black rounded overflow-hidden';
        
        const innerDiv = document.createElement('div');
        innerDiv.className = 'w-full h-full bg-retro-dark flex items-center justify-center gap-2';
        
        const icon = document.createElement('i');
        icon.className = 'fas fa-check-circle text-4xl text-neon-blue';
        
        const status = document.createElement('span');
        status.className = 'font-retro-secondary text-neon-blue';
        status.textContent = 'Upscaled';
        
        const infoDiv = document.createElement('div');
        infoDiv.className = 'font-retro-secondary';
        
        const fileName = document.createElement('p');
        fileName.className = 'text-neon-purple truncate';
        fileName.textContent = file.name;
        
        const timeStamp = document.createElement('p');
        timeStamp.className = 'text-gray-400 text-sm';
        timeStamp.textContent = timestamp;
        
        innerDiv.appendChild(icon);
        innerDiv.appendChild(status);
        thumbnailDiv.appendChild(innerDiv);
        infoDiv.appendChild(fileName);
        infoDiv.appendChild(timeStamp);
        
        historyItem.appendChild(thumbnailDiv);
        historyItem.appendChild(infoDiv);
        
        // Add to grid
        historyGrid.insertBefore(historyItem, historyGrid.firstChild);
    }

    // Drag and drop functionality
    const dropZone = document.querySelector('.border-2');
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, unhighlight, false);
    });

    function highlight(e) {
        dropZone.classList.add('border-neon-purple');
    }

    function unhighlight(e) {
        dropZone.classList.remove('border-neon-purple');
    }

    dropZone.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const file = dt.files[0];
        
        if (file && file.type.startsWith('video/')) {
            videoInput.files = dt.files;
            videoInput.dispatchEvent(new Event('change'));
        } else {
            alert('Please drop a valid video file.');
        }
    }
});