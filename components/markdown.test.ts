import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Markdown } from "./markdown";

const render = (md: string) => renderToStaticMarkup(createElement(Markdown, null, md));

describe("Markdown (lesson and assignment renderer)", () => {
  it("renders GFM tables", () => {
    const html = render("| a | b |\n|---|---|\n| 1 | 2 |");
    expect(html).toContain("<table>");
    expect(html).toContain("<th>a</th>");
    expect(html).toContain("<td>2</td>");
  });

  it("renders GFM task lists as (disabled) checkboxes", () => {
    const html = render("- [ ] open the page\n- [x] saved the file");
    expect(html.match(/type="checkbox"/g)).toHaveLength(2);
    expect(html).toContain("disabled");
    expect(html).toContain("checked");
  });

  it("renders strikethrough and autolinks", () => {
    const html = render("~~old~~ and https://example.com");
    expect(html).toContain("<del>old</del>");
    expect(html).toContain('href="https://example.com"');
  });

  it("keeps raw HTML disabled: script, iframe, handlers and comments never reach the output", () => {
    const html = render(
      'Before\n\n<script>alert(1)</script>\n\n<iframe src="https://evil.example"></iframe>\n\n<img src=x onerror="alert(1)">\n\n<!-- slug: hidden -->\n\nAfter'
    );
    expect(html).not.toMatch(/<script/i);
    expect(html).not.toMatch(/<iframe/i);
    expect(html).not.toMatch(/onerror/i);
    expect(html).not.toContain("slug: hidden");
    expect(html).toContain("Before");
    expect(html).toContain("After");
  });

  it("still renders ordinary markdown and code fences", () => {
    const html = render("## Title\n\n```js\nconst x = 1;\n```");
    expect(html).toContain("<h2>Title</h2>");
    expect(html).toContain("const x = 1;");
  });
});
