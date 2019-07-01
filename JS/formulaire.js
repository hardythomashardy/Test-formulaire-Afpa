window.onload = function () {

    //classe livre
    class Livre {
        constructor(titre, reference, prix) {
            this._libelle = titre;
            this._reference = reference;
            this._prix = prix;
        }
        get titre() {
            return this._libelle;
        }
        get reference() {
            return this._reference;
        }
        get prix() {
            return this._prix;
        }
    }

    //creation des Articles
    let tableauLivre = [];

    tableauLivre[0] = new Livre("Ouioui va au poney", 'ref654987545654', 12);
    tableauLivre[1] = new Livre("Le cantique des quantiques", 'ref15698745', 21);
    tableauLivre[2] = new Livre("Patience dans l'azur", 'ref65189753', 5.5);
    tableauLivre[3] = new Livre("Babar fait du sport", 'ref48972561', 12.2);
    tableauLivre[4] = new Livre("Une couille dans le potage", 'ref3000215', 69);
    tableauLivre[5] = new Livre("tromblon d'un autre age", 'ref97456321', 90);

    let nbLine = 1;
    line();

    PrixTotal = document.getElementById('total').value = '0';
    

    function line() {

        let newLine = document.getElementById('newLine');

        let article = newLine.getElementsByClassName('Article')[0];
        let refLivre = document.getElementsByClassName('Reference')[0];
        let prixU = document.getElementsByClassName('PrixUnitaire')[0];
        let qte = document.getElementsByClassName('Quantité')[0];
        let prixT = document.getElementsByClassName('PrixTotal')[0];
        let btnLess = document.getElementsByClassName('lessButton')[0];

        let newSelector = document.createElement('select');
        newSelector.setAttribute('class', 'selectorInput');

        let newRef = document.createElement('input');
        newRef.setAttribute('type', 'text');
        newRef.readOnly = true;
        newRef.setAttribute('class', 'refInput');
        refLivre.appendChild(newRef);

        let newPrix = document.createElement('input');
        newPrix.setAttribute('type', 'text');
        newPrix.readOnly = true;
        newPrix.setAttribute('class', 'prixInput');
        prixU.appendChild(newPrix);

        let newQte = document.createElement('input');
        newQte.setAttribute('type', 'text');
        //newQte.readOnly = true;
        newQte.setAttribute('class', 'qteInput');
        qte.appendChild(newQte);

        let newPrixT = document.createElement('input');
        newPrixT.setAttribute('type', 'text');
        newPrixT.readOnly = true;
        newPrixT.setAttribute('class', 'prixCalcul');
        prixT.appendChild(newPrixT);

        let newBTNLess = document.createElement('input');
        newBTNLess.setAttribute('type', 'button');
        newBTNLess.className = 'btn btn-secondary lessButton';
        newBTNLess.value = '-';
        newBTNLess.id = 'lessButton';
        btnLess.appendChild(newBTNLess);

        let optionVide = document.createElement('option');
        optionVide.text = "-----";
        newSelector.appendChild(optionVide);

        //pour chaque element du tableau (boucle foreach) de livre on créer
        //une option qui va à la fin dans le newSelector 

        tableauLivre.forEach(element => {
            let option = document.createElement('option');
            option.text = element.titre;
            newSelector.appendChild(option);
        })

        article.appendChild(newSelector);
        newSelector.addEventListener('change', choixLivre);

        let qteInput = document.getElementsByClassName('qteInput')[0];
        let selectorInput = document.getElementsByClassName('selectorInput')[0];
        qteInput.addEventListener('change', calculPrix);
        selectorInput.addEventListener('change', calculPrix);

        let lessButton = document.getElementsByClassName('lessButton')[0];
        lessButton.addEventListener('click', removeLine);
    }


    function choixLivre() {

        let refArticle = 0;
        let prixArticle = 0;

        if (this.selectedIndex > 0) {
            refArticle = tableauLivre[this.selectedIndex - 1].reference; //get id
            prixArticle = tableauLivre[this.selectedIndex - 1].prix;

        }
        this.parentNode.parentNode.getElementsByClassName('refInput')[0].value = refArticle;
        this.parentNode.parentNode.getElementsByClassName('prixInput')[0].value = prixArticle;
        this.parentNode.parentNode.getElementsByClassName('prixCalcul')[0].value = '0';
    }

    function calculPrix() {

        let prixTotal = 0;
        let parsQteInput = parseInt(this.parentNode.parentNode.getElementsByClassName('qteInput')[0].value); //qteInput.value
        let numInputPrix = Number(this.parentNode.parentNode.getElementsByClassName('prixInput')[0].value);

        prixTotal = numInputPrix * parsQteInput;
        if (Number.isNaN(prixTotal)) {
            return 0;
        }
        console.log(parsQteInput);

        this.parentNode.parentNode.getElementsByClassName('prixCalcul')[0].value = prixTotal;

        calculTotal();
    }


    let addButton = document.getElementById('addButton');
    addButton.addEventListener('click', addLine);

    function addLine() {

        let original = document.getElementsByClassName('line')[0];

        let clone = original.cloneNode(true);
        nbLine++;
        clone.id = 'line' + nbLine;

        let corpsTable = document.getElementById('corpsTable');

        corpsTable.appendChild(clone);

        let cloneSelect = clone.getElementsByClassName('selectorInput')[0];
        cloneSelect.addEventListener('change', choixLivre);

        let qteInput = clone.getElementsByClassName('qteInput')[0];
        let selectorInput = clone.getElementsByClassName('selectorInput')[0];
        qteInput.addEventListener('change', calculPrix);
        selectorInput.addEventListener('change', calculPrix);

        let lessButton = clone.getElementsByClassName('lessButton')[0];
        lessButton.addEventListener('click', removeLine);

        clone.getElementsByClassName('refInput')[0].value = '';
        clone.getElementsByClassName('prixInput')[0].value = '';
        clone.getElementsByClassName('qteInput')[0].value = '';
        clone.getElementsByClassName('prixCalcul')[0].value = '0';
    }


    function removeLine() {

        let corpsTable = document.getElementById('corpsTable');
        let line = this.parentNode;

        if (corpsTable.childNodes.length != 3) {
            console.log(corpsTable.childNodes.length);
            line.remove();

        } else {
            line.getElementsByClassName('refInput')[0].value = '';
            line.getElementsByClassName('prixInput')[0].value = '';
            line.getElementsByClassName('qteInput')[0].value = '';
            line.getElementsByClassName('prixCalcul')[0].value = '0';
            line.getElementsByClassName('selectorInput')[0].selectedIndex = '0'; //set
        }
        calculTotal();

    }

    function calculTotal() {

        let totalCalcul = document.getElementsByClassName('prixCalcul');
        let total = document.getElementById('total');
        let resultat = 0;

        for (let i = 0; i < totalCalcul.length; i++) {

            resultat += parseInt(totalCalcul[i].value);

        }

        total.value = resultat;
    }
}