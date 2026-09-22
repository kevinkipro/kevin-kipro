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

Readers choose **Load discussion** beneath an essay. The site then loads the Hyvor component. Until that click, it makes no Hyvor request. Each thread uses `writing:` plus the essay's content ID, so changing the displayed title does not change its discussion. Keep the Markdown filename stable after comments begin, or migrate the thread before renaming it.

The footer includes the provider's privacy link and an email alternative. If the script is blocked or fails, the reader can retry. The provider handles errors after its component starts.

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
