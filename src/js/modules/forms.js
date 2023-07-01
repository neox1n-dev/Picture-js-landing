import { postData } from "../services/requests";

const forms = () => {
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input'),
          upload = document.querySelectorAll('[name="upload"]');

    // checkNumInputs('input[name="user_phone"]');

    const message = {
        loading: 'Заватаження...',
        success: 'Дякуємо! Скоро ми з вами звяжемось',
        failure: 'Щось пішло не так...',
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png',
    };

    const path = {
        designer: 'assets/server.php',
        question: 'assets/question.php'
    }

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        })
        upload.forEach(item => {
            item.previousElementSibling.textContent = 'Файл не вибраний';

        });
    };

    upload.forEach((item) => {
        item.addEventListener('input', () => {
            let dots;
            const arr = item.files[0].name.split('.')
            arr[0].length > 6 ? dots = '...' : dots = '.';
            const name = arr[0].substring(0, 6) + dots + arr[1];
            item.previousElementSibling.textContent = name;
            if (item.closest('main')) {
                onUpload(item)
            }
        })
    })

    const onUpload = (item) => {
        let statusMessage = document.createElement('div');
        statusMessage.classList.add('status');
        item.parentNode.appendChild(statusMessage);

        item.classList.add('animated', 'fadeOutUp');

        setTimeout(() => {
            item.style.display = 'none';
        }, 400);

        let statusImg = document.createElement('img');
        statusImg.setAttribute('src', message.spinner);
        statusImg.classList.add('animated', 'fadeInUp');
        statusMessage.appendChild(statusImg);

        let textMessage = document.createElement('div');
        textMessage.textContent = message.loading;
        statusMessage.appendChild(textMessage);
        const formData = new FormData();
        formData.append('photoes', item.files);
        postData('assets/server.php', formData)
        .then(res => {
            console.log(res);
            statusImg.setAttribute('src', message.ok);
            textMessage.textContent = message.success;
        })
        .catch(() => {
            statusImg.setAttribute('src', message.fail);
            textMessage.textContent = message.failure;
        })
        .finally(() => {
            clearInputs();
            setTimeout(() => {
                statusMessage.remove();
                item.style.display = 'block';
                item.classList.remove('fadeOutUp');
                item.classList.remove('fadeInUp');
            }, 5000);
        })
    }
    const onPostData = (e, item) => {
        e.preventDefault();

        let statusMessage = document.createElement('div');
        statusMessage.classList.add('status');
        item.parentNode.appendChild(statusMessage);

        item.classList.add('animated', 'fadeOutUp');

        setTimeout(() => {
            item.style.display = 'none';
        }, 400);

        let statusImg = document.createElement('img');
        statusImg.setAttribute('src', message.spinner);
        statusImg.classList.add('animated', 'fadeInUp');
        statusMessage.appendChild(statusImg);

        let textMessage = document.createElement('div');
        textMessage.textContent = message.loading;
        statusMessage.appendChild(textMessage);
        const formData = new FormData(item);
        if(item.querySelector('.calc-price')) {
            formData.append('total-price', item.querySelector('.calc-price').textContent);
        }
        let api;
        item.closest('.popup-design') || item.classList.contains('calc_form') ? api = path.designer : api = path.question;
        postData(api, formData)
        .then(res => {
            console.log(res);
            statusImg.setAttribute('src', message.ok);
            textMessage.textContent = message.success;
        })
        .catch(() => {
            statusImg.setAttribute('src', message.fail);
            textMessage.textContent = message.failure;
        })
        .finally(() => {
            clearInputs();
            setTimeout(() => {
                statusMessage.remove();
                item.style.display = 'block';
                item.classList.remove('fadeOutUp');
                item.classList.remove('fadeInUp');
            }, 5000);
        })
    }

    form.forEach(item => {
        item.addEventListener('submit', (e) => onPostData(e, item));
    })
}

export default forms;