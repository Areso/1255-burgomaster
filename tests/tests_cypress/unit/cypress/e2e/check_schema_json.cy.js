import { artSchema } from '../schemas/artifacts_schema'
import { technologySchema } from '../schemas/technology_tree_schema'

describe('Сhecking object properties in file: ', () => {

  beforeEach(() => {
    cy.visit('/')

    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });

    //close windows canvas
    cy.window().then((win) => {
      win.eval('document.getElementById("myDCanvas").classList.remove("active-modal")');
    });

  })

  it('Valid JSON object artifact ', () => {
    
    // *********************************************************************
    //     Checking the schema file objects_artifacts.js
    // *********************************************************************
    
    let artefacts;
    let checkArt;

    cy.window().then((win) => {

      artefacts = win.eval('Object.keys(artefacts)');
      artefacts.forEach(function (item) {
        checkArt = win.eval('artefacts.' + item);
        expect(checkArt, item).to.be.jsonSchema(artSchema);
      });
    });
  })

  it('Сhecking for the presence of property "artefactsWorn" for object artid', () => {

    cy.window().then((win) => {

      let artefacts;
      let checkArt;

      artefacts = win.eval('Object.keys(artefacts)');

      console.log(artefacts);
      artefacts.forEach(function (item) {
        checkArt = win.eval('artefacts.' + item);

        if (checkArt.type == 'artefactsWorn') {
          expect(checkArt, item + ' have the property "artefactsWorn"').to.property('artefactsWorn')
        }
        else {
          expect(checkArt, item + ' does not have the property "artefactsWorn"').to.not.property('artefactsWorn');
        }
      });
    });
  })

  it('Valid JSON object technology tree', () => {

    // *********************************************************************
    //     Checking the schema file objects_technology_tree.js
    // *********************************************************************

    let techList;
    let checkTech;

    cy.window().then((win) => {
      techList = win.eval('Object.keys(tech_list)');

      techList.forEach(function (item) {
        checkTech = win.eval('tech_list.' + item);
        expect(checkTech, item).to.be.jsonSchema(technologySchema);
      })
    })
  })
})