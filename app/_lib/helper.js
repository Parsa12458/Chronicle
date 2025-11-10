import z from "zod";

export function getContrastingTextColor(hex = "") {
  // Remove the hash symbol if present
  hex = hex.replace("#", "");

  // Parse the hex color
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return black for light backgrounds and white for dark backgrounds
  return luminance > 0.55 ? "#000000" : "#FFFFFF";
}

export function truncateText(text, numCharacters) {
  if (text.length <= numCharacters) {
    return text;
  }

  const truncated = text.slice(0, numCharacters);
  const lastSpaceIndex = truncated.lastIndexOf(" ");

  if (lastSpaceIndex === -1) {
    return truncated + "...";
  }

  return truncated.slice(0, lastSpaceIndex) + "...";
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();

  // Normalize both dates to UTC midnight
  const dateUTC = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate()
  );
  const nowUTC = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate()
  );

  const diffTime = nowUTC - dateUTC;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function extractTextFromDelta(delta) {
  if (!delta || !Array.isArray(delta.ops)) return "";

  return delta.ops
    .map((op) => (typeof op.insert === "string" ? op.insert : ""))
    .join("")
    .trim();
}

export function validateWithZod(schema, data) {
  const result = schema.safeParse(data);
  if (result.success) return { success: true, data: result.data };

  const tree = z.treeifyError(result.error);
  const errors = Object.fromEntries(
    Object.entries(tree?.children ?? {}).map(([key, node]) => [
      key,
      node.issues?.[0]?.message || "Something went wrong!",
    ])
  );

  return { success: false, errors };
}
