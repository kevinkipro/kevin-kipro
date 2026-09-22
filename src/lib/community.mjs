// These are public embed identifiers, never API keys or account passwords.
export function communityConfig(env) {
  const hyvorWebsiteId = (env.PUBLIC_HYVOR_WEBSITE_ID || "").trim();
  const buttondownUsername = (env.PUBLIC_BUTTONDOWN_USERNAME || "").trim();
  if (hyvorWebsiteId && !/^[1-9][0-9]*$/.test(hyvorWebsiteId)) {
    throw new Error("PUBLIC_HYVOR_WEBSITE_ID must be a positive numeric website ID.");
  }
  if (buttondownUsername && !/^[a-zA-Z0-9][a-zA-Z0-9_-]*$/.test(buttondownUsername)) {
    throw new Error("PUBLIC_BUTTONDOWN_USERNAME must be a newsletter username, not a URL or email.");
  }
  return { hyvorWebsiteId, buttondownUsername };
}
