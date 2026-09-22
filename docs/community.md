# Comments and subscriptions

The site stays on GitHub Pages. RSS is built by Astro. Hyvor Talk stores comments and provides moderation; Buttondown stores email subscriptions and sends newsletters. No account passwords, subscriber addresses, or API keys are stored in this repository.

## Activation status

Connected on 22 September 2026. RSS, the Buttondown signup form, and the Hyvor guest comment box are live. The repository variables and local ignored `.env` use Hyvor website `16077` and Buttondown newsletter `kevinkipro`.

Hyvor guest posting is enabled with pre-moderation off, no guest email required, and Akismet spam detection enabled. The live essay successfully loads the name and comment form. Hyvor currently shows a 14-day trial; no paid plan has been purchased.

Buttondown’s onboarding now marks the owner’s email verification complete. The subscription form uses the provider’s confirmed embed URL. No newsletter has been sent.

Manage comments at https://talk.hyvor.com/console/16077/comments and subscriptions at https://buttondown.com/home.

## 1. Set up guest comments

1. Create or sign into your account at https://talk.hyvor.com/console.
2. Add a website for `kevinkipro.com` and copy its numeric Website ID.
3. Leave guest commenting enabled. A name is required; guest email collection is currently disabled. Readers do not need GitHub, X, or Hyvor accounts.
4. Keep ordinary posting open. Do not enable site-wide pre-moderation. Configure the provider's spam filtering separately.
5. In the Hyvor Console, you can remove comments, mark spam and close a discussion. Use the reversible Delete action first; Delete Forever is permanent.
6. Add the Website ID as the GitHub Actions repository variable `PUBLIC_HYVOR_WEBSITE_ID`.

The Hyvor comment box loads automatically beneath each essay. Reactions are disabled in the Hyvor Console. The newsletter section contains only its heading, email field, Subscribe button, and RSS link. Each thread uses `writing:` plus the essay's content ID, so changing the displayed title does not change its discussion. Keep the Markdown filename stable after comments begin, or migrate the thread before renaming it.

Explanatory and provider copy has been removed from the site footer. If the script fails, a short error and Retry button appear. Without JavaScript, an email alternative remains available. The provider handles errors after its component starts.

## 2. Set up email subscriptions

1. Create or sign into your account at https://buttondown.com.
2. Set up the newsletter and verify your sender address. Copy the newsletter username, not an API key.
3. Leave double opt-in enabled. Subscribers receive a confirmation email and must confirm before receiving newsletters.
4. Add the username as the GitHub Actions repository variable `PUBLIC_BUTTONDOWN_USERNAME`.

The form sends the reader's email directly to Buttondown and opens Buttondown's response page. It works without JavaScript. Commenting never adds someone to the email list.

Publishing an essay updates RSS immediately. **It does not automatically send an email.** Initially, write and send a short announcement from Buttondown with the article link. Automated RSS-to-email delivery is a separate paid Buttondown feature and has not been enabled.

## 3. Rebuild and verify

Set repository variables under **Settings → Secrets and variables → Actions → Variables**. These two values are public identifiers, not secrets. The existing deployment workflow passes them into Astro. Run **Deploy to GitHub Pages** manually, or push a change, to rebuild with the new settings.

For local development, copy `.env.example` to `.env` and fill in the same public values. `.env` is ignored by Git. Restart the dev server or rebuild after changing it. Incorrectly formatted values fail the build instead of producing a broken form.

Before treating activation as complete, verify on the real website:

- Guests can submit a comment without an account and ordinary comments appear without manual approval.
- The owner can remove a test comment through the moderation console.
- A subscription using an address you control receives the confirmation email and confirms successfully.
- Unsubscribe works and RSS still lists the published essays.

The live form, guest name input, open-posting setting, and spam filtering have been verified. Comment submission/deletion and email confirmation/unsubscribe have not been exercised end to end. Do not send test emails to anyone else's address.

To disable either feature, clear its repository variable and rebuild. This hides its interface without deleting data at the service.

## Costs and documentation

Checked 22 September 2026. No paid plans have been purchased.

- [Hyvor Talk pricing](https://talk.hyvor.com/pricing): Personal starts at €5/month, billed annually; a 14-day trial is offered. Usage limits apply.
- [Guest commenting](https://talk.hyvor.com/docs/commenting) and [moderation](https://talk.hyvor.com/docs/moderation).
- [Buttondown pricing](https://buttondown.com/pricing): the first 100 subscribers are free. RSS-to-email is listed as a $9/month add-on.
- [Buttondown form documentation](https://docs.buttondown.com/building-your-subscriber-base) and [double opt-in](https://docs.buttondown.com/double-opt-in).

## Discussion appearance

The Messages-style theme is versioned in `public/styles/discussion.css`. In Hyvor Console → Settings → Comments → Custom CSS, use `@import url("https://kevinkipro.com/styles/discussion.css");`. Reactions and voting are disabled; the default sort is oldest first. Top-level comments use grey bubbles; replies use blue bubbles. Colours indicate thread structure, not verified author identity. Names, timestamps, reply and moderation controls remain available.

The theme uses Hyvor’s current DOM classes. Check it after provider updates; clearing Custom CSS restores the standard widget. The signup uses a frosted glass control based on the supplied reference.
