import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * The one place lesson and assignment markdown is rendered.
 *
 * - GitHub-flavoured markdown is ON (tables, task lists `- [ ]`,
 *   strikethrough, autolinks) so authored content renders as written.
 * - Raw HTML stays OFF, deliberately and explicitly: `skipHtml` drops any
 *   HTML in the markdown and there is no rehype-raw. Content authors (and
 *   anything pasted into a submission) can't inject markup or scripts.
 */
export function Markdown({ children, components }: { children: string; components?: Components }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} skipHtml components={components}>
      {children}
    </ReactMarkdown>
  );
}
