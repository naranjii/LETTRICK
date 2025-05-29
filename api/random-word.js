export default function handler(req, res) {
  const words = [
    "CASA", "CARRO", "CAVAL", "PEDRA", "FLORA", "PLUMA", "BOLSA", "MANGA", "PRATO", "FOGAR",
    "PRAIA", "NINHO", "SERRA", "TORRE", "LUZES", "VENTO", "CORPO", "RODA", "FONTE", "TERRA",
    "BICHO", "CRAVO", "PALMA", "FOLHA", "BANCO", "RUMOR", "RADIO", "CAMPO", "COBRA", "FONDA",
    "AVISO", "LAGOA", "MORTE", "BARCO", "MELAO", "BATOM", "GRUTA", "BALDE", "NARIZ", "LIVRO",
    "BARRA", "AMIGO", "BONÉ", "FAROL", "RÉGUA", "FESTA", "PRATA", "CORAL", "FIRME", "VIGOR"
]
  const randomIndex = Math.floor(Math.random() * words.length);
  res.status(200).json({ word: words[randomIndex] });
}