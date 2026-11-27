document.addEventListener('DOMContentLoaded', () => {
    const editBtn = document.getElementById('editProfileBtn');
    const inputs = document.querySelectorAll('.profile-input');
    const saveBtn = document.getElementById('saveProfileBtn');
    const cancelBtn = document.getElementById('cancelProfileBtn');
    const form = document.querySelector('.profile-form');
    
    const fioInput = document.getElementById('fioInput');
    const emailInput = document.getElementById('emailInput');
    const phoneInput = document.getElementById('phoneInput');
    const cityInput = document.getElementById('cityInput');
    const dateInput = document.getElementById('dateInput');
    const avatarLetter = document.getElementById('avatarLetter');

    let savedState = [];

    const showError = (inputId, errorId, message) => {
        const input = document.getElementById(inputId);
        const error = document.getElementById(errorId);
        if (input && error) {
            input.classList.add('error');
            error.textContent = message;
            error.classList.add('show');
        }
    };

    const hideError = (inputId, errorId) => {
        const input = document.getElementById(inputId);
        const error = document.getElementById(errorId);
        if (input && error) {
            input.classList.remove('error');
            error.classList.remove('show');
        }
    };

    const updateAvatar = (text) => {
        if (!text) return 'Г';
        const firstName = text.trim().split(' ')[0];
        return firstName ? firstName.charAt(0).toUpperCase() : 'Г';
    };

    const loadSavedData = () => {
        const data = JSON.parse(localStorage.getItem('userProfile'));
        if (data) {
            if (data.fio) fioInput.value = data.fio;
            if (data.date && dateInput) dateInput.value = data.date;
            if (data.email && emailInput) emailInput.value = data.email;
            if (data.phone && phoneInput) phoneInput.value = data.phone;
            if (data.city && cityInput) cityInput.value = data.city;
            if (data.gender) {
                const radios = document.querySelectorAll('input[name="gender"]');
                radios.forEach(r => { if (r.value === data.gender) r.checked = true; });
            }
            avatarLetter.textContent = updateAvatar(fioInput.value);
        }
    };

    loadSavedData();
    saveBtn.classList.add('hidden');
    cancelBtn.classList.add('hidden');

    fioInput.addEventListener('input', (e) => {
        const originalValue = e.target.value;
        e.target.value = originalValue.replace(/[^А-Яа-яЁё\s]/g, '');
        
        if (originalValue !== e.target.value) {
            showError('fioInput', 'fioError', 'В поле ФИО можно вводить только русские буквы!');
        } else {
            hideError('fioInput', 'fioError');
        }
        avatarLetter.textContent = updateAvatar(e.target.value);
    });

    if (emailInput) {
        emailInput.addEventListener('input', (e) => {
            const originalValue = e.target.value;
            const cleanValue = originalValue.replace(/[^a-zA-Z0-9@._%+-]/g, '');
            if (originalValue !== cleanValue) {
                showError('emailInput', 'emailError', 'В email можно использовать только английские буквы!');
                e.target.value = cleanValue;
            } else {
                hideError('emailInput', 'emailError');
            }
        });
    }

    const cities = ["Фиора","Магнолия", "Альварес", 'Москва', 'Санкт-Петербург', 'Нижний Тагил', 'Екатеринбург', 'Новосибирск', 'Казань', 'Нижний Новгород', 'Челябинск', 'Самара', 'Омск', 'Ростов-на-Дону', 'Уфа', 'Красноярск', 'Воронеж', 'Пермь', 'Волгоград'];
    const citySuggestions = document.getElementById('citySuggestions');

    if (cityInput) {
        cityInput.addEventListener('input', (e) => {
            const originalValue = e.target.value;
            const cleanValue = originalValue.replace(/[^А-Яа-яЁё\s-]/g, '');
            e.target.value = cleanValue;

            if (originalValue !== cleanValue) {
                showError('cityInput', 'cityError', 'В поле Город можно вводить только русские буквы!');
            } else {
                hideError('cityInput', 'cityError');
            }

            const val = e.target.value.toLowerCase().trim();
            citySuggestions.innerHTML = '';
            
            if (val.length > 0) {
                const matches = cities.filter(city => city.toLowerCase().startsWith(val));
                
                if (matches.length > 0) {
                    citySuggestions.classList.add('active');
                    matches.forEach(city => {
                        const div = document.createElement('div');
                        div.classList.add('city-suggestion-item');
                        div.textContent = city;
                        div.addEventListener('click', () => {
                            cityInput.value = city;
                            citySuggestions.classList.remove('active');
                            hideError('cityInput', 'cityError');
                        });
                        citySuggestions.appendChild(div);
                    });
                } else {
                    citySuggestions.classList.remove('active');
                }
            } else {
                citySuggestions.classList.remove('active');
            }
        });

        document.addEventListener('click', (e) => {
            if (!cityInput.contains(e.target) && !citySuggestions.contains(e.target)) {
                citySuggestions.classList.remove('active');
            }
        });
    }

    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            let val = e.target.value.replace(/\D/g, '');
            if (val.length > 11) val = val.slice(0, 11);
            e.target.value = '+' + val;
            
            if (val.length === 0) {
                hideError('phoneInput', 'phoneError');
            } else if (val.length < 11) {
                showError('phoneInput', 'phoneError', 'Введите полный номер: всего 11 цифр (например, +79216239999)');
            } else {
                hideError('phoneInput', 'phoneError');
            }
        });
        phoneInput.addEventListener('blur', (e) => {
            if (e.target.value === '') {
                e.target.value = '+';
            }
        });
    }

    editBtn.addEventListener('click', () => {
        const isDisabled = inputs[0].disabled;
        if (isDisabled) {
            savedState = Array.from(inputs).map(input => input.value);
            inputs.forEach(input => input.disabled = false);
            saveBtn.classList.remove('hidden');
            cancelBtn.classList.remove('hidden');
            inputs[0].focus();
        } else {
            inputs.forEach(input => input.disabled = true);
            saveBtn.classList.add('hidden');
            cancelBtn.classList.add('hidden');
        }
    });

    cancelBtn.addEventListener('click', () => {
        inputs.forEach((input, index) => {
            input.value = savedState[index];
            input.disabled = true;
        });
        avatarLetter.textContent = updateAvatar(fioInput.value);
        saveBtn.classList.add('hidden');
        cancelBtn.classList.add('hidden');

        document.querySelectorAll('.error-message').forEach(el => el.classList.remove('show'));
        document.querySelectorAll('.form-input').forEach(el => el.classList.remove('error'));
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        document.querySelectorAll('.error-message').forEach(el => el.classList.remove('show'));
        inputs.forEach(input => input.classList.remove('error'));
        
        let hasError = false;

        inputs.forEach(input => {
            if (input.type !== 'radio' && input.value.trim() === '') {
                input.classList.add('error');
                hasError = true;
            }
        });

        if (hasError) {
            alert('Пожалуйста, заполните все поля!');
            return;
        }

        const emailValue = emailInput.value;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(emailValue)) {
            showError('emailInput', 'emailError', 'Введите корректный email (например, ivanov@mail.ru)');
            return;
        }

        const phoneValue = phoneInput.value;
        if (!/^\+\d{11}$/.test(phoneValue)) {
            showError('phoneInput', 'phoneError', 'Введите корректный номер (11 цифр, начиная с +)');
            return;
        }

        const gender = document.querySelector('input[name="gender"]:checked')?.value || 'female';
        const dataToSave = {
            fio: fioInput.value,
            date: dateInput ? dateInput.value : '',
            email: emailInput.value,
            phone: phoneInput.value,
            city: cityInput ? cityInput.value : '',
            gender: gender
        };

        localStorage.setItem('userProfile', JSON.stringify(dataToSave));

        inputs.forEach(input => input.disabled = true);
        saveBtn.classList.add('hidden');
        cancelBtn.classList.add('hidden');
        alert('Данные успешно сохранены!');
    });
});