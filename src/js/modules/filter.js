const filter = () => {
    const menu = document.querySelector('.portfolio-menu'),
          items = menu.querySelectorAll('li'),
          wrapper = document.querySelector('.portfolio-wrapper'),
          markAll = wrapper.querySelectorAll('.all'),
          no = document.querySelector('.portfolio-no');

    const typeFilter = (markType) => {
        markAll.forEach(mark => {
            mark.style.display = 'none';
            mark.classList.remove('animated', 'fadeIn');
        })

        no.style.display = 'none';
        no.classList.remove('animated', 'fadeIn');
        if (markType.length <= 0) {
            no.style.display = 'block';
            no.classList.add('animated', 'fadeIn');
        } else {
            markType.forEach(mark => {
                mark.style.display = 'block';
                mark.classList.add('animated', 'fadeIn');
            })
        }
    };

    menu.addEventListener('click', (e) => {
        const className = e.target.classList[0];
        typeFilter(wrapper.querySelectorAll(`.${className}`));
    });

    menu.addEventListener('click', (e) => {
        let target = e.target;

        if (target && target.tagName == 'LI') {
            items.forEach(btn => btn.classList.remove('active'));
            target.classList.add('active');
        }
    })
}

export default filter;