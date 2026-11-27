document.addEventListener('DOMContentLoaded', () => {
    const editBtn = document.getElementById('editProfileBtn');
    const inputs = document.querySelectorAll('.profile-input');
    const saveBtn = document.getElementById('saveProfileBtn');
    const cancelBtn = document.getElementById('cancelProfileBtn');
    const form = document.querySelector('.profile-form');
    const fioInput = document.getElementById('fioInput');
    const avatarLetter = document.getElementById('avatarLetter');

    let savedState = [];

    saveBtn.classList.add('hidden');
    cancelBtn.classList.add('hidden');

    const updateAvatar = (text) => {
        if (!text) return 'Г';
        const firstName = text.trim().split(' ')[0];
        return firstName ? firstName.charAt(0).toUpperCase() : 'Г';
    };

    if (fioInput && avatarLetter) {
        avatarLetter.textContent = updateAvatar(fioInput.value);
        fioInput.addEventListener('input', (e) => {
            avatarLetter.textContent = updateAvatar(e.target.value);
        });
    }

    editBtn.addEventListener('click', () => {
        const isDisabled = inputs[0].disabled;

        if (isDisabled) {
            savedState = Array.from(inputs).map(input => {
                if (input.type === 'radio') {
                    return input.checked;
                }
                return input.value;
            });

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
            if (input.type === 'radio') {
                input.checked = savedState[index];
            } else {
                input.value = savedState[index];
            }
            input.disabled = true;
        });

        if (fioInput && avatarLetter) {
            avatarLetter.textContent = updateAvatar(fioInput.value);
        }

        saveBtn.classList.add('hidden');
        cancelBtn.classList.add('hidden');
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        inputs.forEach(input => {
            input.disabled = true;
        });

        saveBtn.classList.add('hidden');
        cancelBtn.classList.add('hidden');
        alert('Данные успешно сохранены!');
    });
});