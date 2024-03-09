import mj from "mathjax-node";

// Generate SVG from MathML
mj.config({
  MathJax: {
    SVG: {
      font: "TeX",
    },
    // loader: { load: ["[Contrib]/a11y/sre-full.js"] },
  },
});

const mathMLExpression = `<math xmlns="http://www.w3.org/1998/Math/MathML"><mi>&#x3b2;</mi><mo>=</mo><mfrac><mrow><msub><mi>D</mi><mi>z</mi></msub></mrow><mrow><msub><mi>D</mi><mi>z</mi></msub><mo>-</mo><msub><mi>g</mi><mi>n</mi></msub></mrow></mfrac><mo>=</mo><mfrac><mi>D</mi><mrow><mi>A</mi><mo>-</mo><mi>B</mi></mrow></mfrac><mo>=</mo><mi>C</mi></math>`;

// Define an async function
export const handleGenerateSVG = async (req, res) => {
  // Convert MathML to SVG using mathjax-node
  const result = await new Promise((resolve, reject) => {
    mj.typeset(
      {
        math: mathMLExpression,
        format: "MathML",
        svg: true,
      },
      (typesetResult) => {
        if (typesetResult.errors) {
          reject(typesetResult.errors);
        } else {
          resolve(typesetResult);
        }
      }
    );
  });

  res.send({ svg: result.svg });
};
