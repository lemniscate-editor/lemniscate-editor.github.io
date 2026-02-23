# Heading One
## Heading Two
### Heading Three

```
# Heading One
## Heading Two
### Heading Three
```

\hrulefill

There is **bold** text and *italic* text and ***bold italic*** text.

Links can be [included](https://lemniscate-editor.github.io/).

> Block quotes push text in

```
There is **bold** text and *italic* text and ***bold italic*** text.

Links can be [included](https://lemniscate-editor.github.io/).

> Block quotes push text in
```

\hrulefill

1. Ordered lists are numbered
2. Using the number and a period

- Unordered list are possible
- You can use a hyphen, asterisk, or plus sign
  - You can nest lists, too
  - Just indent a couple spaces before the hyphen

```
1. Ordered lists are numbered
2. Using the number and a period

- Unordered list are possible
- You can use a hyphen, asterisk, or plus sign
  - You can nest lists, too
  - Just indent a couple spaces before the hyphen
```

\hrulefill

New paragraphs are created by...

...having an empty line between the lines.  
But two spaces at the end of line will do a line break.

You can insert \LaTeX directly, including creating vertical space with `\vspace{}`, horizontal rules with `\hrulefill`, and page breaks with `\pagebreak`.

\pagebreak

Math can be inserted inlined by surrounding the math with single dollar signs like `$f(x)=2x$` to create $f(x)=2x$, or displayed centered by surrounding it with two dollar signs like `$$f(x)=2x$$` to create $$f(x)=2x$$

Some symbols, such as `+`, `-`, `=`, `<`, and `>`, do not require special formatting, while others do:

- `\div` $\to\div$
- `\cdot` $\to\cdot$
- `\ast` $\to\ast$
- `\pm` $\to\;\pm$
- `\neq` $\to\;\neq$ 
- `\approx` $\to\;\approx$
- `\leq` $\to\;\leq$ 
- `\geq` $\to\;\geq$ 

\vspace{1em}

Superscripts are created with `^` and subscripts with `_`. If the argument is more than one character, it is enclosed between `{}`. Examples: `x^4` $\to\;x^4$, `a_5` $\to\;a_5$, `2^{3y}` $\to\;2^{3y}$

Fractions can be displayed nicely using `\frac{}{}` and `\dfrac{}{}`, with the former better suited for inline and the latter for displayed equations. Examples: `\frac{1}{x}` $\to\;\frac{1}{x}$ and `\dfrac{e^x}{1-x}` $\to$ $$\dfrac{e^x}{1-x}$$

Parentheses and square brackets (mostly) work as expected, while curly braces need to be escaped like `\{` and `\}`. However, none of them grow automatically if the equation grows, like with fractions. This can be done by inserting `\left` and `\right` before the corresponding fences. Example: `\left(\dfrac{1}{x^2}\right)` $\to\;\left(\dfrac{1}{x^2}\right)$

\vspace{1em}

Radicals are expressed with `\sqrt[]{}`, where the index of the radical is in the square brackets and the radicand in the curly braces. If the index is omitted, it is not drawn, and the result is a square root.  
Examples:  `\sqrt{x}` $\to\;\sqrt{x}$ and `\sqrt[3]{343}` $\to\;\sqrt[3]{343}$

In order for some functions to stand out from variables, they have a backslash before the function. These include trigonometric functions (`\sin`), plus their inverses (`\arccos`) and hyperbolic forms (`\tanh`), and logarithmic functions (`\log` and `\ln`). Plain text can be added with `\text{}`.

Limits, summations, and integrals all have their own formatting, with `\lim`, `\sum`, and `\int` respectively. Bounds can be included with subscripts and superscripts immediately following the function name. You can also put `\limits` between the function and the bounds to force them under the symbol.  
Examples: `\int_{0}^{\infty}{f(x)dx}` $\to\;\int_{0}^{\infty}{f(x)dx}$ and `\sum\limits_{i=1}^{n}i=\dfrac{n(n+1)}{2}` $\to$ $$\sum\limits_{i=1}^{n}i=\dfrac{n(n+1)}{2}$$

Greek letters are accessed by typing the name of the letter after a backslash. If the name is capitalized, then it yields the capital Greek letter. Examples: `\pi` $\to\;\pi$, `\theta` $\to\;\theta$, `\Delta` $\to\;\Delta$

A variety of geometric symbols are also available. Some examples are below:

- `m\angle{Q}=40^\circ` $\to\;m\angle{Q}=40^\circ$
- `\angle{ABC}\cong\angle{DEF}` $\to\;\angle{ABC}\cong\angle{DEF}$
- `\Delta PQR\sim\Delta LMN` $\to\;\Delta PQR\sim\Delta LMN$
- `\overline{XY}\perp\overline{YZ}` $\to\;\overline{XY}\perp\overline{YZ}$
- `\overleftrightarrow{RS}\parallel\overleftrightarrow{UV}` $\to\;\overleftrightarrow{RS}\parallel\overleftrightarrow{UV}$