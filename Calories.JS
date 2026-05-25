const CalculeGra = (InputQ, CalorieG) => (+InputQ / 100) * +CalorieG;
const CalculeUnit = (InputQ, CalorieUn) => (+InputQ * +CalorieUn);
const CalculeCarbsGra = (InputQ, Carbs) => (+InputQ * +Carbs) / 100;
const CalculerCarbsUnit = (InputQ, Carbs) => +InputQ * +Carbs;
const getError = (element, comment) => {
    const span = document.createElement('span');
    span.innerText = comment;
    span.classList.add('error');
    element.insertAdjacentElement('afterend' ,span);
    setTimeout(() => span.remove(), 8000);
    span.scrollIntoView({
        "behavior": "smooth",
        "block": "center"
    });
    element.focus();



}
const div = document.getElementById('conTdiaBt');
div.classList.remove('container-diabet');

const Change = (e) => {
    div.classList.toggle('container-diabet', e.value === "diabete");
}

const Valide = (element, comment) => {
    const span = document.createElement('span');
    span.innerText = comment;
    span.classList.add('valide');
    element.after(span);
}

const Attention = (element, comment) => {
    const span = document.createElement('span');
    span.innerText = comment;
    span.classList.add('Attention');
    element.after(span);
    setTimeout(() => span.remove(), 8000);
    span.scrollIntoView({
        "behavior": "smooth",
        "block": "center"
    });

}
const calculer = () => {
    let total = 0;
    let totalGl = 0;
    let compt = 0;
    let Result = document.getElementById('resultat');
    let diabetResult = document.getElementById('resultDia');
    let button = document.querySelector('button');
    let valide = false;
    const InputsCheck = document.getElementsByName('Cho');

    const config = [
        { chk: 'checkP', qty: 'qtyPain', cal: 275, gi: 70, carbs: 50, fn: CalculeGra, f: CalculeCarbsGra },
        { chk: 'checkV', qty: 'qtyViande', cal: 180, gi: 0, carbs: 0, fn: CalculeGra, f: CalculeCarbsGra },
        { chk: 'checkL', qty: 'qtyLegumes', cal: 40, gi: 15, carbs: 5, fn: CalculeGra, f: CalculeCarbsGra },
        { chk: 'checkB', qty: 'qtyBanane', cal: 160, gi: 50, carbs: 22, fn: CalculeUnit, f: CalculerCarbsUnit },
        { chk: 'checkPm', qty: 'qtyPomme', cal: 80, gi: 35, carbs: 14, fn: CalculeUnit, f: CalculerCarbsUnit },
        { chk: 'checkY', qty: 'qtyYaourt', cal: 140, gi: 15, carbs: 5, fn: CalculeUnit, f: CalculerCarbsUnit }
    ];
    const valid = document.querySelectorAll('.valide');
    const Attentions = document.querySelectorAll('.Attention');
    const Error = document.querySelectorAll('.error');
    valid.forEach(ele=>ele.remove());
    Attentions.forEach(ele=>ele.remove());
    Error.forEach(ell => ell.remove());
    config.forEach(element => {
        let Check = document.getElementById(element.chk);
        let Inputs = document.getElementById(element.qty);
        if (Check.checked) {
            compt++;
            if (!Inputs.value) {
                getError(Inputs, `Remplissez ${Inputs.id} cette case`);


            }else if(Inputs.value < 0){
                getError(Inputs, `Le nombre doit être positive`);
            }else if(isNaN(Inputs.value)){
                getError(Inputs, `Entrer un nombre`);
            }
            else {
                let Calorie = (element.fn === CalculeGra) ? CalculeGra : CalculeUnit;
                total += element.fn(Inputs.value, element.cal) || 0;
                valide = true;
                if (InputsCheck[0].checked) {
                    let Carbs = (element.f === CalculeCarbsGra) ? CalculeCarbsGra : CalculerCarbsUnit;
                    let CarbosCalcul = element.f(Inputs.value, element.carbs) || 0;
                    totalGl += (CarbosCalcul * element.gi) / 100;
                    switch (true) {
                        case totalGl >= 0 && totalGl <= 10:
                            Valide(button, "Charge Glycémique Faible : Repas excellent et sécurisé pour les diabétiques.");
                            break;
                        case totalGl > 11 && totalGl < 19:
                            Attention(button, "Charge Glycémique Modérée : À consommer avec modération.");
                            break;
                        case totalGl >= 20:
                            getError(button , "Charge Glycémique Élevée : Attention ! Risque de pic de glycémie élevé.");
                            break;

                    }

                }

            }
        }



    })
    switch (true) {
        case !InputsCheck[0].checked && !InputsCheck[1].checked:
            Attention(InputsCheck[0], "Veuillez choisir au moins une catégorie !");
            return;
        case !compt:
            getError(button, "Tu dois sélectionner au moins une option");
            break;


    }




    if (compt) {
        if (!valide) {
            Result.value = 0;
            diabetResult.value = 0;
            Result.style.color = "red";
            diabetResult.style.color = "red";
        }
        else {
            Result.value = total.toFixed(2) + " Kilo Calories";
            diabetResult.value = totalGl.toFixed(2) + " Points";
            Result.style.color = 'black';
            diabetResult.style.color = 'black';
            valide = true;



        }
    }


}
