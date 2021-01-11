const regFormLayot = `
<form class="form">
    <h2 class="form__title">Регистрация</h2>

    <label for="email" class="form__label">E-mail</label>
    <input id="email" required type="email" name="email" class="form__input" placeholder="Введите e-mail" />
    <p class="form__input-error">Неправильный формат email</p>

    <label for="password" class="form__label">Пароль</label>
    <input id="password" required minlength="8" type="password" name="password" class="form__input"
      placeholder="Введите пароль" />
    <p class="form__input-error"></p>

    <label for="name" class="form__label">Имя</label>
    <input id="name" required minlength="2" maxlength="30" type="text" name="name" class="form__input"
      placeholder="Введите своё имя" />
    <p class="form__input-error"></p>

    <p class="form__error">Такой пользователь уже есть</p>
    <input type="submit" class="form__submit" value="Зарегистрироваться" />
    <p class="form__or">или <button class="form__link">Войти</button></p>
  </form>
`;

export default regFormLayot;
