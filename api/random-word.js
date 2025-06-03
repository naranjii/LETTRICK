export default function handler(req, res) {
  const words = [
  "AMIGO", "BRAVO", "CLARO", "DOCES", "FESTA",
  "GRATO", "HUMOR", "JOVEM", "LIVRO", "MAGIA",
  "NUVEM", "PIANO", "QUERO", "RISOS", "SOLAR",
  "TIGRE", "UNIAO", "VENTO", "ZELAR", "BALAO",
  "CIRCO", "ELITE", "FOLIA", "GENTE",
  "HASTE", "IDEAL", "JANIO", "KARMA", "LIMAO",
  "MIMOS", "NOITE", "OLHAR", "PRADO", "QUIET",
  "ROLAR", "SABER", "TEMPO", "UNICO", "VIGOR",
  "ZEBRA", "BANDO", "CACAU", "DELTA", "ENFIM",
  "FICOU", "GRAVE", "HOTEL", "IDEIA", "JULHO",
  "LINHA", "MUNDO", "NINHO", "PULAR",
  "QUERO", "ROCHA", "SABIA", "TINHA", "URUBU",
  "VALOR",, "YACHT", "ACIDO",
  "BANCO", "CANTO", "DENTE", "FELIZ",
  "GANHO", "HABIL", "ILUDE", "JUNTO", "LEITE",
  "NORTE", "OUVIR", "PRAZO",
  "SALTO", "TERMO", "UNIDA", "VISTA",
  "ZELDA", "BEBER", "CHAVE", "DANOS", "EXITO",
  "FONTE", "GIRAR", "HORAS", "IMPAR", "JOGAR",
  "LATAS", "MURAL", "OSTRA", "PENAL",
  "QUERO", "RIMAR", "SABOR", "TINTA", "URINA",
  "VELAR", "XAMPU", "ZUMBI", "BLOCO",
  "CREPE", "DENTE", "ESQUI", "FREVO", "GENTE",
  "HASTE", "IDEAL", "JUNTA", "LOUSA", "MIRAR",
  "NINFA", "ORDEM", "PODER", "QUOTE", "RITMO",
  "SALVE", "TEXTO", "URUBU", "VIVER"
]
  const randomIndex = Math.floor(Math.random() * words.length);
  res.status(200).json({ word: words[randomIndex] });
}