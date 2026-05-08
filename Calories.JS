const CalculeGra = (InputQ, CalorieG) => (+InputQ / 100) * +CalorieG;
const CalculeUnit = (InputQ, CalorieUn) => (+InputQ * +CalorieUn);

const calculer = () => {
    let total = 0;
    let compt = 0;
    let errors = [];
    let Result = document.getElementById('resultat');

    const config = [
        { chk: 'checkP', qty: 'qtyPain', cal: 275, fn: CalculeGra },
        { chk: 'checkV', qty: 'qtyViande', cal: 180, fn: CalculeGra },
        { chk: 'checkL', qty: 'qtyLegumes', cal: 40, fn: CalculeUnit },
        { chk: 'checkB', qty: 'qtyBanane', cal: 160, fn: CalculeUnit },
        { chk: 'checkPm', qty: 'qtyPomme', cal: 80, fn: CalculeUnit },
        { chk: 'checkY', qty: 'qtyYaourt', cal: 140, fn: CalculeUnit }
    ];

    config.forEach(element => {
        let Check = document.getElementById(element.chk);
        let Inputs = document.getElementById(element.qty);
        if (Check.checked) {
            compt++;
            if (!Inputs.value) {
                errors.push(element.qty);
                

            }
            else {
                
                total += element.fn(Inputs.value, element.cal);
            }
        }



    })
    if (!compt) {
        alert('tu doit selectioner au moin une input');
    }
    else {
        if (errors.length) {
            alert('vous devez remplir la zone ' + errors);
        }
        else {
            Result.value = total.toFixed(2);
        }
    }

}
