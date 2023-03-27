
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

    it('Сhecking object properties', () => {

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
                console.log("item ==>> " + item);
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
                            expect(tempCheckArt.id).to.not.eql(checkArt.id)
                        }
                        if (tempCheckArt.name['default'] === checkArt.name['default']) {
                            expect(tempCheckArt.name['default']).to.not.eql(checkArt.name['default']);
                        }
                        if (tempCheckArt.name['en-US'] === checkArt.name['en-US']) {
                            expect(tempCheckArt.name['en-US']).to.not.eql(checkArt.name['en-US']);
                        }
                        if (tempCheckArt.name['ru-RU'] === checkArt.name['ru-RU']) {
                            expect(tempCheckArt.name['ru-RU']).to.not.eql(checkArt.name['ru-RU']);
                        }
                    }
                })

            })

        });
    });
});
