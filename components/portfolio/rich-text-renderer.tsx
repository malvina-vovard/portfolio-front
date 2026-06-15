import type { ReactNode } from "react"

import type {
  RichTextBlockNode,
  RichTextContent,
  RichTextNode,
  RichTextTextNode,
} from "@/types/project"

type RichTextRendererProps = {
  content?: RichTextContent | string | null
}

export function RichTextRenderer({ content }: RichTextRendererProps) {
  if (!content) {
    return null
  }

  if (typeof content === "string") {
    return (
      <p className="max-w-full break-words text-base leading-8 text-foreground/82">
        {content}
      </p>
    )
  }

  return (
    <div className="flex max-w-3xl flex-col gap-4 break-words text-base leading-8 text-foreground/82">
      {content.map((node, index) => (
        <RichTextBlock
          key={`${node.type}-${index}`}
          node={node}
          path={`${index}`}
        />
      ))}
    </div>
  )
}

function RichTextBlock({
  node,
  path,
}: {
  node: RichTextBlockNode
  path: string
}) {
  switch (node.type) {
    case "paragraph": {
      const children = renderInlineChildren(node.children, path)

      return children.length > 0 ? <p>{children}</p> : <br aria-hidden="true" />
    }

    case "heading":
      return renderHeading(node, path)

    case "quote":
      return (
        <blockquote className="border-l-2 border-[var(--portfolio-hero-accent)]/45 pl-4 italic text-foreground/72">
          {renderInlineChildren(node.children, path)}
        </blockquote>
      )

    case "code":
      return (
        <pre className="overflow-x-auto rounded-md bg-foreground/6 px-4 py-3 text-sm leading-6 text-foreground">
          <code>{getPlainText(node.children)}</code>
        </pre>
      )

    case "list":
      return <RichTextList node={node} path={path} />

    case "list-item":
      return <li>{renderListItemChildren(node.children, path)}</li>

    default:
      return <p>{renderInlineChildren(node.children, path)}</p>
  }
}

function RichTextList({
  node,
  path,
}: {
  node: RichTextBlockNode
  path: string
}) {
  const className =
    node.format === "ordered"
      ? "ml-5 list-decimal space-y-2 marker:text-foreground/45"
      : "ml-5 list-disc space-y-2 marker:text-foreground/45"

  const items = (node.children ?? []).map((child, index) => {
    const key = `${path}-${index}`

    if (isBlockNode(child) && child.type === "list-item") {
      return <RichTextBlock key={key} node={child} path={key} />
    }

    if (isBlockNode(child) && child.type === "list") {
      return (
        <li key={key} className="list-none">
          <RichTextBlock node={child} path={key} />
        </li>
      )
    }

    return <li key={key}>{renderInlineNode(child, key)}</li>
  })

  return node.format === "ordered" ? (
    <ol className={className}>{items}</ol>
  ) : (
    <ul className={className}>{items}</ul>
  )
}

function renderHeading(node: RichTextBlockNode, path: string) {
  const children = renderInlineChildren(node.children, path)
  const className = "font-heading text-2xl font-semibold leading-8 text-foreground"

  switch (node.level) {
    case 1:
      return <h2 className={className}>{children}</h2>
    case 2:
      return <h3 className={className}>{children}</h3>
    case 3:
      return <h4 className={className}>{children}</h4>
    default:
      return <h5 className={className}>{children}</h5>
  }
}

function renderListItemChildren(
  children: RichTextNode[] | undefined,
  path: string,
) {
  const renderedChildren = (children ?? []).map((child, index) => {
    const key = `${path}-${index}`

    if (isBlockNode(child) && child.type === "list") {
      return <RichTextBlock key={key} node={child} path={key} />
    }

    return renderInlineNode(child, key)
  })

  return <div className="flex flex-col gap-2">{renderedChildren}</div>
}

function renderInlineChildren(
  children: RichTextNode[] | undefined,
  path: string,
) {
  return (children ?? [])
    .map((child, index) => renderInlineNode(child, `${path}-${index}`))
    .filter(Boolean)
}

function renderInlineNode(node: RichTextNode, key: string): ReactNode {
  if (isTextNode(node)) {
    return applyTextMarks(node.text, node, key)
  }

  if (isLinkNode(node)) {
    return (
      <a
        key={key}
        href={node.url}
        rel={node.rel || "noreferrer"}
        target={node.target || undefined}
        className="font-medium text-[var(--portfolio-hero-accent)] underline underline-offset-4"
      >
        {node.children.map((child, index) =>
          renderInlineNode(child, `${key}-${index}`),
        )}
      </a>
    )
  }

  if (isBlockNode(node)) {
    return <RichTextBlock key={key} node={node} path={key} />
  }

  return null
}

function applyTextMarks(
  text: string,
  node: RichTextTextNode,
  key: string,
) {
  if (!text) {
    return null
  }

  let content: ReactNode = text

  if ("code" in node && node.code) {
    content = (
      <code className="rounded bg-foreground/8 px-1.5 py-0.5 text-sm text-foreground">
        {content}
      </code>
    )
  }

  if ("bold" in node && node.bold) {
    content = <strong className="font-semibold text-foreground">{content}</strong>
  }

  if ("italic" in node && node.italic) {
    content = <em>{content}</em>
  }

  if ("underline" in node && node.underline) {
    content = <span className="underline underline-offset-4">{content}</span>
  }

  if ("strikethrough" in node && node.strikethrough) {
    content = <span className="line-through">{content}</span>
  }

  return <span key={key}>{content}</span>
}

function getPlainText(children: RichTextNode[] | undefined): string {
  return (children ?? [])
    .map((child) => {
      if (isTextNode(child)) {
        return child.text
      }

      if (isBlockNode(child)) {
        return getPlainText(child.children)
      }

      return child.children.map((node) => getPlainText([node])).join("")
    })
    .join("")
}

function isTextNode(node: RichTextNode): node is RichTextTextNode {
  return node.type === "text" && typeof node.text === "string"
}

function isLinkNode(
  node: RichTextNode,
): node is Extract<RichTextNode, { type: "link" }> {
  return (
    node.type === "link" &&
    typeof node.url === "string" &&
    Array.isArray(node.children)
  )
}

function isBlockNode(node: RichTextNode): node is RichTextBlockNode {
  return !isTextNode(node) && !isLinkNode(node)
}
