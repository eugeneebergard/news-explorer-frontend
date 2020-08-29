import isEmail from 'validator/lib/isEmail';

export default class Form {
  constructor(form, submit, validMessage) {
    this.validMessage = validMessage;
    this.form = form;
    this.submit = submit;
  }

  setSubmitButtonStateActive() {
    this.submit.classList.add('popup__button_is-active');
    this.submit.removeAttribute('disabled');
  }

  setSubmitButtonStateDisactive() {
    this.submit.classList.remove('popup__button_is-active');
    this.submit.setAttribute('disabled', 'disabled');
  }

  resetAllErrors() {
    const errors = this.form.querySelectorAll('.error');

    errors.forEach((elem) => {
      const err = elem;
      err.classList.remove('error_is-active');
      err.textContent = '';
    });
  }

  setEventListeners() {
    this.inputs = this.form.querySelectorAll('.popup__input');

    this.form.addEventListener('input', () => {
      let isValid = true;
      this.inputs.forEach((element) => {
        if (!this._checkInputValidity(element)) isValid = false;
      });

      if (isValid) this.setSubmitButtonStateActive();
    });
  }

  _checkInputValidity(element) {
    this.errorElement = document.querySelector(`#error-${element.id}`);

    if (element.value.length <= 0) {
      this.errorElement.textContent = this.validMessage.validationEmpty;
      this.errorElement.classList.add('error_is-active');
      this.setSubmitButtonStateDisactive();

      return false;
    }

    if (element.classList.contains('email') && !isEmail(element.value)) {
      this.errorElement.textContent = this.validMessage.validationEmail;
      this.errorElement.classList.add('error_is-active');
      this.setSubmitButtonStateDisactive();

      return false;
    }

    this._resetError();

    return true;
  }

  _resetError() {
    this.errorElement.classList.remove('error_is-active');
    this.errorElement.textContent = '';
  }
}
