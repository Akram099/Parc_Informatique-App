export interface Requete{
    num_Identification: string,
    description: string,
    date_prise_en_charge: Date,
    date_cloture: Date | null,
    etat_Requete: string,
    administrateur_ID: string,
    technicien_ID: string,
    fonctionnaire_ID: string
}