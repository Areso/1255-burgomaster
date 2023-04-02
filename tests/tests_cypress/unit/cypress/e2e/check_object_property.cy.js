import artefacts from '../../../../../js/objects_artifacts'
import tech_list from '../../../../../js/objects_technology_tree'

describe('Сhecking object properties in file: ', () => {
   
    it('Сhecking object properties file objects_technology_tree.js', () => {

        // *********************************************************************
        //     Checking the file objects_technology_tree.js
        // *********************************************************************

        let techKey;
        let checkTech;
        let tempCheckTech;

        techKey = Object.keys(tech_list);

        techKey.forEach(function (item) {
            checkTech = tech_list[item];

            techKey.forEach(function (tempItem) {
                tempCheckTech = tech_list[tempItem];

                if (checkTech === tempCheckTech) {
                    expect(tempCheckTech.id).to.eql(checkTech.id);
                    expect(tempCheckTech.name['default'], tempItem).to.eql(checkTech.name['default']);
                    expect(tempCheckTech.name['en-US'], tempItem).to.eql(checkTech.name['en-US']);
                    expect(tempCheckTech.name['ru-RU'], tempItem).to.eql(checkTech.name['ru-RU']);
                } else {
                    if (tempCheckTech.id === checkTech.id) {
                        expect(tempCheckTech.id, tempItem + " duplicates the property of the " + item).to.not.eql(checkTech.id)
                    }
                    if (tempCheckTech.name['default'] === checkTech.name['default'] ||
                        tempCheckTech.name['en-US'] === checkTech.name['en-US'] ||
                        tempCheckTech.name['ru-RU'] === checkTech.name['ru-RU']
                    ) {
                        expect(tempCheckTech.name['default'], tempItem + " duplicates the property of the " + item).to.not.eql(checkTech.name['default']);
                        expect(tempCheckTech.name['en-US'], tempItem + " duplicates the property of the " + item).to.not.eql(checkTech.name['en-US']);
                        expect(tempCheckTech.name['ru-RU'], tempItem + " duplicates the property of the " + item).to.not.eql(checkTech.name['ru-RU']);
                    }
                }
            })

        })
    });

    it('Сhecking object properties file objects_artifacts.js', () => {

        // *********************************************************************
        //     Checking the file objects_artifacts.js
        // *********************************************************************

        let artefactsKey;
        let checkArt;
        let tempCheckArt;

        artefactsKey = Object.keys(artefacts);

        artefactsKey.forEach(function (item) {
            checkArt = artefacts[item];

            artefactsKey.forEach(function (tempItem) {
                tempCheckArt = artefacts[tempItem];

                if (checkArt === tempCheckArt) {
                    expect(tempCheckArt.id).to.eql(checkArt.id);
                    expect(tempCheckArt.name['default']).to.eql(checkArt.name['default']);
                    expect(tempCheckArt.name['en-US']).to.eql(checkArt.name['en-US']);
                    expect(tempCheckArt.name['ru-RU']).to.eql(checkArt.name['ru-RU']);
                } else {
                    if (tempCheckArt.id === checkArt.id) {
                        expect(tempCheckArt.id, tempItem + " duplicates the property of the " + item).to.not.eql(checkArt.id)
                    }
                    if (tempCheckArt.name['default'] === checkArt.name['default'] ||
                        tempCheckArt.name['en-US'] === checkArt.name['en-US'] ||
                        tempCheckArt.name['ru-RU'] === checkArt.name['ru-RU']
                    ) {
                        expect(tempCheckArt.name['default'], tempItem + " duplicates the property of the " + item).to.not.eql(checkArt.name['default']);
                        expect(tempCheckArt.name['en-US'], tempItem + " duplicates the property of the " + item).to.not.eql(checkArt.name['en-US']);
                        expect(tempCheckArt.name['ru-RU'], tempItem + " duplicates the property of the " + item).to.not.eql(checkArt.name['ru-RU']);
                    }
                }
            })

        })

    });
});
