const authFormLayot = `
<form class="form">
    <h2 class="form__title">Вход</h2>

    <label for="signin-email" class="form__label">E-mail</label>
    <input id="signin-email" required type="email" name="email" class="form__input" placeholder="Введите e-mail" />
    <p class="form__input-error"></p>

    <label for="signin-password" class="form__label">Пароль</label>
    <input id="signin-password" required minlength="8" type="password" name="password" class="form__input"
      placeholder="Введите пароль" />
    <p class="form__input-error"></p>

    <p class="form__error"></p>
    <input type="submit" class="form__submit" value="Войти" />
    <p class="form__or">
      или <span class="form__link">Зарегистрироваться</span>
    </p>
  </form>
`;

export default authFormLayot;
