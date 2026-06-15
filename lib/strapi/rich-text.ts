import type { RichTextContent, RichTextNode } from "@/types/project"

export function richTextToPlainText(
  content?: RichTextContent | string | null,
) {
  if (!content) {
    return ""
  }

  if (typeof content === "string") {
    return content
  }

  return content
    .map((node) => richTextNodeToPlainText(node))
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim()
}

function richTextNodeToPlainText(node: RichTextNode): string {
  if (isTextNode(node)) {
    return node.text
  }

  return (node.children ?? [])
    .map((child) => richTextNodeToPlainText(child))
    .filter(Boolean)
    .join(" ")
}

function isTextNode(node: RichTextNode): node is Extract<RichTextNode, { type: "text" }> {
  return node.type === "text" && typeof node.text === "string"
}
