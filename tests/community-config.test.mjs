import test from "node:test";
import assert from "node:assert/strict";
import { communityConfig } from "../src/lib/community.mjs";

test("missing providers leave both services disabled", () => {
  assert.deepEqual(communityConfig({}), { hyvorWebsiteId: "", buttondownUsername: "" });
});
test("each service can be enabled independently and whitespace is trimmed", () => {
  assert.equal(communityConfig({ PUBLIC_HYVOR_WEBSITE_ID: " 123 " }).hyvorWebsiteId, "123");
  assert.equal(communityConfig({ PUBLIC_BUTTONDOWN_USERNAME: " my-writing " }).buttondownUsername, "my-writing");
});
test("invalid configuration fails instead of publishing a broken embed or form", () => {
  for (const value of ["0", "-1", "1.5", "YOUR_ID", "https://example.com"]) {
    assert.throws(() => communityConfig({ PUBLIC_HYVOR_WEBSITE_ID: value }));
  }
  for (const value of ["https://example.com", "../other", "user@example.com", "name?next=other"]) {
    assert.throws(() => communityConfig({ PUBLIC_BUTTONDOWN_USERNAME: value }));
  }
});
