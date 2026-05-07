document.addEventListener('DOMContentLoaded', () => {
    const zoomableImages = document.querySelectorAll('.zoomable');
    const modal = document.createElement('div');
    const modalContent = document.createElement('div');
    const modalClose = document.createElement('span');
    const modalOpenTab = document.createElement('a');
    const magnifier = document.createElement('div');
    let originalParent = null;

    modal.classList.add('modal');
    modalContent.classList.add('modal-content');
    modalClose.classList.add('modal-close');
    modalOpenTab.classList.add('modal-open-tab');
    magnifier.classList.add('magnifier');
    modalClose.innerHTML = '&times;';
    modalOpenTab.innerHTML = '&#8599;'; // Arrow pointing to top-right
    modalOpenTab.title = 'Open in new tab';
    modalOpenTab.target = '_blank';

    modal.appendChild(modalClose);
    modal.appendChild(modalOpenTab);
    modal.appendChild(modalContent);
    modal.appendChild(magnifier);
    document.body.appendChild(modal);

    const showModal = () => {
        modal.style.opacity = '0';
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 200);
    };

    const closeModal = () => {
        modal.style.opacity = '0';
        magnifier.style.display = 'none';
        setTimeout(() => {
            modal.style.display = 'none';
            if (originalParent) {
                originalParent.querySelector('.zoomable').classList.remove('original-hidden');
            }
        }, 200);
    };

    zoomableImages.forEach(img => {
        img.addEventListener('click', () => {
            if (!modal.classList.contains('show')) {
                originalParent = img.parentElement;
                const zoomedImage = img.cloneNode();
                
                const higherResSrc = img.src.replace('w350', 'w350'); // this can be used eventually to try to make the images bigger without losing quality?
                zoomedImage.src = higherResSrc;

                zoomedImage.style.transition = 'transform 0.3s ease, opacity 0.3s ease';

                modalContent.innerHTML = '';
                modalContent.appendChild(zoomedImage);

                // Set the href for the open in new tab button
                modalOpenTab.href = higherResSrc;

                showModal(); 
                img.classList.add('original-hidden');

                // Add magnifier functionality
                zoomedImage.addEventListener('mousemove', (e) => {
                    const rect = zoomedImage.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    // Position magnifier
                    magnifier.style.left = e.clientX - 200 + 'px';
                    magnifier.style.top = e.clientY - 200 + 'px';
                    magnifier.style.display = 'block';
                    
                    // Calculate background position for magnification
                    const xPercent = (x / rect.width) * 100;
                    const yPercent = (y / rect.height) * 100;
                    
                    magnifier.style.backgroundImage = `url('${zoomedImage.src}')`;
                    magnifier.style.backgroundSize = `${rect.width * 2.5}px ${rect.height * 2.5}px`;
                    magnifier.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
                });

                zoomedImage.addEventListener('mouseenter', () => {
                    magnifier.style.display = 'block';
                });

                zoomedImage.addEventListener('mouseleave', () => {
                    magnifier.style.display = 'none';
                });
            }
        });
    });
    
    // Only close button closes the modal
    modalClose.addEventListener('click', closeModal);
});
