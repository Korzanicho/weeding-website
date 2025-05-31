(function loadGallery() {
    if (!lightGallery || typeof lightGallery !== 'function') return;
    lightGallery(document.querySelector(".gallery"), {
        selector: "a",
        thumbnail: true,
        zoom: true,
    });
})();


(function fileInputValidation() {
    const input = document.getElementById('imageInput');
    const MAX_FILES = 50;

    input.addEventListener('change', () => {
        if (input.files.length > MAX_FILES) {
            alert(`Możesz wybrać maksymalnie ${MAX_FILES} zdjęć.`);
            input.value = '';
        }
    });
})();
