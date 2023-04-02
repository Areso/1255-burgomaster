import { artSchema } from '../schemas/artifacts_schema'
import { technologySchema } from '../schemas/technology_tree_schema'
import  artefacts  from '../../../../../js/objects_artifacts'
import  tech_list  from '../../../../../js/objects_technology_tree'


describe('Сhecking object properties in file: ', () => {
  
  it('Valid JSON object artifact ', () => {
    
    // *********************************************************************
    //     Checking the schema file objects_artifacts.js
    // *********************************************************************
    
    let artefactsKey;
    artefactsKey = Object.keys(artefacts);
    artefactsKey.forEach(function (item) {
      expect(artefacts[item], item).to.be.jsonSchema(artSchema);
    });
  })

  it('Сhecking for the presence of property "artefactsWorn" for object artid', () => {

    let artefactsKey;

    artefactsKey = Object.keys(artefacts);
    artefactsKey.forEach(function (item) {
      if (artefacts[item].type == 'artefactsWorn') {
        expect(artefacts[item], item + ' have the property "artefactsWorn"').to.property('artefactsWorn')
      }
      else {
        expect(artefacts[item], item + ' does not have the property "artefactsWorn"').to.not.property('artefactsWorn');
      }
    });
  })

  it('Valid JSON object technology tree', () => {

    // *********************************************************************
    //     Checking the schema file objects_technology_tree.js
    // *********************************************************************

    let techKey;
    const technologyO = tech_list;
    techKey = Object.keys(technologyO);
    techKey.forEach(function (item) {
      expect(technologyO[item], item).to.be.jsonSchema(technologySchema);
    });
  })
})