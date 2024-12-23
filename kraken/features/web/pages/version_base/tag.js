module.exports = {
    getTitleTagSectionBS: async function (driver) {
      let titleField = await driver.$("h2.gh-canvas-title");
      // Verificar que el texto del elemento contenga 'Tags'
      let text = await titleField.getText();
      if (text.includes("Tags")) {
        console.log('El título contiene "Tags".');
      } else {
        console.log('El título no contiene "Tags".');
      }
      return titleField.getText();
    },
  
    clickNewTagBS: async function (driver) {
      let clicButton = await driver.$(
        '[class="ember-view gh-btn gh-btn-primary"]'
      );
      return clicButton.click({ force: true });
    },
    writeNameTagBS: async function (driver, name) {
      let textField = await driver.$("#tag-name");
      await textField.setValue(name);
    },
    clickDescriptionTagBS: async function (driver) {
      let contentField = await driver.$("#tag-description");
      return contentField.click({ force: true });
    },
    writeDescriptionTagBS: async function (driver, description) {
      let textField = await driver.$("#tag-description");
      await textField.setValue(description);
    },
    clickNewTagSaveBS: async function (driver) {
      let clicButton = await driver.$('[class="gh-btn gh-btn-primary gh-btn-icon ember-view"]');
      return clicButton.click({ force: true });
    },
  
    clickDeleteTagBS: async function (driver) {
      // await driver.executeScript('window.scrollTo(0, document.body.scrollHeight);');
  
      // await driver.pause(2000); 
      let clicButton = await driver.$('[data-test-button="delete-tag"]');
      return clicButton.click({ force: true });
    },
  
    clickDeleteConfirmTagBS: async function (driver) {
      let clicButton = await driver.$('[data-test-button="confirm"]');
      return clicButton.click({ force: true });
    },
  
    lastTagCreatedBS: async function (driver, name, flag) {
      // Obteniendo todos los enlaces con el atributo correcto
      let enlaces = await driver.$$("h3.gh-tag-list-name");
      let enlaceEncontrado = false;
  
      console.log("tagName", name);
  
      if (flag === "notClick") {
        for (let enlace of enlaces) {
          let text = await enlace.getText();
          console.log("enlace:", text.trim());
          if (text.trim().toLowerCase() === name.toLowerCase()) {
            enlaceEncontrado = true;
            break;
          }
        }
  
        if (enlaceEncontrado) {
          console.log('El enlace con el title "' + name + '" existe.');
        } else {
          console.log('El enlace con el title "' + name + '" no existe.');
        }
      } else if (flag === "click") {
        if (enlaceEncontrado) {
          await enlace.click({ force: true });
        } else {
          console.log(
            'El enlace con el title "' +
              name +
              '" no existe, no se puede hacer clic.'
          );
        }
      } else {
        if (enlaceEncontrado) {
          await enlace.click({ button: "Edit tag", force: true });
          console.log("Click en Edit tag");
        } else {
          console.log(
            'El enlace con el title "' +
              name +
              '" no existe, no se puede hacer clic.'
          );
        }
      }
    },
  
    clicTagBS: async function (driver, name) {
      let enlaces = await driver.$$(
        '.gh-tags-list-item a[title="Edit tag"].gh-tag-list-title'
      );
      for (let enlace of enlaces) {
        let text = await enlace.getText();
        console.log("Enlace:", text);
        if (text.includes(name)) {
          console.log("Entra: ", text);
          await enlace.click({ force: true });
          break;
        }
        console.log("No entra: ", text);
      }
    },
  
    clickNewTagValidateBS: async function (driver) {
      return await this.lastTagCreatedBS(driver, "New Tag", "notClick");
    },

    clickNombreTagBS: async function (driver) {
      let clic = await driver.$('#tag-name');
      return await clic.click({ force: true });
    }
  };
  