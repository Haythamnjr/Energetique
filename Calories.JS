const CalculeGra = (InputQ, CalorieG) => (+InputQ / 100) * +CalorieG;
const CalculeUnit = (InputQ, CalorieUn) => (+InputQ * +CalorieUn);
const getError = (element, comment) => {
    const span = document.createElement('span');
    span.innerText = comment;
    span.classList.add('error');
    element.after(span);
}
const calculer = () => {
    let total = 0;
    let compt = 0;
    let valide = false;
    let Result = document.getElementById('resultat');
    let button = document.querySelector('button');
    const config = [
        { chk: 'checkP', qty: 'qtyPain', cal: 275, fn: CalculeGra },
        { chk: 'checkV', qty: 'qtyViande', cal: 180, fn: CalculeGra },
        { chk: 'checkL', qty: 'qtyLegumes', cal: 40, fn: CalculeUnit },
        { chk: 'checkB', qty: 'qtyBanane', cal: 160, fn: CalculeUnit },
        { chk: 'checkPm', qty: 'qtyPomme', cal: 80, fn: CalculeUnit },
        { chk: 'checkY', qty: 'qtyYaourt', cal: 140, fn: CalculeUnit }
    ];
    const Error = document.querySelectorAll('.error');
    Error.forEach(ell => ell.remove());
    config.forEach(element => {
        let Check = document.getElementById(element.chk).checked;
        let Inputs = document.getElementById(element.qty).value;
        if (Check) {
            compt++;
            if (!Inputs) {
                getError(Inputs, `Remplissez ${Inputs.id} cette case`);
                valide = false;

            }
            else {
                
                total += element.fn(Inputs.value, element.cal);
                valide = true;
            }
        }



    })
    if (!compt) {
        getError(button, "Tu dois sélectionner au moins une option");
    }
    else {
        if (!valide) {
            getError(button, "Corrigez les erreurs ci-dessus");
            Result.value = "Invalide";
            
        }
        else {
            Result.value = total.toFixed(2);
            valide = true;
        }
    }

}
