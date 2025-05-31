(async function handleInitGallery() {
    let page = 1;
    let isLoading = false;
    let hasMore = true;
    let lightGalleryInstance = null;
    let renderedPhotosQuantity = 0;

    async function loadLightGallery() {
        const gallery = document.getElementById('lightGallery');

        lightGalleryInstance = lightGallery(gallery, {
            selector: 'a',
            thumbnail: true,
            zoom: true
        });

        gallery.addEventListener('lgAfterSlide', async (event) => {
            console.log(gallery, renderedPhotosQuantity, event.detail.index);
            if (hasMore && event.detail.index + 3 >= renderedPhotosQuantity) {
                // if (lightGalleryInstance) lightGalleryInstance.destroy();
                await loadPhotos();
            }
        })
    }

    await loadLightGallery();

    async function loadPhotos() {
        if (isLoading || !hasMore) return;
        isLoading = true;
        document.getElementById('loader').style.display = 'block';

        try {
            const res = await fetch(`/api/photos?page=${page}`);
            const data = await res.json();

            const gallery = document.getElementById('lightGallery');
            data.photos.forEach(photo => {
                const a = document.createElement('a');
                a.href = `/uploads/${photo}`;
                a.innerHTML = `<img alt="" src="/uploads/${photo}" loading="lazy" />`;
                gallery.appendChild(a);
            });

            renderedPhotosQuantity += data.photos.length;

            hasMore = data.hasMore;
            page++;
            if (lightGalleryInstance) lightGalleryInstance.refresh();
        } catch (e) {
            console.error('Błąd ładowania zdjęć:', e);
        }

        isLoading = false;
        document.getElementById('loader').style.display = hasMore ? 'block' : 'none';
    }

    window.addEventListener('scroll', async () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 300) {
            await loadPhotos();
        }
    });

    document.addEventListener('DOMContentLoaded', loadPhotos);
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
