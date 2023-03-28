
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

    it('Сhecking object properties file objects_technology_tree.js', () => {

        // *********************************************************************
        //     Checking the file objects_technology_tree.js
        // *********************************************************************

        let techList;
        let checkTech;
        let tempCheckTech;

        cy.window().then((win) => {
            techList = win.eval('Object.keys(tech_list)');

            techList.forEach(function (item) {
                checkTech = win.eval('tech_list.' + item);

                techList.forEach(function (tempItem) {
                    tempCheckTech = win.eval('tech_list.' + tempItem);

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
    });

    it('Сhecking object properties file objects_artifacts.js', () => {

        // *********************************************************************
        //     Checking the file objects_artifacts.js
        // *********************************************************************

        let artefacts;
        let checkArt;
        let tempCheckArt;

        cy.window().then((win) => {
            artefacts = win.eval('Object.keys(artefacts)');

            console.log(artefacts);
            artefacts.forEach(function (item) {
                checkArt = win.eval('artefacts.' + item);

                artefacts.forEach(function (tempItem) {
                    tempCheckArt = win.eval('artefacts.' + tempItem);

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
});
