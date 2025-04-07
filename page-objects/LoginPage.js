class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = this.page.locator('[formcontrolname="userEmail"]');
    this.password = this.page.locator('[type="password"]');
    this.signIn = this.page.locator('#login');
  }

  async goTo() {
    await this.page.goto('https://rahulshettyacademy.com/client');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async validateLogin(username, password) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.signIn.click();
  }
}

module.exports = { LoginPage };
