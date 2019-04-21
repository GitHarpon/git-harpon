export class MetaCommit {
    typeCommit: string; // Description visuelle de la branche en cours Match 1
    // Match 2 et 3: useless ?
    // Match 4 : test pour savoir si "message relation" ou pas
    hash: string; // Match 5
    date: string; // Match 6
    dispName: string; // Match 7
    mail: string; // Match 8
    littlehash: string; // Match 9
    commitMsg: string; // Match 10
}
