module.exports = {
  writeFormMemberBase: async function (driver, name, email, note) {
    let textNameField = await driver.$("input#member-name");
    let textEmailField = await driver.$("input#member-email");
    let textNoteField = await driver.$("textarea#member-note");

    await textNameField.setValue(name);
    await textEmailField.setValue(email);
    await textNoteField.setValue(note);
  },

  validateUpdatedMemberNameBase: async function (driver, email, updatedName) {
    const { expect } = await import("chai");
    const emailElements = await driver.$$("p.gh-members-list-email");
    let targetEmailElement = null;

    for (const element of emailElements) {
      const text = await element.getText();
      if (text.trim() === email) {
        targetEmailElement = element;
        break;
      }
    }

    if (!targetEmailElement) {
      throw new Error(`No se encontró ningún miembro con el email: ${email}`);
    }

    let parentElement = await targetEmailElement.parentElement();
    while (parentElement) {
      const tagName = await parentElement.getTagName();
      if (tagName === "tr") {
        break;
      }
      parentElement = await parentElement.parentElement();
    }

    if (!parentElement) {
      throw new Error(
        `No se pudo encontrar el contenedor <tr> para el email: ${email}`
      );
    }

    const nameElement = await parentElement.$("h3.gh-members-list-name");
    const nameText = await nameElement.getText();

    expect(nameText.trim()).to.equal(updatedName);
  },

  clickDeleteMemberBase: async function (driver) {
    // Encuentra todos los botones que coincidan con las clases específicas
    const buttons = await driver.$$("button.gh-btn.gh-btn-red.gh-btn-icon");

    for (const button of buttons) {
      // Haz scroll hasta el botón
      await button.scrollIntoView();

      // Verifica si el botón es visible después del scroll
      const isVisible = await button.isDisplayed();

      if (isVisible) {
        // Obtiene el texto del botón
        const text = await button.getText();

        // Compara el texto con "Delete member"
        if (text.trim().includes("Delete member")) {
          // Si el botón es visible y contiene el texto esperado, haz clic
          return button.click();
        }
      }
    }

    // Si no se encuentra un botón válido, lanza un error
    throw new Error('No se encontró el botón "Delete member".');
  },

  clickNewMemberBase: async function (driver) {
    let clicButton = await driver.$('[href="#/members/new/"]');
    return clicButton.click({ force: true });
  },

  clickSaveMemberBase: async function (driver) {
    let saveButton = await driver.$('button.gh-btn.gh-btn-primary.gh-btn-icon');
    return saveButton.click();
  },

  goToListMembersBase: async function (driver) {
    let listButton = await driver.$('[href="#/members/"]');
    return listButton.click();
  }
};
