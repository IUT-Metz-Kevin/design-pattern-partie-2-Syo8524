/*
Scénario A - Mortel Kebap

    Design Pattern : State (État)
*/
interface Action {
  executer(): void;
}

class ActionInactif implements Action {
  executer(): void {
    console.log("Le personnage ne fait rien.");
  }
}

class ActionAttaquer implements Action {
  executer(): void {
    console.log("Le personnage attaque !");
  }
}

class ActionSeDeplacer implements Action {
  executer(): void {
    console.log("Le personnage se déplace.");
  }
}

class ActionSauter implements Action {
  executer(): void {
    console.log("Le personnage saute !");
  }
}

class ActionEtourdi implements Action {
  executer(): void {
    console.log("Le personnage est étourdi et ne peut rien faire.");
  }
}

interface EtatPersonnage {
  inactif(): void;
  attaquer(): void;
  seDeplacer(): void;
  sauter(): void;
}

class EtatInactif implements EtatPersonnage {
  private personnage: PersonnageJeu;

  constructor(personnage: PersonnageJeu) {
    this.personnage = personnage;
  }

  inactif(): void {
    new ActionInactif().executer();
  }

  attaquer(): void {
    console.log("Transition vers l'état d'attaque.");
    this.personnage.definirEtat(new EtatAttaque(this.personnage));
    this.personnage.attaquer();
  }

  seDeplacer(): void {
    console.log("Transition vers l'état de déplacement.");
    this.personnage.definirEtat(new EtatSeDeplacer(this.personnage));
    this.personnage.seDeplacer();
  }

  sauter(): void {
    console.log("Transition vers l'état de saut.");
    this.personnage.definirEtat(new EtatSaut(this.personnage));
    this.personnage.sauter();
  }
}

class EtatAttaque implements EtatPersonnage {
  private personnage: PersonnageJeu;

  constructor(personnage: PersonnageJeu) {
    this.personnage = personnage;
  }

  inactif(): void {
    console.log("Impossible de passer à l'état d'inaction pendant une attaque.");
  }

  attaquer(): void {
    new ActionAttaquer().executer();
  }

  seDeplacer(): void {
    console.log("Impossible de se déplacer pendant une attaque.");
  }

  sauter(): void {
    console.log("Impossible de sauter pendant une attaque.");
  }
}

class EtatSeDeplacer implements EtatPersonnage {
  private personnage: PersonnageJeu;

  constructor(personnage: PersonnageJeu) {
    this.personnage = personnage;
  }

  inactif(): void {
    console.log("Transition vers l'état d'inaction.");
    this.personnage.definirEtat(new EtatInactif(this.personnage));
    this.personnage.inactif();
  }

  attaquer(): void {
    console.log("Transition vers l'état d'attaque.");
    this.personnage.definirEtat(new EtatAttaque(this.personnage));
    this.personnage.attaquer();
  }

  seDeplacer(): void {
    new ActionSeDeplacer().executer();
  }

  sauter(): void {
    console.log("Transition vers l'état de saut.");
    this.personnage.definirEtat(new EtatSaut(this.personnage));
    this.personnage.sauter();
  }
}

class EtatSaut implements EtatPersonnage {
  private personnage: PersonnageJeu;

  constructor(personnage: PersonnageJeu) {
    this.personnage = personnage;
  }

  inactif(): void {
    console.log("Transition vers l'état d'inaction après le saut.");
    this.personnage.definirEtat(new EtatInactif(this.personnage));
    this.personnage.inactif();
  }

  attaquer(): void {
    console.log("Transition vers l'état d'attaque pendant le saut.");
    this.personnage.definirEtat(new EtatAttaque(this.personnage));
    this.personnage.attaquer();
  }

  seDeplacer(): void {
    console.log("Impossible de se déplacer en l'air.");
  }

  sauter(): void {
    new ActionSauter().executer();
  }
}

class EtatEtourdi implements EtatPersonnage {
  private personnage: PersonnageJeu;

  constructor(personnage: PersonnageJeu) {
    this.personnage = personnage;
  }

  inactif(): void {
    new ActionEtourdi().executer();
  }

  attaquer(): void {
    new ActionEtourdi().executer();
  }

  seDeplacer(): void {
    new ActionEtourdi().executer();
  }

  sauter(): void {
    new ActionEtourdi().executer();
  }
}

class PersonnageJeu {
  private etatCourant: EtatPersonnage;

  constructor() {
    this.etatCourant = new EtatInactif(this);
  }

  definirEtat(nouvelEtat: EtatPersonnage): void {
    this.etatCourant = nouvelEtat;
  }

  inactif(): void {
    this.etatCourant.inactif();
  }

  attaquer(): void {
    this.etatCourant.attaquer();
  }

  seDeplacer(): void {
    this.etatCourant.seDeplacer();
  }

  sauter(): void {
    this.etatCourant.sauter();
  }

  etourdir(): void {
    console.log("Le personnage est étourdi !");
    this.definirEtat(new EtatEtourdi(this));
    // Simuler la fin de l'étourdissement après quelques secondes
    setTimeout(() => {
      console.log("Le personnage n'est plus étourdi.");
      this.definirEtat(new EtatInactif(this));
      this.inactif();
    }, 3000);
  }
}

// Utilisation
const heros = new PersonnageJeu();
heros.inactif();
heros.attaquer();
heros.seDeplacer();
heros.sauter();
heros.attaquer();
heros.etourdir();
heros.attaquer(); // Tentative d'attaquer pendant l'étourdissement
setTimeout(() => heros.seDeplacer(), 4000); // Tentative de se déplacer après l'étourdissement
