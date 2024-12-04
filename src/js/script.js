const menuIcon = document.getElementById('menu-icon');
        const mobileMenu = document.getElementById('mobile-menu');

        // Toggle the mobile menu
        menuIcon.addEventListener('click', (event) => {
            event.stopPropagation();
            menuIcon.querySelector('i').classList.toggle('bx-x');
            mobileMenu.classList.toggle('hidden');
        });

        // Close the mobile menu when clicking anywhere outside it
        document.addEventListener('click', (event) => {
            const isClickInsideMenu = mobileMenu.contains(event.target) || menuIcon.contains(event.target);
            if (!isClickInsideMenu && !mobileMenu.classList.contains('hidden')) {
                menuIcon.querySelector('i').classList.remove('bx-x');
                mobileMenu.classList.add('hidden');
            }
        });

        function toggleDropdown(dropdownId) {
            const dropdown = document.getElementById(dropdownId);
            dropdown.classList.toggle('hidden');
        }

// line-Animation
        window.addEventListener("scroll", () => {
            const scrollY = window.scrollY;
            const line = document.querySelector(".line-animation");

            const newHeight = scrollY * 1.5; 
            line.style.height = `${newHeight}px`;
        });