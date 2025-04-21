import lume from "lume/mod.ts";
import minify_html from "lume/plugins/minify_html.ts";
import nunjucks from "lume/plugins/nunjucks.ts";
import postcss from "lume/plugins/postcss.ts";
import tailwindcss from "lume/plugins/tailwindcss.ts";

const site = lume({
  src: "src",
  dest: "docs",
});

if (Deno.env.get("BUILD") === "production") {
  site.use(
    minify_html({
      extensions: [".html", ".css", ".js"],
    })
  );
}

site.use(
  nunjucks({
    options: {
      autoescape: false,
    },
  })
);

site.use(
  tailwindcss({
    options: {
      extensions: [".html", ".njk", ".js", ".md"],
    },
  })
);
site.use(postcss());

const itemsToCopy: string[] = [
  "assets/images",
  "assets/js",
  "service-worker.js",
  ".nojekyll",
];

itemsToCopy.forEach((item) => {
  site.copy(item);
});

export default site;
