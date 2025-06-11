// Executar com: node gerar-lista.js
const fs = require("fs");

const pasta = "./Logos";
const arquivos = fs.readdirSync(pasta)
  .filter(f => f.toLowerCase().endsWith(".png"))
  .map(f => `"./Logos/${f}"`);

const output = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Slideshow de Logos</title>
  <style>
    html, body {
      margin: 0;
      padding: 0;
      background: transparent;
      width: 100%;
      height: 100%;
    }
    #slideshow {
      width: 350px;
      height: 200px;
      border-radius: 30px;
      background: white;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      box-shadow: 0 0 30px rgba(0,0,0,0.2);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    #slideshow img {
      max-width: 80%;
      max-height: 80%;
      position: absolute;
      opacity: 0;
      transition: opacity 1s ease-in-out;
    }
    #slideshow img.active {
      opacity: 1;
      z-index: 2;
    }
  </style>
</head>
<body>
  <div id="slideshow"></div>

  <script>
    const logos = [
      ${arquivos.join(",\n      ")}
    ];

    const container = document.getElementById("slideshow");

    logos.forEach((src, index) => {
      const img = document.createElement("img");
      img.src = src;
      if (index === 0) img.classList.add("active");
      container.appendChild(img);
    });

    let current = 0;
    setInterval(() => {
      const imgs = container.querySelectorAll("img");
      imgs[current].classList.remove("active");
      current = (current + 1) % imgs.length;
      imgs[current].classList.add("active");
    }, 3000);
  </script>
</body>
</html>
`;

fs.writeFileSync("index.html", output);
console.log("Arquivo index.html gerado com sucesso.");
